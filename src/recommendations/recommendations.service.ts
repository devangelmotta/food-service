//@ts-nocheck
import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { IUserKey, IUser } from 'src/users/entities/user.interface';
import { IRestaurantKey, IRestaurant } from 'src/restaurants/entities/restaurant.interface';
import { IMealKey, IMeal } from 'src/restaurants/entities/meal.interface';
import { IInteractionKey, IInteraction } from 'src/users/entities/interaction.interface';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectModel('User')
    private userModel: Model<IUser, IUserKey>,
    @InjectModel('Restaurants')
    private restaurantModel: Model<IRestaurant, IRestaurantKey>,
    @InjectModel('Meals')
    private foodModel: Model<IMeal, IMealKey>,
    @InjectModel('Interaction')
    private interactionModel: Model<IInteraction, IInteractionKey>,
  ) {}

  /**
   * Obtiene las interacciones de un usuario específico.
   * @param userId El ID del usuario.
   * @returns Una promesa que se resuelve con un arreglo de interacciones.
   */
  async getInteractionsByUser(userId: string): Promise<IInteraction[]> {
    const interactions = await this.interactionModel.scan().where('userId').eq(userId).exec();
    return interactions;
  }

  /**
   * Obtiene las preferencias de un usuario específico.
   * @param userId El ID del usuario.
   * @returns Una promesa que se resuelve con un arreglo de preferencias.
   */
  async getUserPreferences(userId: string): Promise<string[]> {
    const user = await this.userModel.get({ id: userId });

    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const preferences = user.preferences.map((preference) => preference.value);

    return preferences;
  }

  /**
   * Obtiene los usuarios similares a un usuario específico en función de sus preferencias.
   * @param userId El ID del usuario.
   * @returns Una promesa que se resuelve con un arreglo de IDs de usuarios similares.
   */
  async getSimilarUsers(userId: string): Promise<string[]> {
    const userPreferences = await this.getUserPreferences(userId);

    const similarUsers = await this.userModel.scan().where('id').ne(userId).exec();

    const usersWithSimilarPreferences = similarUsers.filter((user) => {
      const userPreferences = user.preferences.map((preference) => preference.value);
      const commonPreferences = userPreferences.filter((preference) => userPreferences.includes(preference));
      return commonPreferences.length > 0;
    });

    const similarUserIds = usersWithSimilarPreferences.map((user) => user.id);

    return similarUserIds;
  }

  /**
   * Obtiene las comidas recomendadas para un usuario específico.
   * @param userId El ID del usuario.
   * @returns Una promesa que se resuelve con un arreglo de comidas recomendadas.
   */
  async getRecommendations(userId: string): Promise<IMeal[]> {
    const similarUserIds = await this.getSimilarUsers(userId);

    const recommendedMeals: IMeal[] = [];

    for (const similarUserId of similarUserIds) {
      const interactions = await this.getInteractionsByUser(similarUserId);

      for (const interaction of interactions) {
        if (
          interaction.typeElement === 'meal' &&
          !recommendedMeals.some((meal) => meal.id === interaction.idElement)
        ) {
          const meal = await this.foodModel.get({ id: interaction.idElement });
          if (meal) {
            recommendedMeals.push(meal);
          }
        }
      }
    }

    return recommendedMeals;
  }

  /**
   * Convierte un arreglo de preferencias en un mapa de preferencias.
   * @param preferences El arreglo de preferencias.
   * @returns Un mapa de preferencias.
   */
  private getUserPreferencesMap(preferences: any[]) {
    const preferencesMap = new Map();
    for (const preference of preferences) {
      const { type, value } = preference;
      if (!preferencesMap.has(type)) {
        preferencesMap.set(type, new Set());
      }
      const preferenceSet = preferencesMap.get(type);
      preferenceSet.add(value);
    }
    return preferencesMap;
  }

  /**
   * Crea un mapa de ingredientes de comidas a partir de un arreglo de comidas.
   * @param foods El arreglo de comidas.
   * @returns Un mapa de ingredientes de comidas.
   */
  private createFoodIngredientsMap(foods: IMeal[]) {
    const foodIngredientsMap = new Map();
    for (const food of foods) {
      const { id, ingredients } = food;
      foodIngredientsMap.set(id, new Set(ingredients));
    }
    return foodIngredientsMap;
  }

  /**
   * Calcula la similitud entre un restaurante y las preferencias del usuario.
   * @param foods El arreglo de comidas.
   * @param restaurant El restaurante.
   * @param preferencesMap El mapa de preferencias del usuario.
   * @param foodIngredientsMap El mapa de ingredientes de comidas.
   * @returns El valor de similitud entre el restaurante y las preferencias del usuario.
   */
  private calculateRestaurantSimilarity(
    foods: any[],
    restaurant: IRestaurant,
    preferencesMap: Map<string, Set<string>>,
    foodIngredientsMap: Map<string, Set<string>>,
  ): number {
    let similarity = 0;

    const cuisinePreferences = preferencesMap.get('cuisine');
    if (cuisinePreferences && cuisinePreferences.has(restaurant.cuisineType)) {
      similarity += 1;
    }

    const restaurantFoods = foods.filter((food) => food.restaurantId === restaurant.id);
    const ingredientPreferences = preferencesMap.get('ingredients');
    if (ingredientPreferences) {
      for (const preference of ingredientPreferences) {
        for (const food of restaurantFoods) {
          const ingredients = foodIngredientsMap.get(food.id);
          if (ingredients && ingredients.has(preference)) {
            similarity += 1;
            break;
          }
        }
      }
    }

    return similarity;
  }

  /**
   * Calcula la similitud entre una comida y las preferencias del usuario.
   * @param preferences El arreglo de preferencias del usuario.
   * @param food La comida.
   * @param preferencesMap El mapa de preferencias del usuario.
   * @param foodIngredientsMap El mapa de ingredientes de comidas.
   * @returns El valor de similitud entre la comida y las preferencias del usuario.
   */
  private calculateFoodSimilarity(
    preferences: any[],
    food: IMeal,
    preferencesMap: Map<string, Set<string>>,
    foodIngredientsMap: Map<string, Set<string>>,
  ): number {
    let similarity = 0;

    const ingredientPreferences = preferencesMap.get('ingredients');
    if (ingredientPreferences) {
      const foodIngredients = foodIngredientsMap.get(food.id);
      if (foodIngredients) {
        for (const preference of ingredientPreferences) {
          if (foodIngredients.has(preference)) {
            similarity += 1;
          }
        }
      }
    }

    return similarity;
  }

  /**
   * Recomienda restaurantes para un usuario específico.
   * @param userId El ID del usuario.
   * @returns Una promesa que se resuelve con un arreglo de restaurantes recomendados.
   */
  async recommendRestaurants(userId: string) {
    const user = await this.userModel.get(userId);
    const restaurants = await this.restaurantModel.scan().exec();
    const foods = await this.foodModel.scan().exec();
    const userPreferences = this.getUserPreferencesMap(user.preferences);
    const foodIngredientsMap = this.createFoodIngredientsMap(foods);

    const recommendedRestaurants = restaurants.map((restaurant) => ({
      restaurant,
      similarity: this.calculateRestaurantSimilarity(
        foods,
        restaurant,
        userPreferences,
        foodIngredientsMap,
      ),
    }));

    recommendedRestaurants.sort((a, b) => b.similarity - a.similarity);

    const recommendedRestaurantsList = recommendedRestaurants.map((item) => ({
      ...item.restaurant,
      similarity: item.similarity,
    }));

    return recommendedRestaurantsList;
  }

  /**
   * Recomienda comidas para un usuario específico.
   * @param userId El ID del usuario.
   * @returns Una promesa que se resuelve con un arreglo de comidas recomendadas.
   */
  async recommendFoods(userId: string) {
    const user = await this.userModel.get(userId);
    const foods = await this.foodModel.scan().exec();

    const userPreferences = this.getUserPreferencesMap(user.preferences);
    const foodIngredientsMap = this.createFoodIngredientsMap(foods);

    const recommendedFoods = foods.map((food) => ({
      food,
      similarity: this.calculateFoodSimilarity(
        user.preferences,
        food,
        userPreferences,
        foodIngredientsMap,
      ),
    }));

    recommendedFoods.sort((a, b) => b.similarity - a.similarity);

    const recommendedFoodsList = recommendedFoods.map((item) => ({
      ...item.food,
      similarity: item.similarity,
    }));

    return recommendedFoodsList;
  }

  /**
   * Combina las recomendaciones de comidas, restaurantes y filtrado colaborativo para un usuario específico.
   * @param id El ID del usuario.
   * @returns Un objeto con las recomendaciones de comidas, restaurantes y filtrado colaborativo.
   */
  async combineRecommendations(id: string) {
    const recommendedFoods = await this.recommendFoods(id);
    const recommendedRestaurants = await this.recommendRestaurants(id);
    const collaborativeFilter = await this.getRecommendations(id);

    return {
      meals: recommendedFoods,
      restaurants: recommendedRestaurants,
      collabFilter: collaborativeFilter,
    };
  }
}

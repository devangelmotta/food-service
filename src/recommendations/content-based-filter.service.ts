// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { IUserKey, IUser } from 'src/users/entities/user.interface';
import { IRestaurantKey, IRestaurant } from 'src/restaurants/entities/restaurant.interface';
import { IMealKey, IMeal } from 'src/restaurants/entities/meal.interface';
import { String } from 'aws-sdk/clients/appstream';

@Injectable()
export class ContentBaseFilterService {
  constructor(
    @InjectModel('User')
    private userModel: Model<IUser, IUserKey>,
    @InjectModel('Restaurants')
    private restaurantModel: Model<IRestaurant, IRestaurantKey>,
    @InjectModel('Meals')
    private foodModel: Model<IMeal, IMealKey>,
  ) {}

  private getUserPreferences(preferences: any[]) {
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

  private createFoodIngredientsMap(foods: IMeal[]) {
    const foodIngredientsMap = new Map();
    for (const food of foods) {
      const { id, ingredients } = food;
      foodIngredientsMap.set(id, new Set(ingredients));
    }
    return foodIngredientsMap;
  }

  private calculateRestaurantSimilarity(
    foods: any[],
    restaurant: IRestaurant,
    preferencesMap: Map<string, Set<string>>,
    foodIngredientsMap: Map<string, Set<string>>,
  ) {
    let similarity = 0;

    const cuisinePreferences = preferencesMap.get('cuisine');
    if (cuisinePreferences && cuisinePreferences.has(restaurant.cuisineType)) {
      similarity += 1;
    }

    const restaurantFoods = foods.filter(food => food.restaurantId === restaurant.id);
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

  private calculateFoodSimilarity(
    preferences: any[],
    food: IMeal,
    preferencesMap: Map<string, Set<string>>,
    foodIngredientsMap: Map<string, Set<string>>,
  ) {
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

  async recommendRestaurants(userId: string) {
    const user = await this.userModel.get(userId);
    const restaurants = await this.restaurantModel.scan().exec();
    const foods = await this.foodModel.scan().exec();
    const userPreferences = this.getUserPreferences(user.preferences);
    const foodIngredientsMap = this.createFoodIngredientsMap(foods);

    const recommendedRestaurants = restaurants.map(restaurant => ({
      restaurant,
      similarity: this.calculateRestaurantSimilarity(
        foods,
        restaurant,
        userPreferences,
        foodIngredientsMap,
      ),
    }));

    recommendedRestaurants.sort((a, b) => b.similarity - a.similarity);

    const recommendedRestaurantsList = recommendedRestaurants.map(item => ({
      ...item.restaurant,
      similarity: item.similarity,
    }));

    return recommendedRestaurantsList;
  }

  async recommendFoods(userId: string) {
    const user = await this.userModel.get(userId);
    const foods = await this.foodModel.scan().exec();

    const userPreferences = this.getUserPreferences(user.preferences);
    const foodIngredientsMap = this.createFoodIngredientsMap(foods);

    const recommendedFoods = foods.map(food => ({
      food,
      similarity: this.calculateFoodSimilarity(
        user.preferences,
        food,
        userPreferences,
        foodIngredientsMap,
      ),
    }));

    recommendedFoods.sort((a, b) => b.similarity - a.similarity);

    const recommendedFoodsList = recommendedFoods.map(item => ({
      ...item.food,
      similarity: item.similarity,
    }));

    return recommendedFoodsList;
  }

  async combineRecommendations(id: String){
    let recommendedFoods =  await this.recommendFoods(id);
    let recommendedRestaurants = await this.recommendRestaurants(id)

    return ({
      meals: recommendedFoods,
      restaurants: recommendedRestaurants
    })
  }

}
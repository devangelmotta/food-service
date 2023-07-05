// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { IUserKey, IUser } from 'src/users/entities/user.interface';
import { IRestaurantKey, IRestaurant } from 'src/restaurants/entities/restaurant.interface';
import { IMealKey, IMeal } from 'src/restaurants/entities/meal.interface';
import { IInteractionKey, IInteraction } from 'src/users/entities/interaction.interface';

@Injectable()
export class CollaborativeBasedFilterService {
  constructor(
    @InjectModel('User')
    private userModel: Model<IUser, IUserKey>,
    @InjectModel('Meals')
    private foodModel: Model<IMeal, IMealKey>,
    @InjectModel('Interaction')
    private interactionModel: Model<IInteraction, IInteractionKey>,
  ) {}

  async getInteractionsByUser(userId: string): Promise<IInteraction[]> {
    const interactions = await this.interactionModel
      .scan()
      .where('userId')
      .eq(userId)
      .exec();

    return interactions;
  }

  async getUserPreferences(userId: string): Promise<string[]> {
    const user = await this.userModel.get({ id: userId });

    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const preferences = user.preferences.map((preference) => preference.value);

    return preferences;
  }

  async getSimilarUsers(userId: string): Promise<string[]> {
    const userPreferences = await this.getUserPreferences(userId);

    const similarUsers = await this.userModel
      .scan()
      .where('id')
      .ne(userId)
      .exec();

    const usersWithSimilarPreferences = similarUsers.filter((user) => {
      const userPreferences = user.preferences.map((preference) => preference.value);
      const commonPreferences = userPreferences.filter((preference) =>
        userPreferences.includes(preference)
      );
      return commonPreferences.length > 0;
    });

    const similarUserIds = usersWithSimilarPreferences.map((user) => user.id);

    return similarUserIds;
  }

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

  async recommend (id: string){
    return await this.getRecommendations(id)
  }


}

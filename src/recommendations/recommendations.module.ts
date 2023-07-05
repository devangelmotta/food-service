import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { restaurantSchema } from 'src/restaurants/entities/restaurant.schema';
import { mealSchema } from 'src/restaurants/entities/meal.schema';
import { interactionSchema } from 'src/users/entities/interaction.schema';
import { userSchema } from 'src/users/entities/user.schema';
import { ContentBaseFilterService } from './content-based-filter.service';
import { CollaborativeBasedFilterService } from './collaborative-based-filter.service ';

const forFeactureConfig = [
  {
    name: 'Restaurants',
    schema: restaurantSchema,
    options: {
      tableName: 'restaurants',
    }
  },
  {
    name: 'Meals',
    schema: mealSchema,
    options: {
      tableName: 'meals',
    }
  },
  {
    name: 'User',
    schema: userSchema,
    options: {
      tableName: 'user',
    },
  },
  {
    name: 'Interaction',
    schema: interactionSchema,
    options: {
      tableName: 'interactions',
    },
  }
]

@Module({
  controllers: [RecommendationsController],
  providers: [
    RecommendationsService,
    ContentBaseFilterService, 
    CollaborativeBasedFilterService
  ],
  imports: [
    DynamooseModule.forFeature(forFeactureConfig)
  ]
})
export class RecommendationsModule {}

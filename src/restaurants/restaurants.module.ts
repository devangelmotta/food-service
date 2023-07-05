import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { DynamooseModule } from 'nestjs-dynamoose';
import { restaurantSchema } from './entities/restaurant.schema';
import { mealSchema } from './entities/meal.schema';
import { MealsController } from './meals.controller';
import { MealService } from './meals.service';

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
  }
]

@Module({
  controllers: [RestaurantsController, MealsController],
  providers: [RestaurantsService, MealService],
  imports: [
    DynamooseModule.forFeature(forFeactureConfig)
  ]
})
export class RestaurantsModule {}

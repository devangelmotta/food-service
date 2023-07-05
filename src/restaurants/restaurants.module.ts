import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { DynamooseModule } from 'nestjs-dynamoose';
import { restaurantSchema } from './entities/restaurant.schema';

@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  imports: [
    DynamooseModule.forFeature([{
      name: 'Restaurants',
      schema: restaurantSchema,
      options: {
        tableName: 'restaurants',
      },
    }])
  ]
})
export class RestaurantsModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { IRestaurant, IRestaurantKey } from './entities/restaurant.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RestaurantsService {

  constructor(
    @InjectModel('Restaurants')
    private restaurantModel: Model<IRestaurant, IRestaurantKey>
  ) {}

  create(createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantModel.create({
      id: uuidv4(),
      ...createRestaurantDto
    });
  }

  findAll() {
    return this.restaurantModel.scan().exec();
  }

}

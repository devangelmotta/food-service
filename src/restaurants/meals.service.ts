import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CreateMealDto } from './dto/create-meal.dto';
import { IMealKey, IMeal } from './entities/meal.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MealService {

  constructor(
    @InjectModel('Meals')
    private mealsModel: Model<IMeal, IMealKey>,
  ) {}

  create(createRestaurantDto: CreateMealDto) {
    return this.mealsModel.create({
      id: uuidv4(),
      ...createRestaurantDto
    });
  }

  findAll() {
    return this.mealsModel.scan().exec();
  }

  findOne(id: IMealKey) {
    return this.mealsModel.get(id);
  }

}

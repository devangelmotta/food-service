import { PartialType } from '@nestjs/mapped-types';
import { CreateMealDto } from './create-meal.dto';
import { IsString, IsArray } from 'class-validator';

export class UpdateMealDto extends PartialType(CreateMealDto) {

    @IsString()
    id: string;

    @IsString()
    name: string;
  
    @IsString()
    description: string;

    @IsString()
    price: string;

    @IsString()
    restaurantId: string;

    @IsArray()
    ingredients: Array<string>;

}

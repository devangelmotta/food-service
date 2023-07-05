import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { IsString } from 'class-validator';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {

    @IsString()
    id: string;

    @IsString()
    name: string;
  
    @IsString()
    location: string;

    @IsString()
    cuisineType: string;
}

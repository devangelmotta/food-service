import { IsString } from 'class-validator';

export class CreateRestaurantDto {

    @IsString()
    id: string;

    @IsString()
    name: string;
  
    @IsString()
    location: string;

    @IsString()
    cuisineType: string;

}



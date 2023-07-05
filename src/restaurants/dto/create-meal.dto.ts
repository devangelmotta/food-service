import { IsString, IsArray } from 'class-validator';

export class CreateMealDto {

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



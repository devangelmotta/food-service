import { IsString, IsArray } from 'class-validator';

export class CreateUserDto {

    @IsString()
    id: string;

    @IsString()
    name: string;
  
    @IsArray()
    preferences: Array<string>;
}

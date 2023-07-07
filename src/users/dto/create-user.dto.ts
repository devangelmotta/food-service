import { IsString, IsArray } from 'class-validator';
import { Preferences as UserPreferences } from '../entities/user.interface';

export class CreateUserDto {

    @IsString()
    id: string;

    @IsString()
    name: string;
  
    @IsArray()
    preferences: Array<UserPreferences>;
}

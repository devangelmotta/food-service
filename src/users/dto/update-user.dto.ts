import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsArray } from 'class-validator';
import { Preferences as UserPreferences } from '../entities/user.interface';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    name: string;
  
    @IsArray()
    preferences: Array<UserPreferences>;
}

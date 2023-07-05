import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { MealService } from './meals.service';
import { IMealKey } from './entities/meal.interface';
import { CreateMealDto } from './dto/create-meal.dto';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealService) {}

  @Post()
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealsService.create(createMealDto);
  }

  @Get()
  findAll() {
    return this.mealsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: IMealKey) {
    return this.mealsService.findOne(id);
  }

}

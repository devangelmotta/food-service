import { Controller, Get, Inject, Param, UseInterceptors } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
export class RecommendationsController {
  
  constructor(
    private readonly recomendationsService: RecommendationsService,
    ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.recomendationsService.combineRecommendations(id)
  }

}
import { Controller, Get, Param } from '@nestjs/common';
import { CollaborativeBasedFilterService } from './collaborative-based-filter.service ';
import { ContentBaseFilterService } from './content-based-filter.service';
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
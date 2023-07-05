import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { IInteractionKey } from './entities/interaction.interface';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly intService: InteractionService) {}

  @Post()
  create(@Body() createInteractionDto: CreateInteractionDto) {
    return this.intService.create(createInteractionDto);
  }

  @Get()
  findAll() {
    return this.intService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: IInteractionKey) {
    return this.intService.findOne(id);
  }

}

import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { IInteraction, IInteractionKey } from './entities/interaction.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InteractionService {

  constructor(
    @InjectModel('Interaction')
    private intModel: Model<IInteraction, IInteractionKey>,
  ) {}

  create(createIntDto: CreateInteractionDto) {
    return this.intModel.create({
      id: uuidv4(),
      ...createIntDto
    });
  }

  findAll() {
    return this.intModel.scan().exec();
  }

  findOne(id: IInteractionKey) {
    return this.intModel.get(id);
  }


}

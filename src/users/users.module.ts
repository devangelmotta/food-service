import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userSchema } from './entities/user.schema';
import { interactionSchema } from './entities/interaction.schema';
import { InteractionsController } from './interaction.controller';
import { InteractionService } from './interaction.service';

const forFeatureConfig = [
  {
    name: 'User',
    schema: userSchema,
    options: {
      tableName: 'user',
    },
  },
  {
    name: 'Interaction',
    schema: interactionSchema,
    options: {
      tableName: 'interactions',
    },
  }
]

@Module({
  imports: [
    DynamooseModule.forFeature(forFeatureConfig)
  ],
  controllers: [UsersController, InteractionsController],
  providers: [UsersService, InteractionService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userSchema } from './entities/user.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([{
      name: 'User',
      schema: userSchema,
      options: {
        tableName: 'user',
      },
    }])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DynamooseModule } from 'nestjs-dynamoose';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DynamooseModule.forRoot({
      aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION || "us-east-1"
      },
      local: false,
      logger: true
    }),
    UsersModule,
    RestaurantsModule,
    RecommendationsModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

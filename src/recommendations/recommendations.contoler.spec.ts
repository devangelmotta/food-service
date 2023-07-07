import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';

describe('RecommendationsController', () => {
  let controller: RecommendationsController;
  let service: RecommendationsService;

  const mealModelMock = {
    scan: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([]),
  };
  
  const recommendationsModelMock = {
    create: jest.fn(),
    get: jest.fn(),
    scan: jest.fn().mockReturnValue(mealModelMock),
    update: jest.fn(),
    remove: jest.fn(),
    where: jest.fn().mockReturnValue({
      eq: jest.fn().mockReturnValue(mealModelMock),
    }),
  };

  
beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    controllers: [RecommendationsController],
    providers: [
        RecommendationsService,
        {
        provide: 'UserModel',
        useValue: recommendationsModelMock
        },
        {
        provide: 'RestaurantsModel',
        useValue: recommendationsModelMock
        },
        {
        provide: 'MealsModel',
        useValue: recommendationsModelMock
        },
        {
        provide: 'InteractionModel',
        useValue: recommendationsModelMock
        }
    ],
    }).compile();
  
      controller = module.get<RecommendationsController>(RecommendationsController);
      service = module.get<RecommendationsService>(RecommendationsService);
    });

  describe('findOne', () => {
    it('should return combined recommendations for a given user ID', async () => {
      // Arrange
      const userId = '123456';

      // Mock the response of combineRecommendations method
      const combinedRecommendations = {
        meals: [], // Replace with the expected array of recommended meals
        restaurants: [], // Replace with the expected array of recommended restaurants
        collabFilter: [], // Replace with the expected array of collaborative filter recommendations
      };
      jest
        .spyOn(service, 'combineRecommendations')
        .mockResolvedValue(combinedRecommendations);

      // Act
      const result = await controller.findOne(userId);

      // Assert
      expect(result).toEqual(combinedRecommendations);
      expect(service.combineRecommendations).toHaveBeenCalledWith(userId);
    });
  });

  describe('constructor', () => {
    it('should create an instance of RecommendationsController', () => {
      // Act
      expect(controller).toBeDefined();
    });
  });
});

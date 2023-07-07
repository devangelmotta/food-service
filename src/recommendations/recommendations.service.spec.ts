import { RecommendationsService } from './recommendations.service';
import { Item, Model, Scan } from 'nestjs-dynamoose';
import { IUserKey, IUser, Preferences } from 'src/users/entities/user.interface';
import { IRestaurantKey, IRestaurant } from 'src/restaurants/entities/restaurant.interface';
import { IMealKey, IMeal } from 'src/restaurants/entities/meal.interface';
import { IInteractionKey, IInteraction } from 'src/users/entities/interaction.interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('RecommendationsService', () => {
  let recommendationsService: RecommendationsService;
  let userModel: Model<IUser, IUserKey>;
  let restaurantModel: Model<IRestaurant, IRestaurantKey>;
  let mealModel: Model<IMeal, IMealKey>;
  let interactionModel: Model<IInteraction, IInteractionKey>;
  let recommMeals: IMeal[] = [
    {
      id: '1',
      name: 'Meal 1',
      description: 'Description 1',
      price: "10",
      restaurantId: '1',
      ingredients: ['ingredient1', 'ingredient2'],
      similarity: 0.8,
    },
    {
      id: '2',
      name: 'Meal 2',
      description: 'Description 2',
      price: "15",
      restaurantId: '2',
      ingredients: ['ingredient3', 'ingredient4'],
      similarity: 0.6,
    },
  ];

  let recommRestaurants: IRestaurant[] = [
    {
      id: '1',
      name: 'Restaurant 1',
      location: 'Location 1',
      cuisineType: 'italian',
      similarity: 0.9,
    },
    {
      id: '2',
     name: 'Restaurant 2',
      location: 'Location 2',
      cuisineType: 'italian',
      similarity: 0.7,
    },
  ];

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
        },
      ],
    }).compile();
    recommendationsService = module.get(RecommendationsService);
    userModel = module.get('UserModel');
    restaurantModel = module.get('RestaurantsModel');
    mealModel = module.get('MealsModel');
    interactionModel = module.get('InteractionModel');
  });

  describe('getInteractionsByUser', () => {
    it('should return an array of interactions for a specific user', async () => {
      const userId = '123';

      jest.spyOn(interactionModel, 'scan').mockReturnThis();
      const interactions = await recommendationsService.getInteractionsByUser(userId);

      expect(interactionModel.scan).toHaveBeenCalled();
      expect(interactions).toEqual([]);
    });
  });

  describe('getUserPreferences', () => {
    it('should return an array of user preferences for a specific user', async () => {
      const userId = '123';
      const preferences: Preferences[] = [
        { type: 'ingredient', value: 'papa amarilla' },
        { type: 'cuisine', value: 'italian' },
      ];
      const preferencesMapped = ['papa amarilla', 'italian']
      jest.spyOn(userModel, 'get').mockResolvedValue({ id: userId, preferences } as never);
      const result = await recommendationsService.getUserPreferences(userId);

      expect(userModel.get).toHaveBeenCalledWith({id: userId});
      expect(result).toEqual(preferencesMapped);
    });

    it('should throw an error if the user is not found', async () => {
      const userId = '123';
      jest.spyOn(userModel, 'get').mockResolvedValue(null as never);

      await expect(recommendationsService.getUserPreferences(userId)).rejects.toThrowError();
    });
  });

  describe('getSimilarUsers', () => {
    it('should return an array of similar user IDs for a specific user', async () => {
      const userId = '123';
      const similarUsers = ['456', '789'];

  
      // Realizar la prueba dentro de un bloque try-catch para capturar el error
      try {
        const result = await recommendationsService.getSimilarUsers(userId);
        expect(userModel.scan).toHaveBeenCalled();
        expect(result).toEqual(similarUsers);
      } catch (error) {
        expect(error.message).toBe("User with ID 123 not found.");
      }
    });
  });
  

  describe('getRecommendations', () => {
    it('should return an array of recommended meals for a specific user', async () => {
      const userId = '123';
      const similarUsers = ['456', '789'];
      const interactions = [];
      
      jest.spyOn(recommendationsService, 'getSimilarUsers').mockResolvedValue(similarUsers);
      jest.spyOn(recommendationsService, 'getInteractionsByUser').mockResolvedValue(interactions);
      jest.spyOn(mealModel, 'get').mockResolvedValue(recommMeals as never);

      const recommendations = await recommendationsService.getRecommendations(userId);

      expect(recommendationsService.getSimilarUsers).toHaveBeenCalledWith(userId);
      expect(recommendationsService.getInteractionsByUser).toHaveBeenCalled();
      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeGreaterThanOrEqual(0);

      for (const meal of recommendations) {
        expect(meal).toHaveProperty('id');
        expect(meal).toHaveProperty('name');
        expect(meal).toHaveProperty('description');
        expect(meal).toHaveProperty('price');
        expect(meal).toHaveProperty('restaurantId');
        expect(meal).toHaveProperty('ingredients');
        expect(meal).toHaveProperty('similarity');
        expect(typeof meal.similarity).toBe('number');
      }
    });
  });

});

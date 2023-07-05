import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import { IRestaurantKey, IRestaurant } from './entities/restaurant.interface';
import { Model } from 'nestjs-dynamoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let restaurantModel: Model<IRestaurant, IRestaurantKey>

  const restaurantModelMock = {
    create: jest.fn(),
    scan: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: 'RestaurantsModel',
          useValue: restaurantModelMock
        }
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    restaurantModel = module.get('RestaurantsModel')
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a restaurant', async () => {
      const createRestaurantDto = {
        id: '',
        name: '',
        location: '',
        cuisineType: ''
      };

      jest.spyOn(restaurantModel, 'create').mockReturnValue(CreateRestaurantDto as any);
  
      const result = await service.create(createRestaurantDto);
  
      expect(restaurantModel.create).toHaveBeenCalledWith({
        id: expect.any(String),
        ...createRestaurantDto,
      });
      expect(result).toEqual(createRestaurantDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of restaurants', async () => {
      const allRestaurants: IRestaurant[] = [
        {
          id: '1',
          name: 'Tacos Bell',
          location: 'Bogotá, Colombia',
          cuisineType: 'Mexicana'
        },
        {
          id: '2',
          name: 'Don Arroz',
          location: 'Bogotá, Colombia',
          cuisineType: 'Local'
        },
      ];
  
      const scanMock = {
        exec: jest.fn().mockResolvedValue(allRestaurants),
        parallel: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnThis(),
        all: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
      };
  
      jest.spyOn(restaurantModel, 'scan').mockReturnValueOnce(scanMock as any);
  
      const result = await service.findAll();
  
      expect(restaurantModel.scan).toHaveBeenCalled();
      expect(result).toEqual(allRestaurants);
    });
  });

});

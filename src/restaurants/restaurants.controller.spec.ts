import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { IRestaurant } from './entities/restaurant.interface';
import { restaurantModel } from './entities/restaurant.model';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let service: RestaurantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [
        RestaurantsService,
        {
          provide: 'RestaurantsModel',
          useValue: restaurantModel
        }
      ],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
    service = module.get<RestaurantsService>(RestaurantsService)
  });

  describe('create', () => {
    it('should create a restaurant', async () => {
      const createRestaurantDto: CreateRestaurantDto = {
        id: '',
        name: '',
        location: '',
        cuisineType: ''
      };

      const createdRestaurant: IRestaurant = {
        id: '1',
        name: 'Tacos Bell',
        location: 'Mexico',
        cuisineType: 'Mexicana'
      };

      //@ts-ignore
      jest.spyOn(service, 'create').mockResolvedValue(createdRestaurant);

      const result = await controller.create(createRestaurantDto);

      expect(service.create).toHaveBeenCalledWith(createRestaurantDto);
      expect(result).toEqual(createdRestaurant);
    });
  });

  describe('findAll', () => {
    it('should return all restaurants', async () => {
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
      //@ts-ignore
      jest.spyOn(service, 'findAll').mockResolvedValue(allRestaurants);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(allRestaurants);
    });
  });

});

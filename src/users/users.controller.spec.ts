import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserKey, IUser } from './entities/user.interface';
import { userModel } from './entities/user.model';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: 'UserModel',
          useValue: userModel
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        id: '',
        name: '',
        preferences: []
      };

      const createdUser: IUser = {
        id: '1',
        name: 'John Doe',
        preferences: ['preference1', 'preference2'],
      };
      //@ts-ignore
      jest.spyOn(service, 'create').mockResolvedValue(createdUser);

      const result = await controller.create(createUserDto);

      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const allUsers: IUser[] = [
        {
          id: '1',
          name: 'John Doe',
          preferences: ['preference1', 'preference2'],
        },
        {
          id: '2',
          name: 'Jane Smith',
          preferences: ['preference3', 'preference4'],
        },
      ];
      //@ts-ignore
      jest.spyOn(service, 'findAll').mockResolvedValue(allUsers);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(allUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId: IUserKey = { id: '1' };

      const foundUser: IUser = {
        id: '1',
        name: 'John Doe',
        preferences: ['preference1', 'preference2'],
      };
      //@ts-ignore
      jest.spyOn(service, 'findOne').mockResolvedValue(foundUser);
      //@ts-ignore
      const result = await controller.findOne(userId);

      expect(service.findOne).toHaveBeenCalledWith(userId);
      expect(result).toEqual(foundUser);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const userId: IUserKey = { id: '1' };
      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
        preferences: ['updatedPreference'],
      };

      const updatedUser: IUser = {
        id: '1',
        name: 'Updated User',
        preferences: ['updatedPreference'],
      };
      //@ts-ignore
      jest.spyOn(service, 'update').mockResolvedValue(updatedUser);
      //@ts-ignore
      const result = await controller.update(userId, updateUserDto);

      expect(service.update).toHaveBeenCalledWith(userId, updateUserDto);
      expect(result).toEqual(updatedUser);
    });
  });

});

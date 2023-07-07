import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { IUserKey, IUser } from './entities/user.interface';
import { Model } from 'nestjs-dynamoose';
import { userModel as userModelTesting } from './entities/user.model';

describe('UsersService', () => {
  var usersService: UsersService;
  var userModel: Model<IUser, IUserKey>;
  const mockPreference = {
    type: 'ingredient',
    value: 'sala de tomate'
  }
  const userModelMock = {
    create: jest.fn(),
    scan: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UserModel',
          useValue: userModelMock
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get('UserModel');
  });


  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {

    it('should create a user', async () => {
      const createUserDto = {
        id: '1',
        name: 'John Doe',
        preferences: [mockPreference],
      };
  
      jest.spyOn(userModel, 'create').mockReturnValue(createUserDto as any);
  
      const result = await usersService.create(createUserDto);
  
      expect(userModel.create).toHaveBeenCalledWith({
        id: expect.any(String),
        ...createUserDto,
      });
      expect(result).toEqual(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: '1', name: 'John Doe', preferences: [mockPreference] },
        { id: '2', name: 'Jane Smith', preferences: [mockPreference] },
      ];
  
      const scanMock = {
        exec: jest.fn().mockResolvedValue(users),
        parallel: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnThis(),
        all: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
      };
  
      jest.spyOn(userModel, 'scan').mockReturnValueOnce(scanMock as any);
  
      const result = await usersService.findAll();
  
      expect(userModel.scan).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId: IUserKey = { id: '1' };
      const user = { id: '1', name: 'John Doe', preferences: [mockPreference] };
  
      const getMock = jest.fn().mockResolvedValue(user);
      jest.spyOn(userModel, 'get').mockImplementation(getMock);
  
      const result = await usersService.findOne(userId);
  
      expect(getMock).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  });


  describe('update', () => {
    it('should update a user by ID', async () => {
      const userId: IUserKey = { id: '1' };
      const updateUserDto = { name: 'Updated User', preferences: [mockPreference] };
  
      const updatedUser = { id: '1', ...updateUserDto };
  
      const updateMock = jest.fn().mockResolvedValue(updatedUser);
      jest.spyOn(userModel, 'update').mockImplementation(updateMock);

      const result = await usersService.update(userId, updateUserDto);
      expect(updateMock).toHaveBeenCalledWith(userId, updateUserDto);

      expect(result).toEqual(updatedUser);
    });
  });
  
});



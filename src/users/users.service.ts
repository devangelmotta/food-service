import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserKey, IUser } from './entities/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User')
    private userModel: Model<IUser, IUserKey>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create({
      id: uuidv4(),
      ...createUserDto
    });
  }

  findAll() {
    return this.userModel.scan().exec();
  }

  findOne(id: IUserKey) {
    return this.userModel.get(id);
  }

  update(id: IUserKey, updateUserDto: UpdateUserDto) {
    return this.userModel.update(id, updateUserDto)
  }

}

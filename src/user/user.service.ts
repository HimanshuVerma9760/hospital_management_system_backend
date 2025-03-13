import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/Models/user.model';

@Injectable()
export default class UserService {
  constructor(@InjectModel(User) private readonly userModel: User) {}
}

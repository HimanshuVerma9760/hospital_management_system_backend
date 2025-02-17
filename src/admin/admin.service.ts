import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/Models/user.model';
// import AdminLoginDTO from './dto/admin.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class AdminService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}
}

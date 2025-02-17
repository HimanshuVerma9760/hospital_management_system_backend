import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/Models/user.model';
// import superAdminDTO from './dto/superAdmin.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class SuperAdminService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}
}

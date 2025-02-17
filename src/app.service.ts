import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import City from './Models/city.model';
import { State } from './Models/state.model';
import userDTO from './dto/user.dto';
import { User } from './Models/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(City) private readonly cityModel: typeof City,
    @InjectModel(State) private readonly stateModel: typeof State,
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async getAllCities() {
    try {
      const result = await this.cityModel.findAll();
      return {
        response: 'Success!',
        message: 'Successfully fetched Cities!',
        code: '202',
        result,
      };
    } catch (error) {
      throw new HttpException(
        'Some Error Occurred while fetching Cities!',
        500,
      );
    }
  }
  async getAllStates() {
    try {
      const result = await this.stateModel.findAll();
      return {
        reponse: 'Success!',
        message: 'Successfully fetched States!',
        code: '202',
        result,
      };
    } catch (error) {
      throw new HttpException(
        'Some Error Occurred while fetching Cities!',
        500,
      );
    }
  }

  async login(userData: userDTO) {
    try {
      const foundUser: any = await this.userModel.findOne({
        where: {
          email: userData.email,
        },
        include: { all: true },
      });
      if (foundUser) {
        const passwordMatch = await bcrypt.compare(
          userData.password,
          foundUser.password,
        );
        if (passwordMatch) {
          const token = jwt.sign(
            {
              name: foundUser.name,
              email: foundUser.email,
              role: foundUser.role.name,
            },
            process.env.USER_KEY,
          );
          return {
            response: 'Success!',
            message: 'Login is Successfull!',
            code: '202',
            result: foundUser,
            token,
          };
        }
        throw new UnauthorizedException('Not Authorised!');
      } else {
        throw new UnauthorizedException('Not Authorised!');
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Not Authorised!');
    }
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/Models/user.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  checkVerification(token: string) {
    try {
      const verifiedToken = jwt.verify(token, process.env.USER_KEY);
      return { verifiedToken, auth: true };
    } catch (error) {
      console.log(error);
      throw new HttpException('Unauthorized request', 401);
    }
  }
  async getUserDetails(token: string) {
    try {
      const authResponse = this.checkVerification(token);
      if (authResponse.auth) {
        const result = await this.userModel.findOne({
          where: {
            userId: authResponse.verifiedToken.userId,
          },
          include: { all: true },
        });
        if (result) {
          return {
            response: 'Success',
            statusCode: 200,
            message: 'Successfully fetched User data',
            result,
          };
        } else {
          throw new HttpException(
            'Error occurred while fetching user data',
            500,
          );
        }
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Unauthorized request', 401);
    }
  }
  async updateUser(userData: { name: string; email: string }, token: string) {
    try {
      const authResponse = this.checkVerification(token);
      if (authResponse.auth) {
        const user = await this.userModel.findOne({
          where: {
            userId: authResponse.verifiedToken.userId,
          },
          include: { all: true },
        });
        if (user) {
          const result = await user.update({
            name: userData.name,
            email: userData.email,
          });
          if (result) {
            return {
              response: 'Success',
              statusCode: 202,
              message: 'Successfully updated profile',
            };
          }
        } else {
          throw new HttpException(
            'Error occurred while fetching user data',
            500,
          );
        }
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Unauthorized request', 401);
    }
  }
}

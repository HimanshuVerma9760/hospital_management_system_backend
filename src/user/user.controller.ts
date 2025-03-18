import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  Inject,
  Post,
} from '@nestjs/common';
import UserService from './user.service';

@Controller('api/users')
export default class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Get('get-user')
  getUserDetails(@Headers('authorization') authHeader: string) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      console.log(error);
      throw new HttpException('Unauthrozed', 401);
    }
    return this.userService.getUserDetails(token);
  }
  @Post('update')
  updateUser(
    @Body() userData: { name: string; email: string },
    @Headers('authorization') authHeader: string,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      console.log(error);
      throw new HttpException('Unauthrozed', 401);
    }
    return this.userService.updateUser(userData, token);
  }
}

import { Body, Controller, Get, Headers, HttpException, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import userDTO from './user/dto/user.dto';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/cities')
  getCity() {
    return this.appService.getAllCities();
  }
  @Get('/verify')
  verify(@Headers('authorization') authHeader: string) {
     let token: string;
        try {
          token = authHeader.split(' ')[1];
        } catch (error) {
          throw new HttpException('Not Authorized', 401);
        }
    return this.appService.verify(token);
  }
  @Get('/states')
  getState() {
    return this.appService.getAllStates();
  }
  @Post('/login')
  login(@Body() userData: userDTO) {
    return this.appService.login(userData);
  }
  @Get('/specializations')
  getSpecializations() {
    return this.appService.getSpecializations();
  }
  @Get('/diseases')
  getDiseases() {
    return this.appService.getDiseases();
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import userDTO from './dto/user.dto';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/cities')
  getCity() {
    return this.appService.getAllCities();
  }
  @Get('/verify/:token')
  verify(@Param("token") token:string) {
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
}

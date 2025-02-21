import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import userDTO from './dto/user.dto';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/cities')
  getCity() {
    return this.appService.getAllCities();
  }
  @Get('/verify')
  verify(@Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
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

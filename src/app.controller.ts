import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import userDTO from './user/dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';
import * as path from 'path';
import * as fs from 'fs';

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
  @Post('upload/dp')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      // fileFilter:,
      dest: './uploads/dp',
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  addProfilePicture(
    @Headers('authorization') authHeader: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      throw new HttpException('Some Error occurred while extracting file', 500);
    }
    return this.appService.saveFileUrl(file.filename, token);
  }
  @Get('get/user/:id')
  getUserById(@Param('id') id: string) {
    return this.appService.getUserById(id);
  }
}

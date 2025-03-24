import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  Req,
  Headers,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/doctor.dto';
import userDTO, { createUserDTO } from 'src/user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
@Controller('api/doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('/add')
  async createDoctor(
    @Body() doctorData: any,
    @Headers('authorization') authHeader: string,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      throw new HttpException('Not Authorized', 401);
    }
    let dto: CreateDoctorDto;
    let userData: createUserDTO;
    try {
      dto = {
        name: doctorData.name,
        specialization_id: doctorData.specialization_id,
        city_id: doctorData.city_id,
        hospital_id: doctorData.hospital_id,
        fees: doctorData.fees,
      };
      const hashedPassword = await bcrypt.hash(doctorData.password, 10);
      userData = {
        name: doctorData.name,
        email: doctorData.email,
        password: hashedPassword,
        city_id: doctorData.city_id,
        role_id: 3,
        userId: uuidv4(),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error during data transformation', 500);
    }
    return this.doctorService.createDoctor(dto, token, userData);
  }

  @Get('get-doctors/')
  async getAllDoctors(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('specialization') specialization: any,
    @Query('keyword') keyword: string,
    @Headers('authorization') authHeader: string,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      throw new HttpException('Not Authorized', 401);
    }
    return this.doctorService.getAllDoctors(
      page,
      limit,
      specialization,
      keyword,
      token,
    );
  }
  @Get('get-all')
  async getDoctors() {
    return this.doctorService.getDoctors();
  }
  @Get('appointment/get-all')
  async getDoctorsForAppointment(
    @Query('hospitalId', ParseIntPipe) hospitalId: number,
  ) {
    return this.doctorService.getDoctorsForAppointment(hospitalId);
  }

  @Get('get/:id')
  async getDoctorById(@Param('id') id: number) {
    return this.doctorService.getDoctorById(id);
  }

  @Put('/update/:id')
  async updateDoctor(
    @Param('id') id: number,
    @Body() dto: UpdateDoctorDto,
    @Headers('authorization') authHeader: string,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      throw new HttpException('Not Authorized', 401);
    }
    return this.doctorService.updateDoctor(id, dto, token);
  }
  @Get('restore/:id')
  async restoreDoctor(
    @Param('id') id: number,
    @Headers('authorization') authHeader: string,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      throw new HttpException('Not Authorized', 401);
    }
    return this.doctorService.restoreDoctor(id, token);
  }

  @Delete('soft/:id')
  async softDeleteDoctor(
    @Param('id') id: number,
    @Headers('authorization') authHeader: string,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      throw new HttpException('Not Authorized', 401);
    }
    return this.doctorService.softDeleteDoctor(id, token);
  }

  @Delete(':id')
  async deleteDoctor(
    @Param('id') id: number,
    @Headers('authorization') authHeader: string,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      throw new HttpException('Not Authorized', 401);
    }
    return this.doctorService.deleteDoctor(id, token);
  }
}

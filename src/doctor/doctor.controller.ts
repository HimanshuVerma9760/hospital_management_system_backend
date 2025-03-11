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

@Controller('api/doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('/add')
  async createDoctor(
    @Body() dto: CreateDoctorDto,
    @Headers('authorization') authHeader: string,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      throw new HttpException('Not Authorized', 401);
    }
    return this.doctorService.createDoctor(dto, token);
  }

  @Get('get-doctors/')
  async getAllDoctors(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('specialization') specialization: any,
    @Headers('authorization') authHeader: string,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      throw new HttpException('Not Authorized', 401);
    }
    return this.doctorService.getAllDoctors(page, limit, specialization, token);
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

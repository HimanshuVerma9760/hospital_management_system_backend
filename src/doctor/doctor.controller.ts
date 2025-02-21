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
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/doctor.dto';

@Controller('api/doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('/add/:token')
  async createDoctor(
    @Param('token') token: string,
    @Body() dto: CreateDoctorDto,
  ) {
    return this.doctorService.createDoctor(dto, token);
  }

  @Get('get-doctors/:token')
  async getAllDoctors(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('specialization') specialization: string,
    @Param('token') token: string,
  ) {
    return this.doctorService.getAllDoctors(page, limit, specialization ,token);
  }
  @Get('get-all')
  async getDoctors() {
    return this.doctorService.getDoctors();
  }

  @Get('get/:id')
  async getDoctorById(@Param('id') id: number) {
    return this.doctorService.getDoctorById(id);
  }

  @Put('/update/:id/:token')
  async updateDoctor(
    @Param('id') id: number,
    @Body() dto: UpdateDoctorDto,
    @Param('token') token: string,
  ) {
    return this.doctorService.updateDoctor(id, dto, token);
  }
  @Get('restore/:id/:token')
  async restoreDoctor(@Param('id') id: number, @Param('token') token: string) {
    return this.doctorService.restoreDoctor(id, token);
  }

  @Delete(':id/soft/:token')
  async softDeleteDoctor(
    @Param('id') id: number,
    @Param('token') token: string,
  ) {
    return this.doctorService.softDeleteDoctor(id, token);
  }

  @Delete(':id/:token')
  async deleteDoctor(@Param('id') id: number, @Param('token') token: string) {
    return this.doctorService.deleteDoctor(id, token);
  }
}

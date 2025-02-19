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

  @Post('/add')
  async createDoctor(@Body() dto: CreateDoctorDto) {
    return this.doctorService.createDoctor(dto);
  }

  @Get()
  async getAllDoctors(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.doctorService.getAllDoctors(page, limit);
  }

  @Get(':id')
  async getDoctorById(@Param('id') id: number) {
    return this.doctorService.getDoctorById(id);
  }

  @Put('/update/:id')
  async updateDoctor(@Param('id') id: number, @Body() dto: UpdateDoctorDto) {
    return this.doctorService.updateDoctor(id, dto);
  }

  @Delete(':id/soft')
  async softDeleteDoctor(@Param('id') id: number) {
    return this.doctorService.softDeleteDoctor(id);
  }

  @Delete(':id')
  async deleteDoctor(@Param('id') id: number) {
    return this.doctorService.deleteDoctor(id);
  }
}

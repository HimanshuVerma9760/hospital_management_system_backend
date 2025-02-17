import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { HospitalService } from './hospital.service';
import Hospital from 'src/Models/hospital.model';
import { CreateHospitalDto, UpdateHospitalDto } from './dto/hospital.dto';

@Controller('hospitals')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post()
  async createHospital(@Body() dto: CreateHospitalDto) {
    return this.hospitalService.createHospital(dto);
  }

  @Get()
  async getAllHospitals() {
    return this.hospitalService.getAllHospitals();
  }

  @Get(':id')
  async getHospitalById(@Param('id') id: number) {
    return this.hospitalService.getHospitalById(id);
  }

  @Put(':id')
  async updateHospital(
    @Param('id') id: number,
    @Body() dto: UpdateHospitalDto,
  ) {
    return this.hospitalService.updateHospital(id, dto);
  }

  @Delete(':id/soft')
  async softDeleteHospital(@Param('id') id: number) {
    return this.hospitalService.softDeleteHospital(id);
  }

  @Delete(':id')
  async deleteHospital(@Param('id') id: number) {
    return this.hospitalService.deleteHospital(id);
  }
}

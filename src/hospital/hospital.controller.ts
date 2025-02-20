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
import { HospitalService } from './hospital.service';
import Hospital from 'src/Models/hospital.model';
import { CreateHospitalDto, UpdateHospitalDto } from './dto/hospital.dto';

@Controller('api/hospitals')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post()
  async createHospital(@Body() dto: CreateHospitalDto) {
    return this.hospitalService.createHospital(dto);
  }

  @Get()
  async getAllHospitals(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.hospitalService.getAllHospitals(page, limit);
  }
  @Get('get-all')
  async getHospitals() {
    return this.hospitalService.getHospitals();
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

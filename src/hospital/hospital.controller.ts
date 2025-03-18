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
  Headers,
} from '@nestjs/common';
import { HospitalService } from './hospital.service';
import Hospital from 'src/Models/hospital.model';
import { CreateHospitalDto, UpdateHospitalDto } from './dto/hospital.dto';

@Controller('api/hospitals')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post('/add')
  async createHospital(
    @Body() dto: CreateHospitalDto,
    @Headers('authorization') authHeader: string,
  ) {
    const token = authHeader.split(' ')[1];
    return this.hospitalService.createHospital(dto, token);
  }

  @Get('get/')
  async getAllHospitals(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('keyword') keyword: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = authHeader.split(' ')[1];
    return this.hospitalService.getAllHospitals(page, limit, keyword, token);
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

  @Delete('delete/soft/:id')
  async softDeleteHospital(@Param('id') id: number) {
    return this.hospitalService.softDeleteHospital(id);
  }
  @Get('restore/:id')
  async restoreHospital(@Param('id') id: number) {
    return this.hospitalService.restoreHospital(id);
  }

  @Delete(':id')
  async deleteHospital(@Param('id') id: number) {
    return this.hospitalService.deleteHospital(id);
  }
}

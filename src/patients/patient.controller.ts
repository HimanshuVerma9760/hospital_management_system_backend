import {
  Body,
  Controller,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import PatientService from './patient.service';
import { AddPatientDto } from './dto/patient.dto';

@Controller('api/patients')
export default class PatientController {
  constructor(
    @Inject(PatientService) private readonly patientService: PatientService,
  ) {}

  @Get()
  getAllPatients(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('disease', ParseIntPipe) disease: number,
  ) {
    return this.patientService.getPatients(page, limit, disease);
  }

  @Post('add')
  async createHospital(@Body() dto: AddPatientDto) {
    return this.patientService.addPatient(dto);
  }
}

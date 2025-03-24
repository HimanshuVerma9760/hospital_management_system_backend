import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import PrescriptionsService from './prescription.service';
import AddPrescriptionDTO from './dto/prescription.dto';

@Controller('api/prescriptions')
export default class PrescriptionsController {
  constructor(
    @Inject(PrescriptionsService)
    private readonly priscriptionService: PrescriptionsService,
  ) {}

  @Post('add')
  async addPrescription(
    @Body() prescriptionFormData: AddPrescriptionDTO,
    @Headers('authorization') authHeader: string,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      console.log(error);
      throw new HttpException('Unauthorized', 401);
    }
    const doctor = await this.priscriptionService.findDoctorByUserId(
      prescriptionFormData.providedBy,
    );
    if (doctor) {
      prescriptionFormData.providedBy = doctor.id;
    } else {
      throw new HttpException('Could not find the selected doctor!', 500);
    }
    return this.priscriptionService.addPrescription(
      prescriptionFormData,
      token,
    );
  }
  @Get('get-all/:id')
  getAllPrescription(
    @Param('id', ParseIntPipe) id: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('keyword') keyword: string,
    @Headers('authorization') authHeader: string,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      console.log(error);
      throw new HttpException('Unauthorized', 401);
    }
    return this.priscriptionService.getAllPrescriptions(
      id,
      page,
      limit,
      token,
      keyword,
    );
  }
  @Put('edit/:id')
  editPrescription(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedFormData: any,
  ) {
    return this.priscriptionService.editPrescritpion(id, updatedFormData);
  }
}

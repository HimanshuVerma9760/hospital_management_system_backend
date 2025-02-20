import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Patient from 'src/Models/patient.model';
import { AddPatientDto } from './dto/patient.dto';

@Injectable()
export default class PatientService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
  ) {}

  async getPatients(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const { count, rows } = await this.patientModel.findAndCountAll({
      offset: skip,
      limit,
      distinct: true,
      include: { all: true },
    });

    return {
      response: 'Success',
      statusCode: '200',
      message: 'Successfully fetched all patients',
      totalRecords: count,
      result: rows,
    };
  }

  async addPatient(dto: AddPatientDto) {
     const result = await this.patientModel.create(dto as any);
     return { response: 'Success', statusCode: '201', result };
   }
}

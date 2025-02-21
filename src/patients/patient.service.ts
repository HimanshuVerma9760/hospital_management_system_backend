import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Patient from 'src/Models/patient.model';
import { AddPatientDto } from './dto/patient.dto';

@Injectable()
export default class PatientService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
  ) {}

  async getPatients(page: number, limit: number, disease: string) {
    const skip = (page - 1) * limit;
    let totalCount: number, result: any;
    if (disease === 'all') {
      const { count, rows } = await this.patientModel.findAndCountAll({
        offset: skip,
        limit,
        distinct: true,
        include: { all: true },
      });
      totalCount = count;
      result = rows;
    } else {
      const { count, rows } = await this.patientModel.findAndCountAll({
        offset: skip,
        limit,
        distinct: true,
        where: {
          disease: disease,
        },
        include: { all: true },
      });
      totalCount = count;
      result = rows;
    }

    return {
      response: 'Success',
      statusCode: '200',
      message: 'Successfully fetched all patients',
      totalRecords: totalCount,
      result: result,
    };
  }

  async addPatient(dto: AddPatientDto) {
    const result = await this.patientModel.create(dto as any);
    return {
      response: 'Success',
      message: 'Successfully added patient',
      statusCode: '201',
      result,
    };
  }
}

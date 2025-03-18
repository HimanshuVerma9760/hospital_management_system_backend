import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Patient from 'src/Models/patient.model';
import { AddPatientDto } from './dto/patient.dto';
import { Op, Sequelize } from 'sequelize';
import City from 'src/Models/city.model';
import Hospital from 'src/Models/hospital.model';
import Doctor from 'src/Models/doctor.model';
import Disease from 'src/Models/disease.model';

@Injectable()
export default class PatientService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
  ) {}

  async getPatients(
    page: number,
    limit: number,
    disease: any,
    keyword: string,
  ) {
    page = Math.max(page, 1);
    limit = Math.max(limit, 5);
    const offset = (page - 1) * limit;
    let whereCondition: any = {};

    if (keyword && keyword.trim().length > 0) {
      whereCondition[Op.or] = [
        { name: { [Op.like]: `%${keyword}%` } },
        Sequelize.literal(`city.name LIKE '%${keyword}%'`),
        Sequelize.literal(`hospital.name LIKE '%${keyword}%'`),
        Sequelize.literal(`disease.name LIKE '%${keyword}%'`),
        Sequelize.literal(`doctor.name LIKE '%${keyword}%'`),
      ];
    }
    if (disease && disease !== '0') {
      whereCondition.disease_id = disease;
    }
    //name,city,hospital,disease, doctor.

    const { count, rows } = await this.patientModel.findAndCountAll({
      offset,
      limit,
      distinct: true,
      where: whereCondition,
      include: [
        {
          model: City,
          as: 'city',
          required: false,
          attributes: ['id', 'name'],
        },
        {
          model: Hospital,
          as: 'hospital',
          required: false,
          attributes: ['id', 'name'],
        },
        {
          model: Disease,
          as: 'disease',
          required: false,
          attributes: ['id', 'name'],
        },
        {
          model: Doctor,
          as: 'doctor',
          required: false,
          attributes: ['id', 'name'],
        },
      ],
      logging: console.log,
    });

    return {
      response: 'Success',
      message: 'Successfully fetched all doctors',
      statusCode: 200,
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      result: rows,
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

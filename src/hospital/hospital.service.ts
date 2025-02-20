import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Hospital from 'src/Models/hospital.model';
import { CreateHospitalDto, UpdateHospitalDto } from './dto/hospital.dto';

@Injectable()
export class HospitalService {
  constructor(@InjectModel(Hospital) private hospitalModel: typeof Hospital) {}

  async createHospital(dto: CreateHospitalDto) {
    const result = await this.hospitalModel.create(dto as any);
    return { response: 'Success', statusCode: '201', result };
  }

  async getAllHospitals(page: number, limit: number) {
    if (page < 1) page = 1;
    if (limit < 1) limit = 5;
    const skip = (page - 1) * limit;
    const { count, rows } = await this.hospitalModel.findAndCountAll({
      offset: skip,
      limit: limit,
      distinct: true,
      include: { all: true },
    });
    console.log('count: ', count);
    return {
      response: 'Success',
      message: 'Successfully fetched all hospitals',
      statusCode: '200',
      totalRecords: count,
      result: rows,
    };
  }

  async getHospitals() {
    const result = await this.hospitalModel.findAll({ include: { all: true } });
    console.log(result);
    return {
      response: 'Success',
      statusCode: '200',
      message: 'Succesfully fetched all hospitals',
      result,
    };
  }

  async getHospitalById(id: number) {
    const hospital = await this.hospitalModel.findByPk(id, {
      include: { all: true },
    });
    if (!hospital) throw new HttpException('Hospital not found', 404);
    return {
      response: 'Success',
      message: 'Successfully fetched hospital by id',
      statusCode: '200',
      hospital,
    };
  }

  async updateHospital(id: number, dto: UpdateHospitalDto) {
    const hospital = await this.getHospitalById(id);
    const updatedHospital = await hospital.hospital.update(dto);
    return { response: 'Success', statusCode: '201', updatedHospital };
  }

  async softDeleteHospital(id: number) {
    try {
      const hospital = await this.getHospitalById(id);
      await hospital.hospital.update({ deletedAt: new Date() });

      return {
        response: 'Success',
        message: 'Successfully marked as deleted',
        statusCode: '201',
      };
    } catch (error) {
      throw new HttpException(
        'Some Error Occurred while deleting the Hospital',
        500,
      );
    }
  }

  async deleteHospital(id: number) {
    try {
      const hospital = await this.getHospitalById(id);
      await hospital.hospital.destroy();
      return {
        response: 'Success',
        message: 'Successfully deleted Permanently',
        statusCode: '201',
      };
    } catch (error) {
      throw new HttpException(
        'Some Error Occured While Permanently Deleting Hospital',
        500,
      );
    }
  }
}

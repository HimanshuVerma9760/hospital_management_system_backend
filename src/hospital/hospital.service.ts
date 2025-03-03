import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Hospital from 'src/Models/hospital.model';
import { CreateHospitalDto, UpdateHospitalDto } from './dto/hospital.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class HospitalService {
  constructor(@InjectModel(Hospital) private hospitalModel: typeof Hospital) {}

  verifyToken(token: string) {
    try {
      const verifiedToken = jwt.verify(token, process.env.USER_KEY);
      return verifiedToken.role;
    } catch (error) {
      throw new HttpException('Not Authorized', 401);
    }
  }
  async createHospital(dto: CreateHospitalDto, token: string) {
    const role = this.verifyToken(token);
    if (!(role === 'Super-Admin' || role === 'Admin')) {
      throw new HttpException('Not Authorized', 401);
    }
    try {
      const result = await this.hospitalModel.create(dto as any);
      return { response: 'Success', statusCode: '201', result };
    } catch (error) {
      throw new HttpException('Some Error Occurred while adding hospital', 500);
    }
  }

  async getAllHospitals(page: number, limit: number, token: string) {
    const role = this.verifyToken(token);
    if (!(role === 'Super-Admin' || role === 'Admin')) {
      throw new HttpException('Not Authorized', 401);
    }
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
    return {
      response: 'Success',
      statusCode: '201',
      message: 'Successfully updated hospital',
      updatedHospital,
    };
  }

  async softDeleteHospital(id: number) {
    try {
      const hospital = await this.getHospitalById(id);
      await hospital.hospital.update({ deletedAt: new Date(), status: false });

      return {
        response: 'Success',
        message: 'Successfully marked as in-active',
        statusCode: '201',
      };
    } catch (error) {
      throw new HttpException(
        'Some Error Occurred while deleting the Hospital',
        500,
      );
    }
  }
  async restoreHospital(id: number) {
    try {
      const hospital = await this.getHospitalById(id);
      await hospital.hospital.update({ status: true });

      return {
        response: 'Success',
        message: 'Successfully restored deleted',
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

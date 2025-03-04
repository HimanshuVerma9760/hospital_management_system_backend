import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/doctor.dto';
import Doctor from 'src/Models/doctor.model';
import * as jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor) private doctorModel: typeof Doctor) {}

  verifyToken(token: string) {
    try {
      const verifiedToken = jwt.verify(token, process.env.USER_KEY);
      return verifiedToken.role;
    } catch (error) {
      throw new HttpException('Not Authorized', 401);
    }
  }

  async createDoctor(dto: CreateDoctorDto, authHeader: string) {
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    const role = this.verifyToken(token);
    if (!(role === 'Super-Admin' || role === 'Admin')) {
      throw new HttpException('Not Authorized', 401);
    }
    const doctorName = dto.name.split(' ');
    if (doctorName[0] !== 'Dr.') {
      dto.name = 'Dr. ' + dto.name;
    }
    const isUnique = await this.checkDoctorDuplicacy(dto);
    if (isUnique) {
      const result = await this.doctorModel.create(dto as any);
      return {
        response: 'Success',
        message: 'Successfully Added Doctor',
        statusCode: '201',
        result,
      };
    } else {
      throw new HttpException('Duplicate entry', 500);
    }
  }

  async getDoctors() {
    const result = await this.doctorModel.findAll({
      where: {
        status: true,
      },
      include: { all: true },
    });
    return {
      response: 'Success',
      statusCode: '202',
      message: 'Successfully fetched all doctors',
      result,
    };
  }
  async getDoctorsForAppointment(hospitalId: number) {
    const result = await this.doctorModel.findAll({
      where: {
        status: true,
        hospital_id: hospitalId,
      },
      include: { all: true },
    });
    return {
      response: 'Success',
      statusCode: '202',
      message: 'Successfully fetched all doctors',
      result,
    };
  }
  async getAllDoctors(
    page: number,
    limit: number,
    specialization: any,
    token: string,
  ) {
    const role = this.verifyToken(token);
    if (!(role === 'Super-Admin' || role === 'Admin')) {
      throw new HttpException('Not Authorized', 401);
    }
    if (page < 1) page = 1;
    if (limit < 1) limit = 5;

    const offset = (page - 1) * limit;
    let totalCount: number, result: any;
    if (specialization === '0' || !specialization || specialization === '') {
      const { count, rows } = await this.doctorModel.findAndCountAll({
        offset,
        limit,
        distinct: true,
        include: { all: true },
      });
      totalCount = count;
      result = rows;
    } else {
      const { count, rows } = await this.doctorModel.findAndCountAll({
        offset,
        limit,
        distinct: true,
        where: {
          specialization_id: specialization,
        },
        include: { all: true },
      });
      totalCount = count;
      result = rows;
    }
    return {
      response: 'Success',
      message: 'Successfully fetched all doctors',
      statusCode: 200,
      totalRecords: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      result: result,
    };
  }

  async getDoctorById(id: number) {
    const doctor = await this.doctorModel.findByPk(id, {
      include: { all: true },
    });
    if (!doctor) throw new HttpException('Doctor not found', 404);
    return {
      response: 'Success',
      message: 'Successfully fetched doctor by id',
      statusCode: '200',
      doctor,
    };
  }
  async checkDoctorDuplicacy(doctor: any, excludeId?: number) {
    const doctorDesignation = doctor.name.split(' ')[0];
    if (doctorDesignation !== 'Dr.') {
      doctor.name = `Dr. ${doctor.name}`;
    }
    const existingDoctor = await this.doctorModel.findOne({
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('name')),
            Op.eq,
            doctor.name.toLowerCase(),
          ),
          { city_id: doctor.city_id },
          { specialization_id: doctor.specialization_id },
          { hospital_id: doctor.hospital_id },
          excludeId ? { id: { [Op.ne]: excludeId } } : {},
        ],
      },
    });

    if (existingDoctor) {
      throw new HttpException('Duplicate entry!', 409);
    }

    return true;
  }
  async updateDoctor(id: number, dto: UpdateDoctorDto, token: string) {
    const role = this.verifyToken(token);
    if (!(role === 'Super-Admin' || role === 'Admin')) {
      throw new HttpException('Not Authorized', 401);
    }

    const doctor = await this.getDoctorById(id);
    await this.checkDoctorDuplicacy(dto, id);

    try {
      const updatedDoctor = await doctor.doctor.update(dto);
      return {
        response: 'Success',
        message: 'Successfully updated doctor info',
        statusCode: '201',
        updatedDoctor,
      };
    } catch (error) {
      throw new HttpException('Error occurred while updating doctor', 500);
    }
  }
  async softDeleteDoctor(id: number, token: string) {
    const role = this.verifyToken(token);
    if (!(role === 'Super-Admin' || role === 'Admin')) {
      throw new HttpException('Not Authorized', 401);
    }
    try {
      const doctor = await this.getDoctorById(id);
      await doctor.doctor.update({ deletedAt: new Date(), status: false });
      return {
        response: 'Success',
        message: 'Successfully marked the doctor as deleted',
        statusCode: '201',
      };
    } catch (error) {
      throw new HttpException(
        'Some Error Occurred while soft deleting the Doctor',
        404,
      );
    }
  }
  async restoreDoctor(id: number, token: string) {
    const role = this.verifyToken(token);
    if (!(role === 'Super-Admin' || role === 'Admin')) {
      throw new HttpException('Not Authorized', 401);
    }
    try {
      const doctor = await this.getDoctorById(id);
      await doctor.doctor.update({ status: true });
      return {
        response: 'Success',
        message: 'Successfully restored the doctor',
        statusCode: '201',
      };
    } catch (error) {
      throw new HttpException(
        'Some Error Occurred while restoring Doctor',
        404,
      );
    }
  }

  async deleteDoctor(id: number, token: string) {
    const role = this.verifyToken(token);
    if (!(role === 'Super-Admin' || role === 'Admin')) {
      throw new HttpException('Not Authorized', 401);
    }
    try {
      const doctor = await this.getDoctorById(id);
      await doctor.doctor.destroy();
      return {
        response: 'Success',
        message: 'Successfully deleted the doctor',
        statusCode: '201',
      };
    } catch (error) {
      throw new HttpException(
        'Some Error Occurred while soft deleting the Doctor',
        404,
      );
    }
  }
}

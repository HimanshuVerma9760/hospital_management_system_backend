import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/doctor.dto';
import Doctor from 'src/Models/doctor.model';
import * as jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import City from 'src/Models/city.model';
import Hospital from 'src/Models/hospital.model';
import Specialization from 'src/Models/specialization.model';

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

  async createDoctor(dto: CreateDoctorDto, token: string) {
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

  async getAllDoctors(
    page: number,
    limit: number,
    specialization_id: any,
    keyword: string,
    token: string,
  ) {
    const role = this.verifyToken(token);
    if (!(role === 'Super-Admin' || role === 'Admin')) {
      throw new HttpException('Not Authorized', 401);
    }

    page = Math.max(page, 1);
    limit = Math.max(limit, 5);
    const offset = (page - 1) * limit;

    let whereCondition: any = {};

    if (keyword && keyword.trim().length > 0) {
      whereCondition[Op.or] = [
        Sequelize.where(
          Sequelize.fn('REPLACE', Sequelize.col('Doctor.name'), 'Dr. ', ''),
          { [Op.like]: `%${keyword}%` },
        ),
        Sequelize.literal(`city.name LIKE '%${keyword}%'`),
        Sequelize.literal(`hospital.name LIKE '%${keyword}%'`),
        Sequelize.literal(`specialization.name LIKE '%${keyword}%'`),
      ];
    }

    if (specialization_id && specialization_id !== '0') {
      whereCondition.specialization_id = specialization_id;
    }

    const { count, rows } = await this.doctorModel.findAndCountAll({
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
          model: Specialization,
          as: 'specialization',
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
}

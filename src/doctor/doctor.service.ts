import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/doctor.dto';
import Doctor from 'src/Models/doctor.model';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor) private doctorModel: typeof Doctor) {}

  async createDoctor(dto: CreateDoctorDto) {
    const result = await this.doctorModel.create(dto as any);
    return {
      response: 'Success!',
      message: 'Successfully Added Doctor!',
      code: '202',
      result,
    };
  }

  async getAllDoctors() {
    const result = await this.doctorModel.findAll({ include: { all: true } });
    return {
      response: 'Success!',
      message: 'Successfully fetched all doctors!',
      code: '202',
      result,
    };
  }

  async getDoctorById(id: number) {
    const doctor = await this.doctorModel.findByPk(id, {
      include: { all: true },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return {
      response: 'Success!',
      message: 'Successfully fetched doctor by id!',
      code: '202',
      doctor,
    };
  }

  async updateDoctor(id: number, dto: UpdateDoctorDto) {
    const doctor = await this.getDoctorById(id);
    let updatedDoctor: any;
    try {
      updatedDoctor = await doctor.doctor.update(dto);
    } catch (error) {
      throw new HttpException('Error Occure while updating doctor!', 404);
    }
    if (updatedDoctor) {
      return {
        response: 'Success!',
        message: 'Successfully updated doctor info!',
        code: '202',
        updatedDoctor,
      };
    } else {
      throw new HttpException('Error Occure while updating doctor!', 404);
    }
  }

  async softDeleteDoctor(id: number) {
    try {
      const doctor = await this.getDoctorById(id);
      await doctor.doctor.update({ deletedAt: new Date() });
      return {
        response: 'Success!',
        message: 'Successfully marked the doctor as deleted!',
        code: '202',
      };
    } catch (error) {
      throw new HttpException(
        'Some Error Occurred while soft deleting the Doctor!',
        404,
      );
    }
  }

  async deleteDoctor(id: number) {
    try {
      const doctor = await this.getDoctorById(id);
      await doctor.doctor.destroy();
      return {
        response: 'Success!',
        message: 'Successfully deleted the doctor!',
        code: '202',
      };
    } catch (error) {
      throw new HttpException(
        'Some Error Occurred while soft deleting the Doctor!',
        404,
      );
    }
  }
}

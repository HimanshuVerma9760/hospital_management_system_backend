import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Hospital from 'src/Models/hospital.model';
import { CreateHospitalDto, UpdateHospitalDto } from './dto/hospital.dto';

@Injectable()
export class HospitalService {
  constructor(@InjectModel(Hospital) private hospitalModel: typeof Hospital) {}

  async createHospital(dto: CreateHospitalDto) {
    const result = await this.hospitalModel.create(dto as any);
    return { response: 'Success', code: '202', result };
  }

  async getAllHospitals() {
    const hospitals = await this.hospitalModel.findAll({
      include: { all: true },
    });
    return { response: 'Success', code: '202', hospitals };
  }

  async getHospitalById(id: number) {
    const hospital = await this.hospitalModel.findByPk(id, {
      include: { all: true },
    });
    if (!hospital) throw new NotFoundException('Hospital not found');
    return { response: 'Success', code: '202', hospital };
  }

  async updateHospital(id: number, dto: UpdateHospitalDto) {
    const hospital = await this.getHospitalById(id);
    const updatedHospital = await hospital.hospital.update(dto);
    return { response: 'Success', code: '202', updatedHospital };
  }

  async softDeleteHospital(id: number) {
    try {
      const hospital = await this.getHospitalById(id);
      await hospital.hospital.update({ deletedAt: new Date() });

      return { response: 'Successfully Deleted! (Soft) !', code: '202' };
    } catch (error) {
      throw new HttpException(
        'Some Error Occurred while deleting the Hospital',
        404,
      );
    }
  }

  async deleteHospital(id: number) {
    try {
      const hospital = await this.getHospitalById(id);
      await hospital.hospital.destroy();
      return { response: 'Successfully deleted Permanently!', code: '202' };
    } catch (error) {
      throw new HttpException(
        'Some Error Occured While Permanently Deleting Hospital!',
        404,
      );
    }
  }
}

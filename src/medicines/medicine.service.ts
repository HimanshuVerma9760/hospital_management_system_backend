import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Medicines from 'src/Models/medicine.model';

@Injectable()
export default class MedicineService {
  constructor(
    @InjectModel(Medicines) private readonly medicineModel: typeof Medicines,
  ) {}

  async getAllMedicines() {
    try {
      const result = await this.medicineModel.findAll({
        include: { all: true },
      });
      if (result) {
        return {
          response: 'Success',
          statusCode: 200,
          message: 'Fetched all medicines',
          result,
        };
      }
      throw new HttpException('Medicines not found', 500);
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal server error', 500);
    }
  }
}

import { Controller, Get, Inject } from '@nestjs/common';
import MedicineService from './medicine.service';

@Controller('api/medicines')
export default class MedicineController {
  constructor(
    @Inject(MedicineService) private readonly medicineService: MedicineService,
  ) {}

  @Get('get-all')
  getAllMedicines() {
    return this.medicineService.getAllMedicines();
  }
}

import {
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export default class AddPrescriptionDTO {
  @IsNotEmpty({ message: 'Patient must not be empty' })
  @IsNumber({}, { message: 'Patient must be a number (id)' })
  patient: number;

  @IsNotEmpty({ message: 'ProvidedBy must not be empty' })
  @IsNumber({}, { message: 'ProvidedBy must be number (id of the doctor)' })
  providedBy: number;

  @IsOptional()
  @IsString({ message: 'Notes must be string' })
  notes: string;

  @IsNotEmpty({ message: 'Medicines must not be empty' })
  @IsJSON()
  medicines: JSON;
}

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
export class AddPatientDto {
  @IsNotEmpty({ message: 'Name cannot be Empty!' })
  @IsString({ message: 'Name must be a String!' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must not contain numbers or special characters!',
  })
  name: string;

  @IsNotEmpty({ message: 'Disease cannot be Empty!' })
  @IsString({ message: 'Disease must be a String!' })
  disease: string;

  @IsNotEmpty({ message: 'City Id cannot be Empty!' })
  @IsNumber({}, { message: 'City Id must be number' })
  city_id: number;
  @IsNotEmpty({ message: 'Hospital Id cannot be Empty!' })
  @IsNumber({}, { message: 'Hospital Id must be number' })
  hospital_id: number;
  @IsNotEmpty({ message: 'Doctor Id cannot be Empty!' })
  @IsNumber({}, { message: 'Doctor Id must be number' })
  doctor_id: number;
}

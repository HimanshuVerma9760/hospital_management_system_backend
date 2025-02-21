import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty({ message: 'Name cannot be Empty!' })
  @IsString({ message: 'Name must be a String!' })
  @Matches(/^[A-Za-z\s.]+$/, {
    message: 'Name must not contain numbers or special characters!',
  })
  name: string;

  @IsNotEmpty({ message: 'specialization cannot be Empty!' })
  @IsNumber({}, { message: 'Specialization Id must be number' })
  specialization_id: number;

  @IsNotEmpty({ message: 'Hospital Id cannot be Empty!' })
  @IsNumber({}, { message: 'Hospital Id must be number' })
  hospital_id: number;

  @IsNotEmpty({ message: 'City Id cannot be Empty!' })
  @IsNumber({}, { message: 'City Id must be number' })
  city_id: number;
}

export class UpdateDoctorDto {
  @IsOptional()
  @Matches(/^[A-Za-z\s.]+$/, {
    message: 'Name must not contain numbers or special characters!',
  })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'specialization cannot be Empty!' })
  @IsNumber({}, { message: 'Specialization Id must be number' })
  specialization_id?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Hospital Id cannot be Empty!' })
  @IsNumber({}, { message: 'Hospital Id must be number' })
  hospital_id?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'City Id cannot be Empty!' })
  @IsNumber({}, { message: 'City Id must be number' })
  city_id?: number;
}

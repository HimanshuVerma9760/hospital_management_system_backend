import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateHospitalDto {
  @IsNotEmpty({ message: 'Name cannot be Empty!' })
  @IsString({ message: 'Name must be a String!' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must not contain numbers or special characters!',
  })
  name: string;

  @IsNotEmpty({ message: 'Location cannot be Empty!' })
  @IsString({ message: 'Location must be a String!' })
  location: string;

  @IsNotEmpty({ message: 'City Id cannot be Empty!' })
  @IsNumber({}, { message: 'City Id must be number' })
  city_id: number;
}

export class UpdateHospitalDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Name cannot be Empty!' })
  @IsString({ message: 'Name must be a String!' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must not contain numbers or special characters!',
  })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Location cannot be Empty!' })
  @IsString({ message: 'Location must be a String!' })
  location?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'City Id cannot be Empty!' })
  @IsNumber({}, { message: 'City Id must be number' })
  city_id?: number;
}

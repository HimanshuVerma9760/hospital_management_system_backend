import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export default class AppointmentDTO {
  @IsNotEmpty({ message: 'Patient Name cannot be Empty!' })
  @IsString({ message: 'Patient Name must be a String' })
  patientName: string;

  @IsNotEmpty({ message: 'Patient Email cannot be Empty!' })
  @IsEmail({}, { message: 'Patient Email must be valid' })
  patientEmail: string;

  @IsNotEmpty({ message: 'Disease Id cannot be Empty!' })
  @IsNumber({}, { message: 'Disease Id must be a Number' })
  disease_id: number;

  @IsNotEmpty({ message: 'Hospital Id cannot be Empty!' })
  @IsNumber({}, { message: 'Hospital Id must be a Number' })
  hospital_id: number;

  @IsNotEmpty({ message: 'Doctor Id cannot be Empty!' })
  @IsNumber({}, { message: 'Doctor Id must be a Number' })
  doctor_id: number;

  @IsNotEmpty({ message: 'Appointment Date cannot be Empty!' })
  @IsDateString({}, { message: 'Appointment Date must be a valid Date String' })
  appointment_date: string;

  @IsNotEmpty({ message: 'Appointment Time cannot be Empty!' })
  @IsString({ message: 'Appointment Time must be a String' })
  appointment_time: string;

  @IsOptional()
  @IsString({ message: 'Status must be a String!' })
  status?: string;
}

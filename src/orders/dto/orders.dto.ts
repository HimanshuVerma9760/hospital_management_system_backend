import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export default class OrderDTO {
  @IsNotEmpty({ message: 'Appointment ID cannot be Empty!' })
  @IsNumber({}, { message: 'Appointment ID must be a Number' })
  appointment_id: number;

  @IsNotEmpty({ message: 'Amount cannot be Empty!' })
  @IsNumber({}, { message: 'Amount must be a Number' })
  amount: number;

  @IsNotEmpty({ message: 'Payment Method cannot be Empty!' })
  @IsString({ message: 'Payment Method must be a String' })
  paymentMethod: string;

  @IsOptional()
  @IsString({ message: 'Payment Status must be a String' })
  paymentStatus?: string;
}

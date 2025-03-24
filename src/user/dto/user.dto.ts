import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class userDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
export class createUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  city_id: number;

  @IsNotEmpty()
  @IsNumber()
  role_id: number;
}

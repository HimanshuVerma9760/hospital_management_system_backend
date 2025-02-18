import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class userDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class FormDTO {
  @IsNotEmpty({ message: 'Must provide a title for the form' })
  @IsString({ message: 'Title must be a string' })
  title: string;
  @IsNotEmpty({ message: 'Must provide a description for the form' })
  @IsString({ message: 'Description must be a string' })
  description: string;
}

export class EditFormDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'Must provide a title for the form' })
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Must provide a description for the form' })
  @IsString({ message: 'Description must be a string' })
  description?: string;
}

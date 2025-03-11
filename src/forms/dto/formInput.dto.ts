import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export default class FormInputDTO {
  @IsNotEmpty({ message: 'Must provide a input type' })
  @IsObject({ message: 'Input type must be a Json object' })
  inputType: object;
}

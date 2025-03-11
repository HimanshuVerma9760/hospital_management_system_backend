import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import FormService from './form.service';
import FormDTO, { EditFormDTO } from './dto/form.dto';
import FormInputDTO from './dto/formInput.dto';

@Controller('api/form')
export default class FormController {
  constructor(
    @Inject(FormService)
    private readonly formService: FormService,
  ) {}

  @Get('get-all')
  getForms(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Headers('authorization') authHeader: string,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      throw new HttpException('UnAuthorized', 401);
    }
    return this.formService.getAllForms(token, page, limit);
  }

  @Get('verify/:id')
  checkForm(
    @Query('form') form: string,
    @Query('type') type: string,
    @Param('id', ParseIntPipe) formId: number,
  ) {
    return this.formService.checkForm(form, type, formId);
  }
  @Get('get/:id')
  getFormWithId(@Param('id') id: number) {
    return this.formService.getFormWithId(id);
  }

  @Post('edit/:id')
  editForm(
    @Body() formData: EditFormDTO,
    @Headers('authorization') authHeader: string,
    @Param('id') id: number,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      console.log('controller, token extraction error', error);
      throw new HttpException('UnAuthorized', 401);
    }
    return this.formService.editForm(formData, token, id);
  }
  @Post('create')
  createForm(
    @Body() rawFormData: any,
    @Headers('authorization') authHeader: string,
  ) {
    let token: string;
    try {
      token = authHeader.split(' ')[1];
    } catch (error) {
      console.log('controller, token extraction error', error);
      throw new HttpException('UnAuthorized', 401);
    }
    const formData: FormDTO = {
      title: rawFormData.title,
      description: rawFormData.description,
    };
    const formInputData: FormInputDTO = {
      inputType: rawFormData.inputType,
    };
    return this.formService.createForm(formInputData, formData, token);
  }
}

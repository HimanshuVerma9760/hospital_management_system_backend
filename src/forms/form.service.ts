import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import FormInputs from 'src/Models/formInput.model';
import FormInputDTO from './dto/formInput.dto';
import FormDTO, { EditFormDTO } from './dto/form.dto';
import Forms from 'src/Models/forms.model';
import * as jwt from 'jsonwebtoken';
import { Sequelize } from 'sequelize-typescript';
// const userKey = process.env.USER_KEY;

@Injectable()
export default class FormService {
  constructor(
    @InjectModel(FormInputs) private readonly formInputModel: typeof FormInputs,
    @InjectModel(Forms) private readonly formModel: typeof Forms,
    @Inject(Sequelize) private readonly sequelize: Sequelize,
  ) {}

  async editForm(formData: EditFormDTO, token: string, id: number) {
    try {
      const verifiedUser = jwt.verify(token, process.env.USER_KEY);
      if (verifiedUser.role === 'patient') {
        console.log('Unauthorized access, (Patient)');
        throw new HttpException('Unauthorized access', 401);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Not Authorized', 401);
    }
    try {
      const form = await this.formModel.findByPk(id);
      if (form) {
        const updatedForm = await form.update(formData);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Error occured while updating form', 500);
    }
  }
  async getFormWithId(id: number) {
    try {
      const result = await this.formModel.findByPk(id);
      return {
        response: 'Success',
        statusCode: 200,
        message: 'Form found',
        result,
      };
    } catch (error) {}
  }
  async checkForm(form: string, type: string, formId?: number) {
    const result = await this.formModel.findAll({ where: { title: form } });

    if (type === 'editForm') {
      if (
        result.length > 1 ||
        (result.length === 1 && result[0].id !== formId)
      ) {
        console.log(
          'result: ',
          result[0].id,
          ' formId: ',
          formId,
          ' length: ',
          result.length,
        );
        throw new HttpException('Form already exists', 500);
      }
      return {
        response: 'success',
        statusCode: 200,
        message: 'Form name is acceptable',
      };
    }

    if (result.length !== 0) {
      throw new HttpException('Form already exists', 500);
    }
    return {
      response: 'success',
      statusCode: 200,
      message: 'Form name is acceptable',
    };
  }
  async getAllForms(token: string, page: number, limit: number) {
    try {
      const verifiedUser = jwt.verify(token, process.env.USER_KEY);
      if (verifiedUser.role === 'patient') {
        console.log('Unauthorized access, (Patient)');
        throw new HttpException('Unauthorized access', 401);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Not Authorized', 401);
    }
    try {
      const offset = (page - 1) * limit;
      const { rows, count } = await this.formInputModel.findAndCountAll({
        offset,
        limit,
        include: { all: true },
      });
      // console.log(result);
      return {
        response: 'Success',
        statusCode: 200,
        message: 'Successfully fetched all form data',
        result: rows,
        totalRecords: count,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Some error occured while fetching forms', 500);
    }
  }
  async createForm(
    recievedFormInputData: FormInputDTO,
    recievedFormData: FormDTO,
    token: string,
  ) {
    let verifiedUser: any;
    try {
      verifiedUser = await jwt.verify(token, process.env.USER_KEY);
    } catch (error) {
      console.log('verification error', error);
      throw new HttpException('UnAuthorised', 401);
    }
    if (!verifiedUser) {
      console.log('verification error');
      throw new HttpException('UnAuthorised', 401);
    }
    const transaction = await this.sequelize.transaction();
    try {
      let formResult: any;
      const formData = {
        ...recievedFormData,
        createdBy: verifiedUser.id,
      };
      console.log(formData);
      formResult = await this.formModel.create(formData as any, {
        transaction,
      });
      const formInputData = {
        ...recievedFormInputData,
        formId: formResult.id,
      };
      console.log(formInputData);
      const formInputResult = await this.formInputModel.create(
        formInputData as any,
        { transaction },
      );
      await transaction.commit();
      return {
        response: 'Success',
        statusCode: 200,
        message: 'Successfully created your custom form',
        formResult,
        formInputResult,
      };
    } catch (error) {
      await transaction.rollback();
      console.log('error details: ', error);
      throw new HttpException('Some error occurred while updating tables', 500);
    }
  }
}

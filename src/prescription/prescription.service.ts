import { Get, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Prescriptions from 'src/Models/prescription.model';
import * as jwt from 'jsonwebtoken';
import Doctor from 'src/Models/doctor.model';
import { Op, Sequelize } from 'sequelize';
import Patient from 'src/Models/patient.model';
import Disease from 'src/Models/disease.model';
import Hospital from 'src/Models/hospital.model';

@Injectable()
export default class PrescriptionsService {
  constructor(
    @InjectModel(Prescriptions)
    private readonly prescriptionModel: typeof Prescriptions,
    @InjectModel(Doctor)
    private readonly doctorModel: typeof Doctor,
  ) {}

  verifyToken(token: string) {
    try {
      const verifiedToken = jwt.verify(token, process.env.USER_KEY);
      if (verifiedToken) {
        return {
          response: true,
          verifiedToken,
        };
      } else {
        throw new HttpException('Unauthorized', 401);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Unauthorized', 401);
    }
  }
  async findDoctorByUserId(userID: number) {
    try {
      const doctor = await this.doctorModel.findOne({
        where: {
          userId: userID,
        },
      });
      if (doctor) {
        return doctor;
      } else {
        throw new HttpException('Doctor with the provided id not found', 500);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Doctor with the provided id not found, server error',
        500,
      );
    }
  }
  async addPrescription(formData: any, token: string) {
    try {
      const verifiedUser = this.verifyToken(token);
      if (
        verifiedUser.response &&
        verifiedUser.verifiedToken.role === 'Doctor'
      ) {
        const result = await this.prescriptionModel.create(formData);
        if (result) {
          return {
            response: 'Success',
            statusCode: 202,
            message: 'Successfully created prescription',
          };
        }
      } else {
        throw new HttpException('Unauthorized access', 401);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error while creating prescription',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  async getAllPrescriptions(
    id: number,
    page: number,
    limit: number,
    token: string,
    keyword: string,
  ) {
    let verifiedUser: any;
    try {
      verifiedUser = this.verifyToken(token);
      if (!verifiedUser.response) {
        throw new HttpException('Unauthorised', 401);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Unauthorised', 401);
    }
    let whereCondition: any = {};
    let doctorCondition: any = {};
    if (keyword && keyword.trim().length > 0) {
      whereCondition[Op.or] = [
        Sequelize.literal(`associatedPatient.name LIKE '%${keyword}%'`),
        Sequelize.literal(`doctor.name LIKE '%${keyword}%'`),
      ];
    }
    if (
      !(
        verifiedUser.verifiedToken.role === 'Admin' ||
        verifiedUser.verifiedToken.role === 'Super-Admin'
      )
    ) {
      doctorCondition = { userId: id };
    }
    const offset = (page - 1) * limit;
    try {
      const { rows, count } = await this.prescriptionModel.findAndCountAll({
        offset,
        limit,
        where: whereCondition,
        include: [
          {
            model: Doctor,
            as: 'doctor',
            required: true,
            where: doctorCondition,
            include: [{ model: Hospital, as: 'hospital' }],
          },
          {
            model: Patient,
            as: 'associatedPatient',
            include: [{ model: Disease, as: 'disease' }],
          },
        ],
      });
      if (rows.length !== 0) {
        return {
          response: 'Success',
          statusCode: 200,
          message: 'Succesfully fetched the prescriptions',
          result: rows,
          totalRecords: count,
        };
      } else {
        throw new HttpException(
          'No Prescriptions found!',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.log('error in prescriptions fetching: ', error);
      throw new HttpException('No Prescriptions found!', HttpStatus.NOT_FOUND);
    }
  }

  async editPrescritpion(id: number, updatedFormData: any) {
    try {
      const prescription = await this.prescriptionModel.findByPk(id);
      if (prescription) {
        const result = await prescription.update(updatedFormData);
        if (result) {
          return {
            response: 'Success',
            statusCode: HttpStatus.ACCEPTED,
            message: 'Successfully updated prescription',
          };
        }
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error while saving changes',
        HttpStatus.NOT_MODIFIED,
      );
    }
  }
}

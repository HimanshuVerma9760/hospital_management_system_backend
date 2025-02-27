import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from 'src/Models/appointment.model';
import * as moment from 'moment';
import AppointmentDTO from './dto/appointmnets.dto';
import { Order } from 'src/Models/order.model';

@Injectable()
export default class AppointmentsService {
  constructor(
    @InjectModel(Appointment)
    private readonly appointmentModel: typeof Appointment,
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
  ) {}

  async createAppointment(
    appointmentData: AppointmentDTO,
    fees: number,
    paymentMethod: string,
  ) {
    try {
      const existingAppointment = await this.appointmentModel.findOne({
        where: { patientEmail: appointmentData.patientEmail },
      });

      if (existingAppointment) {
        throw new HttpException('Already have an appointment', 406);
      }

      const mergedDateTime = moment(
        ` ${appointmentData.appointment_date} ${appointmentData.appointment_time}`,
        'YYYY-MM-DD HH:mm:ss',
      );

      const newAppointment = await this.appointmentModel.create({
        ...(appointmentData as any),
        appointment_datetime: mergedDateTime.toDate(),
      });

      const orderData = {
        appointment_id: newAppointment.id,
        amount: fees,
        paymentMethod: paymentMethod,
      };
      const newOrder = await this.orderModel.create(orderData as any);
      return {
        response: 'Success',
        statusCode: 201,
        message: 'Appointment Created Successfully',
        appointment: newAppointment,
        order: newOrder,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message || 'Internal Server Error', 500);
    }
  }
  async getAppointments(id: number) {
    const result = await this.appointmentModel.findOne({
      where: {
        id: id,
      },
      include: { all: true },
    });
    if (result) {
      return {
        response: 'Success',
        statusCode: 200,
        message: 'Successfully fetched appointment',
        result,
      };
    } else {
      throw new HttpException('No such appointment exist', 404);
    }
  }
}

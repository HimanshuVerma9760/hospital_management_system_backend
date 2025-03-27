import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from 'src/Models/appointment.model';
import { Order } from 'src/Models/order.model';

@Injectable()
export default class WebhookService {
  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    @InjectModel(Appointment) private readonly appointmentModel: typeof Appointment,
  ) {}

  async success(id: number) {
    const orderExist = await this.orderModel.findByPk(id);
    console.log('success called');

    if (orderExist) {
      try {
        const appointment = await this.appointmentModel.findByPk(
          orderExist.appointment_id,
        );
        if (!appointment) {
          throw new HttpException('Error occured', 500);
        }
        console.log('appointment: ', appointment);
        const result = appointment.set({ status: 'Scheduled' });
        await result.save();
        const resultOrder = await orderExist.update({
          paymentStatus: 'Paid',
        });
        if (result && resultOrder) {
          return {
            response: true,
            statusCode: 200,
            message: 'Successfully Paid',
            result,
            resultOrder,
          };
        }
      } catch (error) {
        throw new HttpException('error', 500);
      }
    }
  }
}

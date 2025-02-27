import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'src/Models/order.model';
import { Appointment } from 'src/Models/appointment.model';
import OrderDTO from './dto/orders.dto';

@Injectable()
export default class OrdersService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,

    @InjectModel(Appointment)
    private readonly appointmentModel: typeof Appointment,
  ) {}

  async getOrders(page: number, limit: number) {
    const offset = (page - 1) * limit;
    try {
      const result = await this.orderModel.findAndCountAll({
        offset: offset,
        limit: limit,
        include: { all: true },
      });
      return {
        response: 'Success',
        statusCode: 200,
        message: 'Successfully fetched Appointments',
        totalRecords: result.count,
        result: result.rows,
      };
    } catch (error) {
      throw new HttpException('Error while getting Appointment details', 500);
    }
  }

  async createOrder(orderData: OrderDTO) {
    try {
      const appointment = await this.appointmentModel.findByPk(
        orderData.appointment_id,
      );
      if (!appointment) {
        throw new HttpException('Appointment not found', 404);
      }

      const existingOrder = await this.orderModel.findOne({
        where: { appointment_id: orderData.appointment_id },
      });

      if (existingOrder) {
        if (existingOrder.paymentStatus === 'Paid') {
          throw new HttpException(
            'Payment already made for this appointment',
            406,
          );
        } else {
          return {
            response: 'Success',
            statusCode: 200,
            message:
              'Order already exists, Cash method was selected, Payment will be accepted on arrival',
            order: existingOrder,
          };
        }
      }

      const newOrder = await this.orderModel.create(orderData as any);

      return {
        response: 'Success',
        statusCode: 201,
        message: 'Order Created Successfully',
        order: newOrder,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}

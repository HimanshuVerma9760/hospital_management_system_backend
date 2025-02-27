import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'src/Models/order.model';

@Injectable()
export default class WebhookService {
  constructor(@InjectModel(Order) private readonly orderModel: typeof Order) {}

  async success(id: number) {
    const orderExist = await this.orderModel.findByPk(id);
    console.log('success called');

    if (orderExist) {
      try {
        const result = await orderExist.update({ paymentStatus: 'Paid' });
        if (result) {
          return {
            response: true,
            statusCode: 200,
            message: 'Successfully Paid',
            result,
          };
        }
      } catch (error) {
        throw new HttpException('error', 500);
      }
    }
  }
}

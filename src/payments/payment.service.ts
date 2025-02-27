import { HttpException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'src/Models/order.model';
const backend = process.env.BACKEND_URI;

@Injectable()
export default class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY') || 'default_secret_key',
      {
        apiVersion: '2025-01-27.acacia',
      },
    );
  }

  async success() {
    console.log("success");
  }
  async createCheckoutSession(order: any) {
    console.log(order.amount);
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Appointment',
            },
            unit_amount: order.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/payment/success`,
      cancel_url: `http://localhost:5173/api/payment/cancel`,
      metadata: {
        orderId: order.id,
      },
    });

    return { url: session.url };
  }
}

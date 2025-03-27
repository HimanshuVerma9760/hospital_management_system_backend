import { Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import OrdersService from 'src/orders/orders.service';
import Stripe from 'stripe';
import WebhookService from './webhook.service';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: '2025-01-27.acacia',
});

@Controller('payment')
export class WebHookController {
  constructor(
    @Inject(WebhookService) private readonly webhookService: WebhookService,
  ) {}
  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    console.log('webhook called');
    const sig = req.headers['stripe-signature'] || '';
    let event: any;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || '',
      ); 
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.metadata.orderId;
      console.log('webhook success called');
      await this.webhookService.success(orderId);
    } 

    res.status(200).send('Webhook received');
  }
}

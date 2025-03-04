import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import PaymentService from './payment.service';

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  async checkout(@Res() res: Response, @Body() order: any) {
    const session = await this.paymentService.createCheckoutSession(
      order.order,
    );
    return res.json(session);
  }

  @Get('success')
  cancel() {
    return this.paymentService.success();
  }
}

import {
  Body,
  Controller,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import OrdersService from './orders.service';
import OrderDTO from './dto/orders.dto';

@Controller('api/orders')
export default class OrdersController {
  constructor(
    @Inject(OrdersService) private readonly orderService: OrdersService,
  ) {}

  @Post('create')
  createOrder(@Body() orderData: OrderDTO) {
    return this.orderService.createOrder(orderData);
  }
  @Get('get-all')
  getOrders(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.orderService.getOrders(page, limit);
  }
}

import { Controller, Get, Logger, Query, Res } from '@nestjs/common';
import { getOrdersDTO } from './dto';
import { OrderService } from './order.service';
import { Response } from 'express';
@Controller('/')
export class OrderController {
  #logger = new Logger(OrderController.name);
  constructor(private readonly orderService: OrderService) {}

  @Get('getOrders')
  async getOrders(@Query() query: getOrdersDTO, @Res() res: Response) {
    try {
      const orders = await this.orderService.getOrders(query);
      return res.status(200).json(orders);
    } catch (error) {
      this.#logger.error(error.name, error.stack);
      return res
        .status(500)
        .json({ statusCode: 500, msg: 'Internal Server Error' });
    }
  }

  @Get('getMatchingOrders')
  async getMatchingOrders(@Query() query: getOrdersDTO, @Res() res: Response) {
    try {
      const orders = await this.orderService.getMatchingOrders(query);
      return res.status(200).json(orders);
    } catch (error) {
      this.#logger.error(error.name, error.stack);
      return res
        .status(500)
        .json({ statusCode: 500, msg: 'Internal Server Error' });
    }
  }
}

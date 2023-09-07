import { Injectable, Logger } from '@nestjs/common';
import { getOrdersDTO } from './dto/getOrders.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  #logger = new Logger();

  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  getOrders = async (opts: getOrdersDTO) => {
    return this.orderModel.find(opts).exec();
  };

  getMatchingOrders = async (opts: getOrdersDTO) => {
    return (
      (
        await this.orderModel.find({ ...opts, active: false }).select('orderId')
      ).map((el) => el.orderId) || []
    );
  };

  postOrderCreated = async (data: any, chainId: number) => {
    const { id, amountA, amountB, tokenA, tokenB, user, isMarket } =
      data.returnValues;

    const order = await this.orderModel.findOne({ orderId: id }).exec();

    if (order) {
      return;
    }

    await this.orderModel.create({
      orderId: String(id),
      amountA,
      amountB,
      tokenA,
      tokenB,
      user,
      isMarket,
      chainId,
    });

    return;
  };

  postOrderCancelled = async (data: any, chainId: number) => {
    await this.orderModel.findOneAndUpdate(
      {
        orderId: String(data.returnValues.id),
        chainId,
      },
      {
        active: true,
      },
    );
  };

  postOrderMatched = async (data: any, chainId: number) => {
    const { amountLeftToFill, id } = data.returnValues;
    const order = await this.orderModel
      .findOne({ orderId: id, chainId })
      .select('amountA active chainId');

    if (!order) {
      this.#logger.debug(`Not found order with id ${id}`);
      return;
    }

    if (order.active) {
      return;
    }

    if (amountLeftToFill === 0n) {
      await order.updateOne({
        active: true,
      });

      this.#logger.debug(`Order with id ${id} successful closed`);
    }
  };
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ _id: true, autoCreate: true, autoIndex: true, timestamps: true })
export class Order {
  @Prop({ required: true, type: 'number' })
  chainId: number;

  @Prop({ required: true, type: 'string', index: true })
  orderId: string;

  @Prop({
    required: true,
    type: 'string',
  })
  amountA: string;

  @Prop({
    required: true,
    type: 'string',
  })
  amountB: string;

  @Prop({ required: true, type: 'string' })
  tokenA: string;

  @Prop({ required: true, type: 'string' })
  tokenB: string;

  @Prop({ required: true, type: 'string' })
  user: string;

  @Prop({ required: true, type: 'boolean' })
  isMarket: boolean;

  @Prop({ required: true, type: 'boolean', default: false })
  active: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// Indexes
OrderSchema.index({ orderId: 1, chainId: 1, active: 1 });

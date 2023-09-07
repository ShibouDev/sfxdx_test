import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import ServerConfig from './configs/server';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: String(ServerConfig.mongoOpts.uri),
        dbName: ServerConfig.mongoOpts.dbName,
      }),
    }),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

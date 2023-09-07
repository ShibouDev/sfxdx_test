import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LOGGER_OPTS } from './configs/logger';
import ServerConfig from './configs/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LOGGER_OPTS.levels,
  });
  app.enableCors(ServerConfig.cors);
  app.useGlobalPipes(new ValidationPipe(ServerConfig.validationPipe));
  await app.listen(ServerConfig.PORT, ServerConfig.address);
}
bootstrap();

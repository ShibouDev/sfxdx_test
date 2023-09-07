import { LogLevel } from '@nestjs/common';

const LOGGER_DEV_OPTS = {
  levels: ['log', 'error', 'warn', 'debug'] as LogLevel[],
};

const LOGGER_PROD_OPTS = {
  levels: ['log', 'error', 'warn'] as LogLevel[],
};

export const LOGGER_OPTS =
  process.env.chef !== 'production' ? LOGGER_DEV_OPTS : LOGGER_PROD_OPTS;

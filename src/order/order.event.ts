import { Injectable, Logger } from '@nestjs/common';
import { OrderService } from './order.service';
import { createWSS } from 'src/utils/wss';
import {
  ABI_LIST,
  CHAIN_ID,
  CHAIN_WSS_LIST,
  EVENT_LISTENING,
} from '../configs/config';

// Types
import type Web3 from 'web3';

@Injectable()
export class OrderEvent {
  #logger = new Logger(OrderEvent.name);

  #wssInst: { [x: number]: Web3 } = {};

  constructor(private readonly orderService: OrderService) {
    this.startEventListener();
  }

  wss(chainId: number) {
    try {
      if (Object.values(CHAIN_ID).findIndex((el) => el === chainId) === -1) {
        throw new Error('Not found chain');
      }

      if (this.#wssInst[chainId]) {
        return this.#wssInst[chainId];
      }
      return createWSS(CHAIN_WSS_LIST[chainId]);
    } catch (error) {
      this.#logger.error(error.name, error.stack);
    }
  }

  async startEventListener() {
    for (const [chainId, contractList] of Object.entries(EVENT_LISTENING)) {
      const socket = this.wss(Number(chainId));
      for (const [id, contractss] of Object.entries(contractList)) {
        const contract = new socket.eth.Contract(
          ABI_LIST[id].abi(),
          ABI_LIST[id].address,
        );
        for (const idx in contractss.events) {
          const eventName = contractss.events[idx];
          const fn = this.orderService[`post${eventName}`];

          if (!fn) {
            this.#logger.error(
              `Not found post function for event ${eventName}`,
            );
            continue;
          }

          contract.events[contractss.events[idx]]({
            fromBlock: contractss.fromBlock,
          }).on('data', (data) => {
            fn(data, chainId);
          });
        }
      }
    }
  }
}

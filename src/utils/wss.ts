import { Socket } from 'net';
import Web3 from 'web3';

export const createWSS = (url: string, opt?: Socket) => {
  return new Web3(new Web3.providers.WebsocketProvider(url, opt));
};

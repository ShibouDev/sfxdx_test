import { ContractAbi } from 'web3';

export enum CHAIN_NAME {
  ETH_GOERLI = 'ETH_GOERLI',
}

export const CHAIN_ID = {
  ETH_GOERLI: 5,
};

export const CHAIN_LIST = {
  [CHAIN_ID.ETH_GOERLI]: CHAIN_ID.ETH_GOERLI,
};

export const CHAIN_SCAN_URL_LIST = {
  [CHAIN_ID.ETH_GOERLI]: 'https://goerli.etherscan.io/',
};

export const CHAIN_API_URL_LIST = {
  [CHAIN_ID.ETH_GOERLI]: 'https://api-goerli.etherscan.io/',
};

export const CHAIN_WSS_LIST = {
  [CHAIN_ID.ETH_GOERLI]: 'wss://goerli.gateway.tenderly.co',
};

export const ABI_LIST = {
  OrderController: {
    chainId: CHAIN_ID.ETH_GOERLI,
    name: 'OrderController',
    address: '0x352F8C1f8576183b6c783D3e589aBB69FfBeBc47',
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    abi: () => require('./abi/OrderControllerABI.json') as ContractAbi,
  },
};

export const EVENT_LISTENING = {
  [CHAIN_ID.ETH_GOERLI]: {
    [ABI_LIST.OrderController.name]: {
      fromBlock: 7722460,
      events: ['OrderCreated', 'OrderMatched', 'OrderCancelled'],
    },
  },
};

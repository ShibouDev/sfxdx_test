import axios, { type AxiosInstance } from 'axios';
import { writeFileSync } from 'fs';
import { ABI_LIST, CHAIN_API_URL_LIST } from '../src/configs/config';

export const ABIDownload = async () => {
  console.debug('[ABIDownload] Start');

  const axiosInst: { [x: string]: AxiosInstance } = {};
  const ABI_PATH = __dirname + '/../src/configs/abi/';

  const initAxios = () => {
    console.debug('[ABIDownload] Init axios instances');

    for (const [id, address] of Object.entries(CHAIN_API_URL_LIST)) {
      axiosInst[id] = axios.create({
        baseURL: `${address}/api`,
        params: {
          module: 'contract',
          action: 'getabi',
        },
      });
      console.debug(`[ABIDownload] Successful init axios inst for ${id}`);
    }

    console.debug('[ABIDownload] Finish init axios instances');
  };

  const getAbi = async () => {
    console.debug('[ABIDownload] Start download ABI');

    for (const [id, con] of Object.entries(ABI_LIST)) {
      for (const [chain, ax] of Object.entries(axiosInst)) {
        try {
          console.debug(
            `[ABIDownload] Download ABI for address ${con.address} and chain ${chain}.`,
          );

          const { data } = await ax.request({
            params: {
              address: con.address,
            },
          });

          if (data.status !== '1') {
            console.error(
              `[ABIDownload] Error download ABI for address ${con.address} and chain ${chain}.`,
              `Error - ${data.result}`,
            );
            continue;
          }

          writeFileSync(`${ABI_PATH}/${id}ABI.json`, data.result);
          console.debug(`[ABIDownload] Successful download ABI `);
        } catch (error) {
          console.error('[ABIDownload] Error - ', error);
        }
      }
    }
    console.debug('[ABIDownload] Finish download ABI');
  };

  initAxios();
  await getAbi();
};

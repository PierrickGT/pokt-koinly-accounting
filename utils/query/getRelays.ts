import { AxiosInstance } from 'axios';

import { getFirstBlock, getLastBlock } from './getBlocks';
import { Block, NodeRelay } from '../types';

type getRelaysResponse = {
  data: {
    data: {
      getNodeRelays: {
        items: NodeRelay[];
      };
    };
  };
};

export default async function getRelays(
  poktScan: AxiosInstance,
  nodeAddress: string,
  startDate: Date,
  endDate: Date
): Promise<void | NodeRelay[]> {
  const firstBlock = (await getFirstBlock(poktScan, startDate, endDate)) as Block;
  const lastBlock = (await getLastBlock(poktScan, startDate, endDate)) as Block;

  const query = `
    query {
      getNodeRelays(
        input: {
          page: 1,
          pageSize: 1000,
          addresses: ["${nodeAddress}"],
          sortBy: height,
          sortDirection: asc,
          fromHeight: ${firstBlock.height},
          toHeight: ${lastBlock.height},
        }
      ) {
        items {
          address
          amount
          chain
          block_time
          height
          serviced {
            tx_proof
          }
        }
      }
    }
  `;

  return poktScan
    .post('', { query })
    .then((response: getRelaysResponse) => {
      return response.data.data.getNodeRelays.items;
    })
    .catch((error: Error) => {
      console.error('Failed to retrieve NodeRelay: ', error);
    });
}

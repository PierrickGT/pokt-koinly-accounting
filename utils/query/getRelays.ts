import { AxiosInstance } from 'axios';

import { getFirstBlock, getLastBlock } from './getBlocks';
import { Block, NodeRelay } from '../types';

type getRelaysResponse = {
  data: {
    data: {
      ListPoktRelays: {
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
      ListPoktRelays(
        pagination: {
          limit: 1000,
          filter: {
            operator: AND,
            properties: [
              {
                  property: "node",
                  operator: EQ,
                  type: STRING,
                  value: "${nodeAddress}"
              }
            ],
            filters: [{
              operator: AND,
              properties: [
                {
                  property: "height",
                  operator: GTE,
                  type: STRING,
                  value: "${firstBlock.height}"
                },
                {
                  property: "height",
                  operator: LTE,
                  type: STRING,
                  value: "${lastBlock.height}"
                }
              ]
            }]
          },
          sort: [{property: "height", direction: 1}]
        }
      ) {
        items {
          node
          amount
          earning_multiplier
          stake_weight
          base_multiplier
          chain
          block_time
          height
          tx_proof
        }
      }
    }
  `;

  return poktScan
    .post('', { query })
    .then((response: getRelaysResponse) => {
      return response.data.data.ListPoktRelays.items;
    })
    .catch((error: Error) => {
      console.error('Failed to retrieve NodeRelay: ', error);
    });
}

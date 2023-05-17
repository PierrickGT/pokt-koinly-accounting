import { AxiosInstance } from 'axios';

import { getFirstBlock, getLastBlock } from './getBlocks';
import { Block, PageInfo, Transaction } from '../types';

type getTransactionsResponse = {
  data: {
    data: {
      ListPoktTransaction: {
        items: Transaction[];
        pageInfo: PageInfo;
      };
    };
  };
};

export default async function getTransactions(
  poktScan: AxiosInstance,
  nodeAddress: string,
  toAddress: string,
  startDate: Date,
  endDate: Date
): Promise<void | Transaction[]> {
  const firstBlock = (await getFirstBlock(poktScan, startDate, endDate)) as Block;
  const lastBlock = (await getLastBlock(poktScan, startDate, endDate)) as Block;

  const query = `
    query {
      ListPoktTransaction(
        pagination: {
          limit: 1000,
          filter: {
            operator: AND,
            properties: [
              {
                  property: "from_address",
                  operator: EQ,
                  type: STRING,
                  value: "${nodeAddress}"
              },
              {
                  property: "to_address",
                  operator: EQ,
                  type: STRING,
                  value: "${toAddress}"
              }
            ],
            filters: [{
              operator: AND,
              properties: [
                {
                    property: "block_time",
                    operator: GTE,
                    type: STRING,
                    value: "${firstBlock.time}"
                },
                {
                    property: "block_time",
                    operator: LTE,
                    type: STRING,
                    value: "${lastBlock.time}"
                }
              ],
            }]
          },
          sort: [{property: "height",direction: 1}]
        }
      ) {
        items {
          _id
          hash
          height
          amount
          block_time
          from_address
          index
          memo
          parse_time
          result_code
          to_address
          total_fee
          total_proof
          total_pokt
          type
          chain
          app_public_key
          claim_tx_hash
          expiration_height
          session_height
          pending
        }
      }
    }
  `;

  return poktScan
    .post('', { query })
    .then((response: getTransactionsResponse) => {
      return response.data.data.ListPoktTransaction.items;
    })
    .catch((error: Error) => {
      console.error('Failed to retrieve Transactions: ', error);
    });
}

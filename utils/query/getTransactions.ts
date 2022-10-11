import { AxiosInstance } from 'axios';

import { getFirstBlock, getLastBlock } from './getBlocks';
import { Block, PageInfo, Transaction } from '../types';

type getTransactionsResponse = {
  data: {
    data: {
      transactions: {
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
      transactions(
        page: 1,
        limit: 1000,
        search: "",
        sort: [{property: "height",direction: 1}]
        filter: "[[[\\"from_address\\",\\"=\\",\\"${nodeAddress}\\"],\\"and\\",[\\"to_address\\",\\"=\\",\\"${toAddress}\\"]],\\"and\\",[[\\"block_time\\",\\">=\\",\\"${firstBlock.time}\\"],\\"and\\",[\\"block_time\\",\\"<=\\",\\"${lastBlock.time}\\"]]]"
      ) {
        pageInfo {
          total
          limit
          page
        }
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
      return response.data.data.transactions.items;
    })
    .catch((error: Error) => {
      console.error('Failed to retrieve Transactions: ', error);
    });
}

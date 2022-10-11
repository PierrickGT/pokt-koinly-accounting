import { AxiosInstance } from 'axios';

import getTransactions from '../query/getTransactions';

import { toDecimal } from '../helpers';
import { Transaction, KoinlyTransaction } from '../types';

export default async function getNodeTransactions(
  poktScan: AxiosInstance,
  nodeAddress: string,
  toAddress: string,
  startDate: Date,
  endDate: Date
) {
  const nodeTransactions = (await getTransactions(
    poktScan,
    nodeAddress,
    toAddress,
    startDate,
    endDate
  )) as Transaction[];

  const transactions: KoinlyTransaction[] = [];

  nodeTransactions.map(async (transaction: Transaction) => {
    const date = new Date(transaction.block_time);

    transactions.push({
      'Koinly Date': date,
      Amount: -toDecimal(transaction.amount),
      Currency: 'POKT',
      Label: 'transfer',
      Description: `Transfer to ${toAddress}`,
      TxHash: transaction.hash,
    });
  });

  return transactions;
}

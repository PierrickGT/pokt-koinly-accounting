import { AxiosInstance } from 'axios';

import getBlockProducer from '../query/getBlockProducer';

import { toDecimal } from '../helpers';
import { Block, KoinlyTransaction } from '../types';

export default async function getNodeBlocksProduced(
  poktScan: AxiosInstance,
  nodeAddress: string,
  startDate: Date,
  endDate: Date
) {
  const nodeBlocksProduced = (await getBlockProducer(
    poktScan,
    nodeAddress,
    startDate,
    endDate
  )) as Block[];

  const rewards: KoinlyTransaction[] = [];

  nodeBlocksProduced.map((block: Block) => {
    const date = new Date(block.time);

    rewards.push({
      'Koinly Date': date,
      Amount: toDecimal(block.producer_rewards),
      Currency: 'POKT',
      Label: 'mining',
      Description: `Producer of block ${block.height} for POKT chain`,
      TxHash: '',
    });
  });

  return rewards;
}

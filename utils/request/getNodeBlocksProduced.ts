import { AxiosInstance } from 'axios';

import getBlockProducer from '../query/getBlockProducer';

import { getBlockProducerReward } from '../helpers';
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
      Amount: getBlockProducerReward(block.total_minted, block.fee_multiplier),
      Currency: 'POKT',
      Label: 'mining',
      Description: `Producer of block ${block.height} for POKT chain`,
      TxHash: '',
    });
  });

  return rewards;
}

import { AxiosInstance } from 'axios';

import getRelays from '../query/getRelays';

import { formatChain, relayFee } from '../helpers';
import { NodeRelay, KoinlyReward } from '../types';

export default async function getNodeRelays(
  poktScan: AxiosInstance,
  nodeAddress: string,
  startDate: Date,
  endDate: Date
) {
  const nodeRelays = (await getRelays(poktScan, nodeAddress, startDate, endDate)) as NodeRelay[];

  const rewards: KoinlyReward[] = [];

  nodeRelays.map(async (relay: NodeRelay) => {
    const date = new Date(Number(relay.block_time));

    rewards.push({
      'Koinly Date': date,
      Amount: relay.amount - relayFee,
      Currency: 'POKT',
      Label: 'mining',
      Description: `Relays for ${formatChain(relay.chain)} chain`,
      TxHash: relay.serviced[0].tx_proof,
    });
  });

  return rewards;
}

import { AxiosInstance } from 'axios';

import getRelays from '../query/getRelays';

import { formatChain, relayFee, toDecimal } from '../helpers';
import { NodeRelay, KoinlyTransaction } from '../types';

export default async function getNodeRelays(
  poktScan: AxiosInstance,
  nodeAddress: string,
  startDate: Date,
  endDate: Date
) {
  const nodeRelays = (await getRelays(poktScan, nodeAddress, startDate, endDate)) as NodeRelay[];

  const rewards: KoinlyTransaction[] = [];

  nodeRelays.map(async (relay: NodeRelay) => {
    const date = new Date(relay.block_time);

    rewards.push({
      'Koinly Date': date,
      Amount: toDecimal(relay.amount * relay.earning_multiplier) - relayFee,
      Currency: 'POKT',
      Label: 'mining',
      Description: `Relays for ${formatChain(relay.chain)} chain`,
      TxHash: relay.tx_proof,
    });
  });

  return rewards;
}

import axios from 'axios';
import compareAsc from 'date-fns/compareAsc';
import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';

import getNodeRelays from '../utils/request/getNodeRelays';
import getNodeBlocksProduced from '../utils/request/getNodeBlocksProduced';

import { POKTSCAN_API_ENDPOINT } from '../utils/Constants';

const getRewards = async () => {
  const poktScan = axios.create({
    baseURL: POKTSCAN_API_ENDPOINT,
    timeout: 5000,
    headers: {
      Authorization: `${process.env.POKTSCAN_API_KEY}`,
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });

  const nodeAddress = process.env.NODE_ADDRESS as string;
  const startDate = new Date('2022-07-01');
  const endDate = new Date('2022-07-31');

  const nodeRelaysRewards = await getNodeRelays(poktScan, nodeAddress, startDate, endDate);
  const blockProducerRewards = await getNodeBlocksProduced(
    poktScan,
    nodeAddress,
    startDate,
    endDate
  );

  const rewards = [...nodeRelaysRewards, ...blockProducerRewards];
  const rewardsSorted = rewards.sort((nodeRelaysRewards, blockProducerRewards) =>
    compareAsc(nodeRelaysRewards['Koinly Date'], blockProducerRewards['Koinly Date'])
  );

  const csv = parse(rewardsSorted, {
    fields: ['Koinly Date', 'Amount', 'Currency', 'Label', 'Description', 'TxHash'],
  });

  fs.writeFile(
    path.join(__dirname, '../results', `${nodeAddress}_07-2022.csv`),
    csv,
    function (error) {
      if (error) {
        return console.log('Failed to write results: ', error);
      }
    }
  );
};

getRewards();

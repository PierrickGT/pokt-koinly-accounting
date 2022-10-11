import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';

import getNodeTransactions from '../utils/request/getNodeTransactions';

import { POKTSCAN_API_ENDPOINT } from '../utils/Constants';

const getTransfers = async () => {
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
  const toAddress = process.env.TO_ADDRESS as string;
  const startDate = new Date('2022-04-01');
  const endDate = new Date('2022-04-30');

  const nodeTransactions = await getNodeTransactions(
    poktScan,
    nodeAddress,
    toAddress,
    startDate,
    endDate
  );

  const csv = parse(nodeTransactions, {
    fields: ['Koinly Date', 'Amount', 'Currency', 'Label', 'Description', 'TxHash'],
  });

  fs.writeFile(
    path.join(__dirname, '../results', `${nodeAddress}_04-2022.csv`),
    csv,
    function (error) {
      if (error) {
        return console.log('Failed to write results: ', error);
      }
    }
  );
};

getTransfers();

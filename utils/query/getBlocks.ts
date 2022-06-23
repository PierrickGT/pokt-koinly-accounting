import { AxiosInstance } from 'axios';

import { NodeRelay } from '../types';

type getBlockProducerResponse = {
  data: {
    data: {
      blocks: {
        items: NodeRelay[];
      };
    };
  };
};

export async function getFirstBlock(
  poktScan: AxiosInstance,
  startDate: Date,
  endDate: Date
): Promise<any> {
  endDate.setUTCHours(23, 59, 59, 999);

  const query = `
    query {
      blocks(
        page: 1,
        limit: 1,
        search: "",
        filter: "[[\\"time\\",\\">=\\",\\"${startDate.toISOString()}\\"],\\"and\\",[\\"time\\",\\"<=\\",\\"${endDate.toISOString()}\\"]]",
        sort: [{property: "height", direction: 1}]
      ) {
        items {
          height
          time
        }
      }
    }
  `;

  return poktScan
    .post('', { query })
    .then((response: getBlockProducerResponse) => {
      return response.data.data.blocks.items[0];
    })
    .catch((error: Error) => {
      console.error('Failed to retrieve first block: ', error);
    });
}

export async function getLastBlock(
  poktScan: AxiosInstance,
  startDate: Date,
  endDate: Date
): Promise<any> {
  endDate.setUTCHours(23, 59, 59, 999);

  const query = `
    query {
      blocks(
        page: 1,
        limit: 1,
        search: "",
        filter: "[[\\"time\\",\\">=\\",\\"${startDate.toISOString()}\\"],\\"and\\",[\\"time\\",\\"<=\\",\\"${endDate.toISOString()}\\"]]",
        sort: [{property: "height", direction: -1}]
      ) {
        items {
          height
          time
        }
      }
    }
  `;

  return poktScan
    .post('', { query })
    .then((response: getBlockProducerResponse) => {
      return response.data.data.blocks.items[0];
    })
    .catch((error: Error) => {
      console.error('Failed to retrieve last block: ', error);
    });
}

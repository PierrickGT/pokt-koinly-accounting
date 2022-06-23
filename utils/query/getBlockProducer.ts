import { AxiosInstance } from 'axios';

import { Block } from '../types';

type getBlockProducerResponse = {
  data: {
    data: {
      blocks: {
        items: Block[];
      };
    };
  };
};

export default async function getBlockProducer(
  poktScan: AxiosInstance,
  nodeAddress: string,
  startDate: Date,
  endDate: Date
): Promise<void | Block[]> {
  endDate.setUTCHours(23, 59, 59, 999);

  const query = `
    query {
      blocks(
        page: 1,
        limit: 30,
        search: "",
        filter: "[[\\"producer\\",\\"=\\",\\"${nodeAddress}\\"],\\"and\\",[\\"time\\",\\">=\\",\\"${startDate.toISOString()}\\"],\\"and\\",[\\"time\\",\\"<=\\",\\"${endDate.toISOString()}\\"]]",
        sort: [{property: "height", direction: -1}]
      ) {
        items {
          _id
          fee_multiplier
          height
          producer
          total_minted
          time
        }
      }
    }
  `;

  return poktScan
    .post('', { query })
    .then((response: getBlockProducerResponse) => {
      return response.data.data.blocks.items;
    })
    .catch((error: Error) => {
      console.error('Failed to retrieve BlockProducerRewards: ', error);
    });
}

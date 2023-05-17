import { AxiosInstance } from 'axios';

import { Block } from '../types';

type getBlockProducerResponse = {
  data: {
    data: {
      ListPoktBlock: {
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
      ListPoktBlock(
        pagination: {
          limit: 30,
          filter: {
            operator: AND,
            properties: [
              {
                  property: "producer",
                  operator: EQ,
                  type: STRING,
                  value: "${nodeAddress}"
              }
            ],
            filters: [{
              operator: AND,
              properties: [
                {
                  property: "time",
                  operator: GTE,
                  type: STRING,
                  value: "${startDate.toISOString()}"
                },
                {
                  property: "time",
                  operator: LTE,
                  type: STRING,
                  value: "${endDate.toISOString()}"
                }
              ],
            }]
          },
          sort: [{property: "height", direction: -1}]
        },
      ) {
        items {
          _id
          producer_rewards
          height
          producer
          time
        }
      }
    }
  `;

  return poktScan
    .post('', { query })
    .then((response: getBlockProducerResponse) => {
      return response.data.data.ListPoktBlock.items;
    })
    .catch((error: Error) => {
      console.error('Failed to retrieve BlockProducerRewards: ', error);
    });
}

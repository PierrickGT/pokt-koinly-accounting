import { gql, GraphQLClient } from 'graphql-request';

export default async function getUsersBalance(
  subgraphURL: string,
  ticket: string,
  drawStartTime: number,
  drawEndTime: number
): Promise<any> {
  const client = new GraphQLClient(subgraphURL, { headers: {} });

  const maxPageSize = 1000;
  const results = [];

  let lastId = '';

  while (true) {
    const queryString = `{
            ticket(id: "${ticket}") {
                accounts(first: ${maxPageSize} , where: {

                    id_gt: "${lastId}"
                    }) {
                    id
                    delegateBalance


                    # get twab beforeOrAt drawStartTime
                    beforeOrAtDrawStartTime: twabs(
                        orderBy: timestamp
                        orderDirection: desc
                        first: 1
                        where: { timestamp_lte: ${drawStartTime} } #drawStartTime
                    ) {
                        amount
                        timestamp
                        delegateBalance
                    }
                    # now get twab beforeOrAt drawEndTime (may be the same as above)
                    beforeOrAtDrawEndTime: twabs(
                        orderBy: timestamp
                        orderDirection: desc
                        first: 1
                        where: { timestamp_lte: ${drawEndTime} } #drawEndTime
                    ) {
                        amount
                        timestamp
                        delegateBalance
                    }
                }
            }
        }`;

    const query = gql`
      ${queryString}
    `;

    const data = await client.request(query);
    results.push(data.ticket.accounts);

    const numberOfResults = data.ticket.accounts.length;
    if (numberOfResults < maxPageSize) {
      // we have gotten all the results
      break;
    }

    lastId = data.ticket.accounts[data.ticket.accounts.length - 1].id;
  }

  return results.flat(1);
}

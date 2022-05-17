import getSubgraphUrlForNetwork from '../network/getSubgraphUrlForNetwork';
import getUsersBalance from '../query/getUsersBalance';

export default async function getUserAccountsFromSubgraphForTicket(
  chainId: string,
  ticket: string,
  drawStartTime: number,
  drawEndTime: number
): Promise<any[]> {
  const subgraphURL = getSubgraphUrlForNetwork(chainId);
  const _ticket = ticket.toLowerCase();
  const usersBalance = await getUsersBalance(subgraphURL, _ticket, drawStartTime, drawEndTime);

  return usersBalance.flat(1);
}

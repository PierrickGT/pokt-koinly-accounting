import { POLYGON_USDC_TICKET_ADDRESS } from './utils/Constants';
import getUserAccountsFromSubgraphForTicket from './utils/request/getUserAccountsFromSubgraphForTicket';

const request = async () => {
  const result = await getUserAccountsFromSubgraphForTicket(
    '137',
    POLYGON_USDC_TICKET_ADDRESS,
    1647898860,
    1648417260
  );

  console.log(result);
};

request();

/* POKT types */

export type Block = {
  _id: string;
  height: number;
  time: string;
  producer: string;
  token_multiplier: number;
  fee_multiplier: string;
  block_per_session: number;
  supported_block_chains: [string];
  total_txs: number;
  total_nodes: number;
  total_apps: number;
  total_accounts: number;
  nodes_jailed_staked: number;
  nodes_jailed_staked_tokens: bigint;
  nodes_jailed_unstaking: number;
  nodes_jailed_unstaking_tokens: bigint;
  nodes_jailed_unstaked: number;
  nodes_jailed_unstaked_tokens: number;
  nodes_unjailed_staked: number;
  nodes_unjailed_staked_tokens: bigint;
  nodes_unjailed_unstaking: number;
  nodes_unjailed_unstaking_tokens: bigint;
  nodes_unjailed_unstaked: number;
  nodes_unjailed_unstaked_tokens: bigint;
  apps_staked: number;
  apps_staked_tokens: bigint;
  apps_unstaking: number;
  apps_unstaking_tokens: bigint;
  apps_unstaked: number;
  apps_unstaked_tokens: bigint;
  supply: BlockSupply;
  nodes_stake_by_chain: [StakeByChain];
  apps_stake_by_chain: [StakeByChain];
  parse_time: string;
  took: number;
  verified: Boolean;
  total_relays_completed: number;
  total_challenges_completed: number;
  total_minted: bigint;
  total_good_txs: bigint;
  total_bad_txs: bigint;
  proof_msgs: number;
  bad_txs_count_by_error: string;
};

type BlockSupply = {
  node_staked: bigint;
  app_staked: bigint;
  dao: number;
  total_staked: number;
  total_unstaked: number;
  total: number;
};

type StakeByChain = {
  chain: string;
  amount: bigint;
};

type ServicedNodeRelays = {
  tx_proof: string;
  tx_claim: string;
  address: string;
  total_relays: bigint;
  relay_chain: string;
};

export type NodeRelay = {
  address: string;
  chain: string;
  height: number;
  amount: number;
  block_time: string;
  token_multiplier: number;
  total_relays: bigint;
  serviced: [ServicedNodeRelays];
};

/* App types */

export type KoinlyReward = {
  'Koinly Date': Date;
  Amount: number;
  Currency: string;
  Label: string;
  Description: string;
  TxHash: string;
};

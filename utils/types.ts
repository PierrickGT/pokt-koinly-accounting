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
  block_size: number;
  state_size: number;
  total_size: number;
  monetary: {
    m0: number;
    ms: number;
    mu: number;
    mb: number;
  };
  node_rewards: number;
  producer_rewards: number;
  dao_rewards: number;
  stake_weight_summary: [
    {
      weight: number;
      staked_nodes: bigint;
      unstaking_nodes: bigint;
      jailed: bigint;
      tokens: bigint;
    }
  ];
  node_earning_multiplier: number;
  dao_earning_multiplier: number;
  proposer_earning_multiplier: number;
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

export type NodeRelay = {
  address: string;
  chain: string;
  height: number;
  amount: number;
  block_time: string;
  base_multiplier: number;
  earning_multiplier: number;
  stake_weight: number;
  total_relays: bigint;
  tx_proof: string;
};

export type PageInfo = {
  total: number;
  limit: number;
  page: number;
};

export type Transaction = {
  _id: string;
  hash: string;
  height: number;
  amount: number;
  block_time: string;
  from_address: string;
  index: number;
  memo: string;
  parse_time: string;
  result_code: number;
  to_address: string;
  total_fee: number;
  total_proof: string;
  total_pokt: number;
  type: string;
  chain: string;
  app_public_key: string;
  claim_tx_hash: string;
  expiration_height: number;
  session_height: number;
  pending: boolean;
};

/* App types */
export type KoinlyTransaction = {
  'Koinly Date': Date;
  Amount: number;
  Currency: string;
  Label: string;
  Description: string;
  TxHash: string;
};

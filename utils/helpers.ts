// 0.01 POKT for claim transaction + 0.01 POKT for proof transaction
export const relayFee = 0.02;

export const formatChain = (chainId: string) => {
  switch (chainId) {
    case '03CB':
      return 'Swimmer Mainnet (03CB)';
    case '03DF':
      return 'DFKchain Subnet (03DF)';
    case '0001':
      return 'POKT Mainnet (0001)';
    case '0005':
      return 'FUSE Mainnet (0005)';
    case '0009':
      return 'Polygon Mainnet (0009)';
    case '0021':
      return 'Ethereum (0021)';
    case '0027':
      return 'Gnosis - xDai (0027)';
    case '0040':
      return 'Harmony Shard 0 (0040)';
    case '0053':
      return 'Optimism Mainnet (0053)';
    default:
      return 'Unknown chain';
  }
};

export const toDecimal = (number: bigint | number | string) => Number(number) * 0.000001;

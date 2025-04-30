declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    RPC_URL: string;
    BIG_CONTRACT_ADDRESS: string;
    BIGCOIN_CONTRACT_ADDRESS: string;
    WALLET_PKS: string;
    TREASURY_ADDRESS: string;
    TEAM_ADDRESS: string;
    HOLDERS_ADDRESS: string;
    AIRDROP_CONTRACT_ADDRESS: string;
  }
}

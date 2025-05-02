# BIGPOOL Automation

This script automates claiming BIG and splitting the rewards into the treasury, fee, and reinvestment wallets in a 45%/5%/50% split.

It's assumed that each wallet is an AGW so Privy private keys are needed. Using the signer accounts, we can interact with the respective AGW smart contract wallets.

## Environment Variables

- **RPC_URL**: Abstract RPC node
- **BIG_CONTRACT_ADDRESS**: Address for the erc20 $BIG
- **BIGCOIN_CONTRACT_ADDRESS**: Address of the BIGCOIN contract
- **BIGPOOL_CONTRACT_ADDRESS**: Address of the Big Pool NFT
- **TREASURY_ADDRESS**: Address of the treasury wallet
- **FEE_ADDRESS**: Address of the fee wallet
- **REINVEST_ADDRESS**: Address of the reinvestment wallet
- **AIRDROP_CONTRACT_ADDRESS**: gaslitedrop contract address
- **WALLET_PKS**: Comma delimited privy private keys for the wallets to be automated

## Building

Build the scripts by running

`pnpm build`

## Usage

### Automatic claim and split

This script claims BIG rewards from each wallet's BIGCOING mine and then splits just the claimed amount between the treasury, reinvest, and fee wallets.

`pnpm start`

### Snapshot holders

Generates a holder snapshot and stores it in the `/snapshots` folder.

`pnpm snapshot`

### Get airdrop CSV

Generates a CSV that can be used in gaslitedrop to send holder distributions according to a provided snapshot file.

`pnpm airdropCSV`

# BIGPOOL Automation

This script automates claiming BIG and splitting the rewards into the treasury, fee, and reinvestment wallets in a 45%/5%/50% split.

It's assumed that each wallet is an AGW so Privy private keys are needed. Using the signer accounts, we can interact with the respective AGW smart contract wallets.

## Environment Variables

- **RPC_URL**: Abstract RPC node
- **BIG_CONTRACT_ADDRESS**: Address for the erc20 $BIG
- **BIGCOIN_CONTRACT_ADDRESS**: Address of the BIGCOIN contract
- **TREASURY_ADDRESS**: Address of the treasury wallet
- **FEE_ADDRESS**: Address of the fee wallet
- **REINVEST_ADDRESS**: Address of the reinvestment wallet
- **AIRDROP_CONTRACT_ADDRESS**: gaslitedrop contract address
- **WALLET_PKS**: Comma delimited privy private keys for the wallets to be automated

## Running

Build the script (stored in `/dist`)

`pnpm build`

Run the built script use=ing

`pnpm start`

Run the typescript directly using ts-node with:

`pnpm dev`

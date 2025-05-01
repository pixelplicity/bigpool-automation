import {
  http,
  Transport,
  PublicClient,
  publicActions,
  createClient,
  erc20Abi,
  formatUnits,
  parseAbi,
  encodeFunctionData
} from 'viem';
import {
  AbstractClient,
  createAbstractClient
} from '@abstract-foundation/agw-client';
import { privateKeyToAccount } from 'viem/accounts';
import { abstract, ChainEIP712 } from 'viem/chains';
import dotenv from 'dotenv';
import { BigCoinAbi } from './abis/BigCoinAbi';
import { Erc20approveAbi } from './abis/Erc20ApproveAbi';
import { AirdropAbi } from './abis/AirdropAbi';

dotenv.config();

// Config
const RPC_URL = process.env.RPC_URL;
const BIGCOIN_CONTRACT_ADDRESS = process.env
  .BIGCOIN_CONTRACT_ADDRESS as `0x${string}`;
const BIG_CONTRACT_ADDRESS = process.env.BIG_CONTRACT_ADDRESS as `0x${string}`;
const AIRDROP_CONTRACT_ADDRESS = process.env
  .AIRDROP_CONTRACT_ADDRESS as `0x${string}`;
const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS as `0x${string}`;
const FEE_ADDRESS = process.env.FEE_ADDRESS as `0x${string}`;
const REINVEST_ADDRESS = process.env.REINVEST_ADDRESS as `0x${string}`;
const WALLET_PKS = process.env.WALLET_PKS?.split(',') as `0x${string}`[];

// Client Setup
const baseClient = createClient({
  transport: http(RPC_URL),
  chain: abstract as ChainEIP712
});
const publicClient: PublicClient<Transport, ChainEIP712> = baseClient.extend(
  publicActions
) as any;

/**
 * Airdrop using gaslitedrop
 * Batches the approval and airdrop into a single transaction
 */
const airdrop = async (
  abstractClient: AbstractClient,
  recipientAddresses: `0x${string}`[],
  recipientAmounts: bigint[]
) => {
  const totalAmount = recipientAmounts.reduce((acc, amt) => acc + amt, 0n);

  const hash = await abstractClient.sendTransactionBatch({
    calls: [
      {
        to: BIG_CONTRACT_ADDRESS,
        args: [AIRDROP_CONTRACT_ADDRESS, totalAmount],
        data: encodeFunctionData({
          abi: Erc20approveAbi,
          functionName: 'approve',
          args: [AIRDROP_CONTRACT_ADDRESS, totalAmount]
        })
      },
      {
        to: AIRDROP_CONTRACT_ADDRESS,
        data: encodeFunctionData({
          abi: AirdropAbi,
          functionName: 'airdropERC20',
          args: [
            BIG_CONTRACT_ADDRESS,
            recipientAddresses,
            recipientAmounts,
            totalAmount
          ]
        })
      }
    ]
  });

  await publicClient.waitForTransactionReceipt({
    hash: hash
  });

  return hash;
};

/**
 * Get the balance of BIG
 */
const getBigBalance = async (address: `0x${string}`) => {
  const balance = await publicClient.readContract({
    address: BIG_CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address]
  });
  return balance;
};

/**
 * Claim rewards from the BigCoin contract
 */
const claimRewards = async (abstractClient: AbstractClient) => {
  const hash = await abstractClient.writeContract({
    address: BIGCOIN_CONTRACT_ADDRESS,
    abi: BigCoinAbi,
    functionName: 'claimRewards'
  });

  await publicClient.waitForTransactionReceipt({
    hash: hash
  });

  return hash;
};

async function main() {
  try {
    for (const pk of WALLET_PKS) {
      const signer = privateKeyToAccount(pk);
      const abstractClient = await createAbstractClient({
        signer,
        chain: abstract,
        transport: http(RPC_URL)
      });

      console.log(
        `[${abstractClient.account.address}]: Starting claim and split`
      );
      await claimRewards(abstractClient);
      const balance = await getBigBalance(abstractClient.account.address);

      const toTreasury = (balance * 45n) / 100n;
      const toFee = (balance * 5n) / 100n;
      const toReinvest = balance - toTreasury - toFee;

      console.log(
        `[${abstractClient.account.address}]: Splitting ${formatUnits(
          balance,
          18
        )} BIG: treasury=${formatUnits(toTreasury, 18)}, fee=${formatUnits(
          toFee,
          18
        )}, reinvest=${formatUnits(toReinvest, 18)}`
      );

      const recipientAddresses = [
        TREASURY_ADDRESS,
        FEE_ADDRESS,
        REINVEST_ADDRESS
      ];
      const recipientAmounts = [toTreasury, toFee, toReinvest];

      const airdropHash = await airdrop(
        abstractClient,
        recipientAddresses,
        recipientAmounts
      );
      console.log(
        `[${abstractClient.account.address}]: Completed with hash: ${airdropHash}`
      );
    }
    process.exit(0);
  } catch (err) {
    console.error('Error in main execution:', err);
  }
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});

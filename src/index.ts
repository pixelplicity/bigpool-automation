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
const DELAY_BETWEEN_WALLETS = parseInt(
  process.env.DELAY_BETWEEN_WALLETS || '5000'
);

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

  try {
    const hash = await abstractClient.sendTransactionBatch({
      calls: [
        {
          to: BIG_CONTRACT_ADDRESS,
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
      hash: hash,
      timeout: 60_000 // 60 second timeout
    });

    return hash;
  } catch (error: any) {
    // Log more details about the error for debugging
    console.error('Airdrop error details:', {
      message: error?.message,
      details: error?.details,
      cause: error?.cause?.message,
      shortMessage: error?.shortMessage
    });
    throw error;
  }
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

const getPendingBalance = async (address: `0x${string}`) => {
  const balance = await publicClient.readContract({
    address: BIGCOIN_CONTRACT_ADDRESS,
    abi: BigCoinAbi,
    functionName: 'pendingRewards',
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

/**
 * Delay helper with exponential backoff
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retry helper with exponential backoff
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Check if it's a rate limit error (429)
      const is429Error =
        error?.message?.includes('429') ||
        error?.cause?.message?.includes('429') ||
        error?.details?.includes('429');

      if (is429Error && i < maxRetries - 1) {
        const delayTime = initialDelay * Math.pow(2, i);
        console.log(
          `Rate limited (429). Retrying in ${delayTime}ms... (attempt ${
            i + 1
          }/${maxRetries})`
        );
        await delay(delayTime);
      } else {
        throw error;
      }
    }
  }

  throw lastError;
}

async function main() {
  try {
    for (let index = 0; index < WALLET_PKS.length; index++) {
      const pk = WALLET_PKS[index];
      const signer = privateKeyToAccount(pk);
      const abstractClient = await createAbstractClient({
        signer,
        chain: abstract,
        transport: http(RPC_URL)
      });

      console.log(
        `[${abstractClient.account.address}]: Starting claim and split (${
          index + 1
        }/${WALLET_PKS.length})`
      );

      const pendingBalance = await getPendingBalance(
        abstractClient.account.address
      );
      console.log(
        `[${abstractClient.account.address}]: Pending balance: ${formatUnits(
          pendingBalance,
          18
        )}`
      );

      if (pendingBalance < 10000000000000000000n) {
        console.log(
          `[${abstractClient.account.address}]: Pending balance is less than 10 BIG, skipping...`
        );
        continue;
      }

      const balanceBefore = await getBigBalance(abstractClient.account.address);
      await claimRewards(abstractClient).catch(e => {
        console.log(
          `[${abstractClient.account.address}]: Error claiming reward`,
          e
        );
      });
      const balanceAfter = await getBigBalance(abstractClient.account.address);

      const balanceToSplit = balanceAfter - balanceBefore;

      const toTreasury = (balanceToSplit * 45n) / 100n;
      const toFee = (balanceToSplit * 5n) / 100n;
      const toReinvest = balanceToSplit - toTreasury - toFee;

      console.log(
        `[${abstractClient.account.address}]: Splitting ${formatUnits(
          balanceToSplit,
          18
        )} BIG: treasury=${formatUnits(toTreasury, 18)}, fee=${formatUnits(
          toFee,
          18
        )}, reinvest=${formatUnits(toReinvest, 18)}`
      );

      // Skip if no balance to split
      if (balanceToSplit === 0n) {
        console.log(
          `[${abstractClient.account.address}]: No balance to split, skipping...`
        );
        continue;
      }

      const recipientAddresses = [
        TREASURY_ADDRESS,
        FEE_ADDRESS,
        REINVEST_ADDRESS
      ];
      const recipientAmounts = [toTreasury, toFee, toReinvest];

      try {
        const airdropHash = await retryWithBackoff(
          async () =>
            airdrop(abstractClient, recipientAddresses, recipientAmounts),
          3,
          2000
        );
        console.log(
          `[${abstractClient.account.address}]: Completed with hash: ${airdropHash}`
        );
      } catch (error) {
        console.error(
          `[${abstractClient.account.address}]: Failed after retries:`,
          error
        );
      }

      // Add delay between wallets to prevent rate limiting
      if (index < WALLET_PKS.length - 1) {
        console.log(
          `Waiting ${
            DELAY_BETWEEN_WALLETS / 1000
          } seconds before processing next wallet...`
        );
        await delay(DELAY_BETWEEN_WALLETS);
      }
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

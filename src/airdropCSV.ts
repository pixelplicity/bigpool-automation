import {
  http,
  Transport,
  PublicClient,
  publicActions,
  createClient,
  erc20Abi,
  formatUnits
} from 'viem';
import { abstract, ChainEIP712 } from 'viem/chains';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// Config
const RPC_URL = process.env.RPC_URL;
const BIG_CONTRACT_ADDRESS = process.env.BIG_CONTRACT_ADDRESS as `0x${string}`;
const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS as `0x${string}`;

// Client Setup
const baseClient = createClient({
  transport: http(RPC_URL),
  chain: abstract as ChainEIP712
});
const publicClient: PublicClient<Transport, ChainEIP712> = baseClient.extend(
  publicActions
) as any;

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 2
});

/**
 * Get the balance of BIG in rewards contract
 */
const getRewardsBalance = async () => {
  const balance = await publicClient.readContract({
    address: BIG_CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [TREASURY_ADDRESS]
  });
  return balance;
};

async function main() {
  try {
    const args = process.argv.slice(2);
    const snapshotFile = args[0];

    if (!snapshotFile) {
      console.error('Snapshot file is required');
      process.exit(1);
    }

    const holdersRaw = await fs.promises.readFile(
      `./snapshots/${snapshotFile}`,
      'utf8'
    );
    const holdersJson = JSON.parse(holdersRaw) as Record<string, number>;

    const holders = Object.entries(holdersJson).map(([address, amount]) => ({
      address,
      amount: BigInt(amount)
    })) as { address: string; amount: bigint }[];
    const totalAmount = holders.reduce((acc, { amount }) => acc + amount, 0n);

    const rewardsBalance = await getRewardsBalance();

    // for each holder, calculate the amount of the rewardsBalance they should receive
    const airdropAmount = holders.map(({ address, amount }) => {
      const percentage = Number(amount) / Number(totalAmount);
      const amountToReceive = formatUnits(
        BigInt(Math.floor(percentage * Number(rewardsBalance))),
        18
      );

      //DEBUG
      // console.log(
      //   address,
      //   amount,
      //   percentFormatter.format(percentage),
      //   amountToReceive
      // );
      return {
        address,
        amount: amountToReceive
      };
    });

    const csvContent = airdropAmount
      .map(({ address, amount }) => `${address},${amount}`)
      .join('\n');

    await fs.promises.writeFile(
      `./airdrop/airdrop-for-${snapshotFile}.csv`,
      csvContent
    );
    console.log(`Airdrop CSV written to airdrop-for-${snapshotFile}.csv`);
    process.exit(0);
  } catch (err) {
    console.error('Error in main execution:', err);
  }
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});

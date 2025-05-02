import {
  http,
  Transport,
  PublicClient,
  publicActions,
  createClient
} from 'viem';
import fs from 'fs';
import { abstract, ChainEIP712 } from 'viem/chains';
import dotenv from 'dotenv';
import { BigpoolAbi } from './abis/BigpoolAbi';

dotenv.config();

// Config
const RPC_URL = process.env.RPC_URL;
const BIGPOOL_CONTRACT_ADDRESS = process.env
  .BIGPOOL_CONTRACT_ADDRESS as `0x${string}`;

// Client Setup
const baseClient = createClient({
  transport: http(RPC_URL),
  chain: abstract as ChainEIP712
});
const publicClient: PublicClient<Transport, ChainEIP712> = baseClient.extend(
  publicActions
) as any;

/**
 * Foreach token, get the holders and how many they own
 */
const getHolders = async () => {
  const [firstTokenId, totalSupply] = await publicClient.multicall({
    contracts: [
      {
        address: BIGPOOL_CONTRACT_ADDRESS,
        abi: BigpoolAbi,
        functionName: 'firstTokenId'
      },
      {
        address: BIGPOOL_CONTRACT_ADDRESS,
        abi: BigpoolAbi,
        functionName: 'totalSupply'
      }
    ]
  });

  const chunkSize = 50;
  const totalTokens = Number(totalSupply.result);
  const holders = new Map<string, bigint>();

  for (let i = 0; i < totalTokens; i += chunkSize) {
    const end = Math.min(i + chunkSize, totalTokens);
    const tokenIds = Array.from(
      { length: end - i },
      (_, j) => BigInt(i + j) + (firstTokenId.result ?? 1n)
    );

    const ownerCalls = tokenIds.map(tokenId => ({
      address: BIGPOOL_CONTRACT_ADDRESS,
      abi: BigpoolAbi,
      functionName: 'ownerOf',
      args: [tokenId]
    }));

    const owners = await publicClient.multicall<{ result: `0x${string}` }[]>({
      contracts: ownerCalls
    });

    owners.forEach((owner, index) => {
      if (owner.status === 'success') {
        const address = owner.result as string;
        holders.set(address, (holders.get(address) || 0n) + 1n);
      }
    });
  }

  return holders;
};

async function main() {
  try {
    const holders = await getHolders();
    console.log(holders);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `./snapshots/snapshot-${timestamp}.json`;
    const jsonContent = JSON.stringify(
      Object.fromEntries(
        Array.from(holders.entries()).map(([address, amount]) => [
          address,
          Number(amount)
        ])
      ),
      null,
      2
    );

    await fs.promises.writeFile(filename, jsonContent);
    console.log(`Snapshot written to snapshot-${timestamp}.json`);
  } catch (err) {
    console.error('Error in main execution:', err);
  }
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});

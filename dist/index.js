"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const viem_1 = require("viem");
const agw_client_1 = require("@abstract-foundation/agw-client");
const accounts_1 = require("viem/accounts");
const chains_1 = require("viem/chains");
const dotenv_1 = __importDefault(require("dotenv"));
const BigCoinAbi_1 = require("./abis/BigCoinAbi");
const Erc20ApproveAbi_1 = require("./abis/Erc20ApproveAbi");
const AirdropAbi_1 = require("./abis/AirdropAbi");
dotenv_1.default.config();
// Config
const RPC_URL = process.env.RPC_URL;
const BIGCOIN_CONTRACT_ADDRESS = process.env
    .BIGCOIN_CONTRACT_ADDRESS;
const BIG_CONTRACT_ADDRESS = process.env.BIG_CONTRACT_ADDRESS;
const AIRDROP_CONTRACT_ADDRESS = process.env
    .AIRDROP_CONTRACT_ADDRESS;
const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS;
const FEE_ADDRESS = process.env.FEE_ADDRESS;
const REINVEST_ADDRESS = process.env.REINVEST_ADDRESS;
const WALLET_PKS = process.env.WALLET_PKS?.split(',');
// Client Setup
const baseClient = (0, viem_1.createClient)({
    transport: (0, viem_1.http)(RPC_URL),
    chain: chains_1.abstract
});
const publicClient = baseClient.extend(viem_1.publicActions);
/**
 * Airdrop using gaslitedrop
 * Batches the approval and airdrop into a single transaction
 */
const airdrop = async (abstractClient, recipientAddresses, recipientAmounts) => {
    const totalAmount = recipientAmounts.reduce((acc, amt) => acc + amt, 0n);
    const hash = await abstractClient.sendTransactionBatch({
        calls: [
            {
                to: BIG_CONTRACT_ADDRESS,
                args: [AIRDROP_CONTRACT_ADDRESS, totalAmount],
                data: (0, viem_1.encodeFunctionData)({
                    abi: Erc20ApproveAbi_1.Erc20approveAbi,
                    functionName: 'approve',
                    args: [AIRDROP_CONTRACT_ADDRESS, totalAmount]
                })
            },
            {
                to: AIRDROP_CONTRACT_ADDRESS,
                data: (0, viem_1.encodeFunctionData)({
                    abi: AirdropAbi_1.AirdropAbi,
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
const getBigBalance = async (address) => {
    const balance = await publicClient.readContract({
        address: BIG_CONTRACT_ADDRESS,
        abi: viem_1.erc20Abi,
        functionName: 'balanceOf',
        args: [address]
    });
    return balance;
};
/**
 * Claim rewards from the BigCoin contract
 */
const claimRewards = async (abstractClient) => {
    const hash = await abstractClient.writeContract({
        address: BIGCOIN_CONTRACT_ADDRESS,
        abi: BigCoinAbi_1.BigCoinAbi,
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
            const signer = (0, accounts_1.privateKeyToAccount)(pk);
            const abstractClient = await (0, agw_client_1.createAbstractClient)({
                signer,
                chain: chains_1.abstract,
                transport: (0, viem_1.http)(RPC_URL)
            });
            console.log(`[${abstractClient.account.address}]: Starting claim and split`);
            await claimRewards(abstractClient);
            const balance = await getBigBalance(abstractClient.account.address);
            const toTreasury = (balance * 45n) / 100n;
            const toTeam = (balance * 5n) / 100n;
            const toHolders = balance - toTreasury - toTeam;
            console.log(`[${abstractClient.account.address}]: Splitting ${(0, viem_1.formatUnits)(balance, 18)} BIG: treasury=${(0, viem_1.formatUnits)(toTreasury, 18)}, fee=${(0, viem_1.formatUnits)(toTeam, 18)}, reinvest=${(0, viem_1.formatUnits)(toHolders, 18)}`);
            const recipientAddresses = [
                TREASURY_ADDRESS,
                FEE_ADDRESS,
                REINVEST_ADDRESS
            ];
            const recipientAmounts = [toTreasury, toTeam, toHolders];
            const airdropHash = await airdrop(abstractClient, recipientAddresses, recipientAmounts);
            console.log(`[${abstractClient.account.address}]: Completed with hash: ${airdropHash}`);
        }
    }
    catch (err) {
        console.error('Error in main execution:', err);
    }
}
main().catch(err => {
    console.error('Unhandled error:', err);
});

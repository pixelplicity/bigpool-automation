import { parseAbi } from 'viem';

export const Erc20approveAbi = parseAbi([
  'function approve(address spender, uint256 amount) public'
]);

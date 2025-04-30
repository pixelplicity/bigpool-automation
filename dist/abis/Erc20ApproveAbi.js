"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Erc20approveAbi = void 0;
const viem_1 = require("viem");
exports.Erc20approveAbi = (0, viem_1.parseAbi)([
    'function approve(address spender, uint256 amount) public'
]);

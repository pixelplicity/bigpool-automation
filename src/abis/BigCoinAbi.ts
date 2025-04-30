export const BigCoinAbi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'AlreadyAtMaxFacility', type: 'error' },
  { inputs: [], name: 'AlreadyPurchasedInitialFactory', type: 'error' },
  { inputs: [], name: 'CantBuyNewFacilityYet', type: 'error' },
  { inputs: [], name: 'CantModifyStarterFacility', type: 'error' },
  { inputs: [], name: 'CantModifyStarterMiner', type: 'error' },
  { inputs: [], name: 'FacilityDimensionsInvalid', type: 'error' },
  { inputs: [], name: 'FacilityInadequatePowerOutput', type: 'error' },
  { inputs: [], name: 'GreatDepression', type: 'error' },
  { inputs: [], name: 'IncorrectValue', type: 'error' },
  { inputs: [], name: 'IndexOutOfBounds', type: 'error' },
  { inputs: [], name: 'InvalidFacilityIndex', type: 'error' },
  { inputs: [], name: 'InvalidFee', type: 'error' },
  { inputs: [], name: 'InvalidMinerCoordinates', type: 'error' },
  { inputs: [], name: 'InvalidMinerIndex', type: 'error' },
  { inputs: [], name: 'InvalidPowerOutput', type: 'error' },
  { inputs: [], name: 'InvalidReferrer', type: 'error' },
  { inputs: [], name: 'MinerNotInProduction', type: 'error' },
  { inputs: [], name: 'MiningHasntStarted', type: 'error' },
  { inputs: [], name: 'NeedToInitializeFacility', type: 'error' },
  { inputs: [], name: 'NewFacilityNotInProduction', type: 'error' },
  { inputs: [], name: 'NoRewardsPending', type: 'error' },
  { inputs: [], name: 'NonExistentFacility', type: 'error' },
  { inputs: [], name: 'NonExistentMiner', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'OwnableInvalidOwner',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error'
  },
  { inputs: [], name: 'PlayerDoesNotOwnMiner', type: 'error' },
  { inputs: [], name: 'StarterMinerAlreadyAcquired', type: 'error' },
  { inputs: [], name: 'TooPoor', type: 'error' },
  { inputs: [], name: 'WithdrawFailed', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'facilityIndex',
        type: 'uint256'
      },
      { indexed: false, internalType: 'uint256', name: 'cost', type: 'uint256' }
    ],
    name: 'FacilityBought',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'facilityIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newCost',
        type: 'uint256'
      }
    ],
    name: 'FacilityCostChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'facilityIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'inProduction',
        type: 'bool'
      }
    ],
    name: 'FacilityProductionToggled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address'
      }
    ],
    name: 'InitialFacilityPurchased',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'minerIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cost',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minerId',
        type: 'uint256'
      },
      { indexed: false, internalType: 'uint256', name: 'x', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'y', type: 'uint256' }
    ],
    name: 'MinerBought',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'minerIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newCost',
        type: 'uint256'
      }
    ],
    name: 'MinerCostChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'minerIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'inProduction',
        type: 'bool'
      }
    ],
    name: 'MinerProductionToggled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'minerIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      }
    ],
    name: 'MinerSecondaryMarketAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'minerIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'secondHandPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minerId',
        type: 'uint256'
      },
      { indexed: false, internalType: 'uint256', name: 'x', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'y', type: 'uint256' }
    ],
    name: 'MinerSold',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startBlock',
        type: 'uint256'
      }
    ],
    name: 'MiningStarted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'facilityIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalPowerOutput',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cost',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'inProduction',
        type: 'bool'
      },
      { indexed: false, internalType: 'uint256', name: 'x', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'y', type: 'uint256' }
    ],
    name: 'NewFacilityAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'minerIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'hashRate',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'powerConsumption',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cost',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'inProduction',
        type: 'bool'
      }
    ],
    name: 'NewMinerAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'playerHashrate',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'playerPendingRewards',
        type: 'uint256'
      }
    ],
    name: 'PlayerHashrateDecreased',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'playerHashrate',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'playerPendingRewards',
        type: 'uint256'
      }
    ],
    name: 'PlayerHashrateIncreased',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewards',
        type: 'uint256'
      }
    ],
    name: 'RewardsClaimed',
    type: 'event'
  },
  {
    inputs: [],
    name: 'HALVING_INTERVAL',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'INITIAL_BIGCOIN_PER_BLOCK',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'REWARDS_PRECISION',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'STARTER_FACILITY_INDEX',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'STARTER_MINER_INDEX',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'acquiredStarterMiner',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'maxMiners', type: 'uint256' },
      { internalType: 'uint256', name: 'totalPowerOutput', type: 'uint256' },
      { internalType: 'uint256', name: 'cost', type: 'uint256' },
      { internalType: 'bool', name: 'inProduction', type: 'bool' },
      { internalType: 'uint256', name: 'x', type: 'uint256' },
      { internalType: 'uint256', name: 'y', type: 'uint256' }
    ],
    name: 'addFacility',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'hashrate', type: 'uint256' },
      { internalType: 'uint256', name: 'powerConsumption', type: 'uint256' },
      { internalType: 'uint256', name: 'cost', type: 'uint256' },
      { internalType: 'bool', name: 'inProduction', type: 'bool' }
    ],
    name: 'addMiner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'minerIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'price', type: 'uint256' }
    ],
    name: 'addSecondaryMarketForMiner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'bigcoin',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'bigtoshi',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'blocksUntilNextHalving',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'burnPct',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'minerIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'x', type: 'uint256' },
      { internalType: 'uint256', name: 'y', type: 'uint256' }
    ],
    name: 'buyMiner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'buyNewFacility',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'facilityIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'newCost', type: 'uint256' }
    ],
    name: 'changeFacilityCost',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'minerIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'newCost', type: 'uint256' }
    ],
    name: 'changeMinerCost',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'cooldown',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'cumulativeBigcoinPerHash',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'facilities',
    outputs: [
      { internalType: 'uint256', name: 'maxMiners', type: 'uint256' },
      { internalType: 'uint256', name: 'totalPowerOutput', type: 'uint256' },
      { internalType: 'uint256', name: 'cost', type: 'uint256' },
      { internalType: 'bool', name: 'inProduction', type: 'bool' },
      { internalType: 'uint256', name: 'x', type: 'uint256' },
      { internalType: 'uint256', name: 'y', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'facilityCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getBigcoinPerBlock',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'x', type: 'uint256' },
      { internalType: 'uint256', name: 'y', type: 'uint256' }
    ],
    name: 'getFreeStarterMiner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'player', type: 'address' },
      { internalType: 'uint256', name: 'startIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'size', type: 'uint256' }
    ],
    name: 'getPlayerMinersPaginated',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'minerIndex', type: 'uint256' },
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'uint256', name: 'x', type: 'uint256' },
          { internalType: 'uint256', name: 'y', type: 'uint256' },
          { internalType: 'uint256', name: 'hashrate', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'powerConsumption',
            type: 'uint256'
          },
          { internalType: 'uint256', name: 'cost', type: 'uint256' },
          { internalType: 'bool', name: 'inProduction', type: 'bool' }
        ],
        internalType: 'struct Miner[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'referrer', type: 'address' }],
    name: 'getReferrals',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'initialFacilityPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'initializedStarterFacility',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'lastFacilityUpgradeTimestamp',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'lastRewardBlock',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'minerSecondHandMarket',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'miners',
    outputs: [
      { internalType: 'uint256', name: 'minerIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'uint256', name: 'x', type: 'uint256' },
      { internalType: 'uint256', name: 'y', type: 'uint256' },
      { internalType: 'uint256', name: 'hashrate', type: 'uint256' },
      { internalType: 'uint256', name: 'powerConsumption', type: 'uint256' },
      { internalType: 'uint256', name: 'cost', type: 'uint256' },
      { internalType: 'bool', name: 'inProduction', type: 'bool' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'miningHasStarted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'ownerToFacility',
    outputs: [
      { internalType: 'uint256', name: 'facilityIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'maxMiners', type: 'uint256' },
      { internalType: 'uint256', name: 'currMiners', type: 'uint256' },
      { internalType: 'uint256', name: 'totalPowerOutput', type: 'uint256' },
      { internalType: 'uint256', name: 'currPowerOutput', type: 'uint256' },
      { internalType: 'uint256', name: 'x', type: 'uint256' },
      { internalType: 'uint256', name: 'y', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
    name: 'pendingRewards',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'playerBigcoinDebt',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
    name: 'playerBigcoinPerBlock',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'playerHashrate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'playerMinersId',
    outputs: [
      { internalType: 'uint256', name: 'minerIndex', type: 'uint256' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'uint256', name: 'x', type: 'uint256' },
      { internalType: 'uint256', name: 'y', type: 'uint256' },
      { internalType: 'uint256', name: 'hashrate', type: 'uint256' },
      { internalType: 'uint256', name: 'powerConsumption', type: 'uint256' },
      { internalType: 'uint256', name: 'cost', type: 'uint256' },
      { internalType: 'bool', name: 'inProduction', type: 'bool' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'playerMinersOwned',
    outputs: [{ internalType: 'uint256', name: '_spacer', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' }
    ],
    name: 'playerOccupiedCoords',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'playerPendingRewards',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'referrer', type: 'address' }],
    name: 'purchaseInitialFacility',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'referralBonusPaid',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'referralFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'referrals',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' }
    ],
    name: 'referredUsers',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'minerId', type: 'uint256' }],
    name: 'sellMiner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '_bigcoin', type: 'address' }],
    name: 'setBigcoin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '_bigtoshi', type: 'address' }],
    name: 'setBigtoshi',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'burn', type: 'uint256' }],
    name: 'setBurnPct',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '_cooldown', type: 'uint256' }],
    name: 'setCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_initialPrice', type: 'uint256' }
    ],
    name: 'setInitialFacilityPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'fee', type: 'uint256' }],
    name: 'setReferralFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'startBlock',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
    name: 'timeUntilNextFacilityUpgrade',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'facilityIndex', type: 'uint256' },
      { internalType: 'bool', name: 'inProduction', type: 'bool' }
    ],
    name: 'toggleFacilityProduction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'minerIndex', type: 'uint256' },
      { internalType: 'bool', name: 'inProduction', type: 'bool' }
    ],
    name: 'toggleMinerProduction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalHashrate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'uniqueMinerCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amt', type: 'uint256' }],
    name: 'withdrawBigcoin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

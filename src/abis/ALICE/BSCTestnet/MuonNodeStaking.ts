export default [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'staker',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'ClaimUnstake',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'stakerAddress',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'delegatee',
        type: 'address'
      }
    ],
    name: 'Delegated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'exitPendingPeriod',
        type: 'uint256'
      }
    ],
    name: 'ExitPendingPeriodUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'string',
        name: 'functionName',
        type: 'string'
      },
      {indexed: false, internalType: 'bool', name: 'isPaused', type: 'bool'}
    ],
    name: 'FunctionPauseStatusChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'uint8', name: 'version', type: 'uint8'}],
    name: 'Initialized',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minStakeAmount',
        type: 'uint256'
      }
    ],
    name: 'MinStakeAmountUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'muonAppId',
        type: 'uint256'
      }
    ],
    name: 'MuonAppIdUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nodeAddress',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'stakerAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'peerId',
        type: 'string'
      }
    ],
    name: 'MuonNodeAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {internalType: 'uint256', name: 'x', type: 'uint256'},
          {internalType: 'uint8', name: 'parity', type: 'uint8'}
        ],
        indexed: false,
        internalType: 'struct MuonClientBase.PublicKey',
        name: 'muonPublicKey',
        type: 'tuple'
      }
    ],
    name: 'MuonPublicKeyUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {indexed: false, internalType: 'bytes', name: 'reqId', type: 'bytes'},
      {
        indexed: true,
        internalType: 'address',
        name: 'stakerAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'RewardGot',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'periodStart',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_rewardPeriod',
        type: 'uint256'
      }
    ],
    name: 'RewardsDistributed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32'},
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32'
      }
    ],
    name: 'RoleAdminChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32'},
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleGranted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32'},
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleRevoked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'stakerAddress',
        type: 'address'
      },
      {indexed: false, internalType: 'bool', name: 'locked', type: 'bool'}
    ],
    name: 'StakeLockStatusChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'stakerAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'Staked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'multiplier',
        type: 'uint256'
      }
    ],
    name: 'StakingTokenUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'uint8', name: 'tier', type: 'uint8'},
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxStakeAmount',
        type: 'uint256'
      }
    ],
    name: 'TierMaxStakeUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'stakerAddress',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'delegatee',
        type: 'address'
      }
    ],
    name: 'Undelegated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'stakerAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }
    ],
    name: 'Unstaked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'verifierAddress',
        type: 'address'
      }
    ],
    name: 'VerifierUpdated',
    type: 'event'
  },
  {
    inputs: [],
    name: 'DAO_ROLE',
    outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'REWARD_ROLE',
    outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'UPDATE_STAKING_ROLE',
    outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'address', name: 'nodeAddress', type: 'address'},
      {internalType: 'string', name: 'peerId', type: 'string'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'}
    ],
    name: 'addMuonNode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'address', name: 'nodeAddress', type: 'address'},
      {internalType: 'string', name: 'peerId', type: 'string'},
      {internalType: 'uint256', name: 'stakeAmount', type: 'uint256'}
    ],
    name: 'addMuonNodeByToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'bondedToken',
    outputs: [{internalType: 'contract IBondedToken', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'claimUnstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: 'stakerAddress', type: 'address'}],
    name: 'deactiveMuonNode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'delegateeStakers',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint256', name: 'reward', type: 'uint256'}],
    name: 'distributeRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: 'stakerAddress', type: 'address'}],
    name: 'earned',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'exitPendingPeriod',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'string', name: '', type: 'string'}],
    name: 'functionPauseStatus',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'uint256', name: 'paidRewardPerToken', type: 'uint256'},
      {internalType: 'bytes', name: 'reqId', type: 'bytes'},
      {
        components: [
          {internalType: 'uint256', name: 'signature', type: 'uint256'},
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'nonce', type: 'address'}
        ],
        internalType: 'struct MuonClientBase.SchnorrSign',
        name: 'signature',
        type: 'tuple'
      }
    ],
    name: 'getReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'bytes32', name: 'role', type: 'bytes32'}],
    name: 'getRoleAdmin',
    outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'bytes32', name: 'role', type: 'bytes32'},
      {internalType: 'address', name: 'account', type: 'address'}
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'bytes32', name: 'role', type: 'bytes32'},
      {internalType: 'address', name: 'account', type: 'address'}
    ],
    name: 'hasRole',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'address', name: '_muonTokenAddress', type: 'address'},
      {internalType: 'address', name: '_nodeManagerAddress', type: 'address'},
      {internalType: 'uint256', name: '_muonAppId', type: 'uint256'},
      {
        components: [
          {internalType: 'uint256', name: 'x', type: 'uint256'},
          {internalType: 'uint8', name: 'parity', type: 'uint8'}
        ],
        internalType: 'struct MuonClientBase.PublicKey',
        name: '_muonPublicKey',
        type: 'tuple'
      },
      {internalType: 'address', name: '_bondedTokenAddress', type: 'address'},
      {internalType: 'uint256', name: '_totalStaked', type: 'uint256'},
      {internalType: 'uint256', name: '_notPaidRewards', type: 'uint256'},
      {internalType: 'uint256', name: '_periodFinish', type: 'uint256'},
      {internalType: 'uint256', name: '_rewardRate', type: 'uint256'},
      {internalType: 'uint256', name: '_lastUpdateTime', type: 'uint256'},
      {
        internalType: 'uint256',
        name: '_rewardPerTokenStored',
        type: 'uint256'
      }
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'isStakingToken',
    outputs: [{internalType: 'uint16', name: '', type: 'uint16'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'lastTimeRewardApplicable',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'lastUpdateTime',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'address[]', name: 'tokens', type: 'address[]'},
      {internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'}
    ],
    name: 'lockToBondedToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'lockedStakes',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenIdA', type: 'uint256'}],
    name: 'mergeBondedTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'address[]', name: '_user', type: 'address[]'},
      {internalType: 'uint256[]', name: '_balance', type: 'uint256[]'},
      {internalType: 'uint256[]', name: '_paidReward', type: 'uint256[]'},
      {
        internalType: 'uint256[]',
        name: '_paidRewardPerToken',
        type: 'uint256[]'
      },
      {internalType: 'uint256[]', name: '_pendingRewards', type: 'uint256[]'},
      {internalType: 'uint256[]', name: '_tokenId', type: 'uint256[]'},
      {internalType: 'address[]', name: '_nodeAddress', type: 'address[]'},
      {internalType: 'string[]', name: '_peerId', type: 'string[]'}
    ],
    name: 'migrate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'minStakeAmount',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'muonAppId',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'muonPublicKey',
    outputs: [
      {internalType: 'uint256', name: 'x', type: 'uint256'},
      {internalType: 'uint8', name: 'parity', type: 'uint8'}
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'muonToken',
    outputs: [{internalType: 'contract IERC20Upgradeable', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'nodeManager',
    outputs: [{internalType: 'contract IMuonNodeManager', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'notPaidRewards',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'address', name: '', type: 'address'},
      {internalType: 'address', name: '', type: 'address'},
      {internalType: 'uint256', name: '', type: 'uint256'},
      {internalType: 'bytes', name: '', type: 'bytes'}
    ],
    name: 'onERC721Received',
    outputs: [{internalType: 'bytes4', name: '', type: 'bytes4'}],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'pendingUnstakes',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'periodFinish',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'bytes32', name: 'role', type: 'bytes32'},
      {internalType: 'address', name: 'account', type: 'address'}
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'bytes32', name: 'role', type: 'bytes32'},
      {internalType: 'address', name: 'account', type: 'address'}
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'rewardPerToken',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'rewardPerTokenStored',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'rewardPeriod',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'rewardRate',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'address', name: '_staker', type: 'address'},
      {internalType: 'address', name: '_delegatee', type: 'address'}
    ],
    name: 'setDelegation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint256', name: '_exitPendingPeriod', type: 'uint256'}],
    name: 'setExitPendingPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'string', name: 'functionName', type: 'string'},
      {internalType: 'bool', name: 'pauseStatus', type: 'bool'}
    ],
    name: 'setFunctionPauseStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint256', name: '_minStakeAmount', type: 'uint256'}],
    name: 'setMinStakeAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint256', name: '_muonAppId', type: 'uint256'}],
    name: 'setMuonAppId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'address', name: 'stakerAddress', type: 'address'},
      {internalType: 'uint8', name: 'tier', type: 'uint8'}
    ],
    name: 'setMuonNodeTier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {internalType: 'uint256', name: 'x', type: 'uint256'},
          {internalType: 'uint8', name: 'parity', type: 'uint8'}
        ],
        internalType: 'struct MuonClientBase.PublicKey',
        name: '_muonPublicKey',
        type: 'tuple'
      }
    ],
    name: 'setMuonPublicKey',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint256', name: 'period', type: 'uint256'}],
    name: 'setRewardPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'address', name: 'stakerAddress', type: 'address'},
      {internalType: 'bool', name: 'lockStatus', type: 'bool'}
    ],
    name: 'setStakeLockStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'uint8', name: 'tier', type: 'uint8'},
      {internalType: 'uint256', name: 'maxStakeAmount', type: 'uint256'}
    ],
    name: 'setTierMaxStakeAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: '_verifierAddress', type: 'address'}],
    name: 'setVerifier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'stakingTokens',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'stakingTokensMultiplier',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'bytes4', name: 'interfaceId', type: 'bytes4'}],
    name: 'supportsInterface',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
    name: 'tiersMaxStakeAmount',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalStaked',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: '_delegatee', type: 'address'}],
    name: 'unsetDelegation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'unstakeReqTimes',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'updateStaking',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: 'staker', type: 'address'}],
    name: 'updateStakingFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'address[]', name: 'tokens', type: 'address[]'},
      {internalType: 'uint256[]', name: 'multipliers', type: 'uint256[]'}
    ],
    name: 'updateStakingTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'users',
    outputs: [
      {internalType: 'uint256', name: 'balance', type: 'uint256'},
      {internalType: 'uint256', name: 'paidReward', type: 'uint256'},
      {internalType: 'uint256', name: 'paidRewardPerToken', type: 'uint256'},
      {internalType: 'uint256', name: 'pendingRewards', type: 'uint256'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'}
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'valueOfBondedToken',
    outputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'verifier',
    outputs: [
      {
        internalType: 'contract SchnorrSECP256K1VerifierV2',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

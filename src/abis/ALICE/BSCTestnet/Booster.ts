export default [
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'uint8', name: 'version', type: 'uint8'}],
    name: 'Initialized',
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
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
    stateMutability: 'view',
    type: 'function'
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
    inputs: [
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {internalType: 'address', name: '_tokenAddr', type: 'address'}
    ],
    name: 'adminWithdraw',
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
    inputs: [
      {internalType: 'uint256', name: 'nftId', type: 'uint256'},
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'boost',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'boostValue',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'muonAmount', type: 'uint256'},
      {
        internalType: 'uint256',
        name: 'usdcAmount',
        type: 'uint256'
      }
    ],
    name: 'createAndBoost',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint256', name: 'nftId', type: 'uint256'}],
    name: 'getBoostableAmount',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
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
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'bytes32', name: 'role', type: 'bytes32'},
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'hasRole',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'muonTokenAddress',
        type: 'address'
      },
      {internalType: 'address', name: 'usdcAddress', type: 'address'},
      {
        internalType: 'address',
        name: 'bondedTokenAddress',
        type: 'address'
      },
      {internalType: 'address', name: '_treasury', type: 'address'},
      {
        internalType: 'address',
        name: '_uniswapV2Router',
        type: 'address'
      },
      {internalType: 'address', name: '_uniswapV2Pair', type: 'address'},
      {
        internalType: 'uint256',
        name: '_boostValue',
        type: 'uint256'
      }
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'muonToken',
    outputs: [{internalType: 'contract IToken', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'bytes32', name: 'role', type: 'bytes32'},
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'bytes32', name: 'role', type: 'bytes32'},
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint256', name: '_value', type: 'uint256'}],
    name: 'setBoostValue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: '_treasury', type: 'address'}],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [],
    name: 'treasury',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'uniswapV2Pair',
    outputs: [{internalType: 'contract IUniswapV2Pair', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'uniswapV2Router',
    outputs: [
      {
        internalType: 'contract IUniswapV2Router02',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'usdcToken',
    outputs: [{internalType: 'contract IERC20', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

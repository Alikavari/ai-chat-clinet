import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi';
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Alice
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const aliceABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINTER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PAUSER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BonALICE
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const bonAliceABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokens',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'amounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'Locked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenIdA',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokenIdB',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Merged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'publicTransferStatus',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'PublicTransferStatusUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'newTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokens',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'amounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'Splited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'treasury',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'TreasuryUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokens',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'WhitelistTokensUpdated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'BOOSTER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'TRANSFERABLE_ADDRESS_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addBoostedBalance',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'boostedBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokens', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'getLockedOf',
    outputs: [
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_treasury', internalType: 'address', type: 'address' },
      { name: '_tokenIdCounter', internalType: 'uint256', type: 'uint256' },
      { name: '_totalLocked', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isPublicTransferEnabled',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isTokenWhitelisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokens', internalType: 'address[]', type: 'address[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'lock',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'lockedOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenIdA', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenIdB', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'merge',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_owner', internalType: 'address[]', type: 'address[]' },
      { name: '_balance', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_mintedAt', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'migrate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'mint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokens', internalType: 'address[]', type: 'address[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'mintAndLock',
    outputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'mintedAt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_isPublicTransferEnabled', internalType: 'bool', type: 'bool' },
    ],
    name: 'setPublicTransfer',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tokenIdCounter',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokensWhitelist',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'totalLocked',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'treasury',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokens', internalType: 'address[]', type: 'address[]' }],
    name: 'whitelistTokens',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Booster
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const boosterABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'muonTokenAddress', internalType: 'address', type: 'address' },
      { name: 'usdcAddress', internalType: 'address', type: 'address' },
      { name: 'bondedTokenAddress', internalType: 'address', type: 'address' },
      { name: '_treasury', internalType: 'address', type: 'address' },
      { name: '_uniswapV2Pair', internalType: 'address', type: 'address' },
      { name: '_boostValue', internalType: 'uint256', type: 'uint256' },
      { name: '_signer', internalType: 'address', type: 'address' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'nftId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'addr', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'usdcAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenPrice',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'boostedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Boosted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenAddr', internalType: 'address', type: 'address' },
    ],
    name: 'adminWithdraw',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'bondedToken',
    outputs: [
      { name: '', internalType: 'contract IBondedToken', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nftId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'signedPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'boost',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'boostValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'muonAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'usdcAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'signedPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'createAndBoost',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nftId', internalType: 'uint256', type: 'uint256' }],
    name: 'getBoostableAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'muonToken',
    outputs: [{ name: '', internalType: 'contract IToken', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setBoostValue',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_newValidityPeriod', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setSignatureValidityPeriod',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_signer', internalType: 'address', type: 'address' }],
    name: 'setSigner',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_usdc', internalType: 'contract IToken', type: 'address' },
      {
        name: '_pair',
        internalType: 'contract IUniswapV2Pair',
        type: 'address',
      },
    ],
    name: 'setTokenInfo',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'percentage', internalType: 'uint8', type: 'uint8' }],
    name: 'setTolerancePercentage',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'signatureValidityPeriod',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'signer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tolerancePercentage',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'treasury',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'uniswapV2Pair',
    outputs: [
      { name: '', internalType: 'contract IUniswapV2Pair', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'usdcToken',
    outputs: [{ name: '', internalType: 'contract IToken', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'chainAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'oracleAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'validateAmount',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LpToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lpTokenABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'authorizer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nonce',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'AuthorizationCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'authorizer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nonce',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'AuthorizationUsed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Blacklisted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newBlacklister',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BlacklisterChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'burner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Burn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newMasterMinter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'MasterMinterChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'minter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'minter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'minterAllowedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MinterConfigured',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldMinter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'MinterRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'OwnershipTransferred',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Pause' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PauserChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newRescuer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RescuerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'UnBlacklisted',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Unpause' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CANCEL_AUTHORIZATION_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'RECEIVE_WITH_AUTHORIZATION_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'TRANSFER_WITH_AUTHORIZATION_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'authorizer', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'authorizationState',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'blacklist',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'blacklister',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'authorizer', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'bytes32', type: 'bytes32' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'cancelAuthorization',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'minter', internalType: 'address', type: 'address' },
      { name: 'minterAllowedAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'configureMinter',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'currency',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'decrement', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'increment', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenName', internalType: 'string', type: 'string' },
      { name: 'tokenSymbol', internalType: 'string', type: 'string' },
      { name: 'tokenCurrency', internalType: 'string', type: 'string' },
      { name: 'tokenDecimals', internalType: 'uint8', type: 'uint8' },
      { name: 'newMasterMinter', internalType: 'address', type: 'address' },
      { name: 'newPauser', internalType: 'address', type: 'address' },
      { name: 'newBlacklister', internalType: 'address', type: 'address' },
      { name: 'newOwner', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newName', internalType: 'string', type: 'string' }],
    name: 'initializeV2',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'lostAndFound', internalType: 'address', type: 'address' },
    ],
    name: 'initializeV2_1',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'isBlacklisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'isMinter',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'masterMinter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'minter', internalType: 'address', type: 'address' }],
    name: 'minterAllowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pauser',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'validAfter', internalType: 'uint256', type: 'uint256' },
      { name: 'validBefore', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'bytes32', type: 'bytes32' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'receiveWithAuthorization',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'minter', internalType: 'address', type: 'address' }],
    name: 'removeMinter',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'tokenContract',
        internalType: 'contract IERC20',
        type: 'address',
      },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'rescueERC20',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'rescuer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'validAfter', internalType: 'uint256', type: 'uint256' },
      { name: 'validBefore', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'bytes32', type: 'bytes32' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'transferWithAuthorization',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'unBlacklist',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_newBlacklister', internalType: 'address', type: 'address' },
    ],
    name: 'updateBlacklister',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_newMasterMinter', internalType: 'address', type: 'address' },
    ],
    name: 'updateMasterMinter',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_newPauser', internalType: 'address', type: 'address' }],
    name: 'updatePauser',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newRescuer', internalType: 'address', type: 'address' }],
    name: 'updateRescuer',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MigrationHelper
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const migrationHelperABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_muonTokenAddress', internalType: 'address', type: 'address' },
      { name: '_oldToken', internalType: 'address', type: 'address' },
      { name: '_signer', internalType: 'address', type: 'address' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenClaimed',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'claim',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'claimed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'muonToken',
    outputs: [{ name: '', internalType: 'contract IToken', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'oldToken',
    outputs: [{ name: '', internalType: 'contract IToken', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'ownerWithdraw',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
    name: 'setMuonToken',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_signer', internalType: 'address', type: 'address' }],
    name: 'setSigner',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'signer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MuonNodeManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const muonNodeManagerABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: true },
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'ConfigSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'nodeId', internalType: 'uint64', type: 'uint64', indexed: true },
      {
        name: 'node',
        internalType: 'struct IMuonNodeManager.Node',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint64', type: 'uint64' },
          { name: 'nodeAddress', internalType: 'address', type: 'address' },
          { name: 'stakerAddress', internalType: 'address', type: 'address' },
          { name: 'peerId', internalType: 'string', type: 'string' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'tier', internalType: 'uint8', type: 'uint8' },
          { name: 'roles', internalType: 'uint64[]', type: 'uint64[]' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'lastEditTime', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'NodeAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'nodeId', internalType: 'uint64', type: 'uint64', indexed: true },
    ],
    name: 'NodeDeactivated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'nodeId', internalType: 'uint64', type: 'uint64', indexed: true },
      { name: 'roleId', internalType: 'uint64', type: 'uint64', indexed: true },
    ],
    name: 'NodeRoleSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'nodeId', internalType: 'uint64', type: 'uint64', indexed: true },
      { name: 'roleId', internalType: 'uint64', type: 'uint64', indexed: true },
    ],
    name: 'NodeRoleUnset',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'nodeId', internalType: 'uint64', type: 'uint64', indexed: true },
      { name: 'tier', internalType: 'uint8', type: 'uint8', indexed: true },
    ],
    name: 'TierSet',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DAO_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nodeAddress', internalType: 'address', type: 'address' },
      { name: 'stakerAddress', internalType: 'address', type: 'address' },
      { name: 'peerId', internalType: 'string', type: 'string' },
      { name: 'active', internalType: 'bool', type: 'bool' },
    ],
    name: 'addNode',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'configs',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'nodeId', internalType: 'uint64', type: 'uint64' }],
    name: 'deactiveNode',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'editLogs',
    outputs: [
      { name: 'nodeId', internalType: 'uint64', type: 'uint64' },
      { name: 'editTime', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_nodeId', internalType: 'uint64[]', type: 'uint64[]' }],
    name: 'exitBatch',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'lastEditTime', internalType: 'uint256', type: 'uint256' },
      { name: 'startId', internalType: 'uint64', type: 'uint64' },
      { name: 'endId', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'getAllNodes',
    outputs: [
      {
        name: 'nodesList',
        internalType: 'struct IMuonNodeManager.Node[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint64', type: 'uint64' },
          { name: 'nodeAddress', internalType: 'address', type: 'address' },
          { name: 'stakerAddress', internalType: 'address', type: 'address' },
          { name: 'peerId', internalType: 'string', type: 'string' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'tier', internalType: 'uint8', type: 'uint8' },
          { name: 'roles', internalType: 'uint64[]', type: 'uint64[]' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'lastEditTime', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'lastEditTime', internalType: 'uint256', type: 'uint256' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'maxNodesToRetrieve', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'getEditedNodes',
    outputs: [
      {
        name: 'nodesList',
        internalType: 'struct IMuonNodeManager.Node[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint64', type: 'uint64' },
          { name: 'nodeAddress', internalType: 'address', type: 'address' },
          { name: 'stakerAddress', internalType: 'address', type: 'address' },
          { name: 'peerId', internalType: 'string', type: 'string' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'tier', internalType: 'uint8', type: 'uint8' },
          { name: 'roles', internalType: 'uint64[]', type: 'uint64[]' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'lastEditTime', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'lastIndex', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'configKeys', internalType: 'string[]', type: 'string[]' },
    ],
    name: 'getInfo',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint64', type: 'uint64' },
      { name: '', internalType: 'string[]', type: 'string[]' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nodeId', internalType: 'uint64', type: 'uint64' }],
    name: 'getNode',
    outputs: [
      {
        name: '',
        internalType: 'struct IMuonNodeManager.Node',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint64', type: 'uint64' },
          { name: 'nodeAddress', internalType: 'address', type: 'address' },
          { name: 'stakerAddress', internalType: 'address', type: 'address' },
          { name: 'peerId', internalType: 'string', type: 'string' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'tier', internalType: 'uint8', type: 'uint8' },
          { name: 'roles', internalType: 'uint64[]', type: 'uint64[]' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'lastEditTime', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nodeId', internalType: 'uint64', type: 'uint64' }],
    name: 'getNodeRoles',
    outputs: [{ name: '', internalType: 'uint64[]', type: 'uint64[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_lastNodeId', internalType: 'uint64', type: 'uint64' },
      { name: '_lastUpdateTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastNodeId',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastUpdateTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_nodeId', internalType: 'uint64[]', type: 'uint64[]' },
      { name: '_nodeAddress', internalType: 'address[]', type: 'address[]' },
      { name: '_stakerAddress', internalType: 'address[]', type: 'address[]' },
      { name: '_peerId', internalType: 'string[]', type: 'string[]' },
      { name: '_tier', internalType: 'uint8[]', type: 'uint8[]' },
    ],
    name: 'migrate',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nodeAddressIds',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nodeAddress', internalType: 'address', type: 'address' }],
    name: 'nodeAddressInfo',
    outputs: [
      {
        name: 'node',
        internalType: 'struct IMuonNodeManager.Node',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint64', type: 'uint64' },
          { name: 'nodeAddress', internalType: 'address', type: 'address' },
          { name: 'stakerAddress', internalType: 'address', type: 'address' },
          { name: 'peerId', internalType: 'string', type: 'string' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'tier', internalType: 'uint8', type: 'uint8' },
          { name: 'roles', internalType: 'uint64[]', type: 'uint64[]' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'lastEditTime', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'nodeId', internalType: 'uint64', type: 'uint64' },
      { name: 'roleId', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'nodeHasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    name: 'nodes',
    outputs: [
      { name: 'id', internalType: 'uint64', type: 'uint64' },
      { name: 'nodeAddress', internalType: 'address', type: 'address' },
      { name: 'stakerAddress', internalType: 'address', type: 'address' },
      { name: 'peerId', internalType: 'string', type: 'string' },
      { name: 'active', internalType: 'bool', type: 'bool' },
      { name: 'tier', internalType: 'uint8', type: 'uint8' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
      { name: 'lastEditTime', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint64', type: 'uint64' },
      { name: '', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'nodesRoles',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'key', internalType: 'string', type: 'string' },
      { name: 'val', internalType: 'string', type: 'string' },
    ],
    name: 'setConfig',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nodeId', internalType: 'uint64', type: 'uint64' },
      { name: 'roleId', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'setNodeRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nodeId', internalType: 'uint64', type: 'uint64' },
      { name: 'tier', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'setTier',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'stakerAddressIds',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'stakerAddress', internalType: 'address', type: 'address' },
    ],
    name: 'stakerAddressInfo',
    outputs: [
      {
        name: 'node',
        internalType: 'struct IMuonNodeManager.Node',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint64', type: 'uint64' },
          { name: 'nodeAddress', internalType: 'address', type: 'address' },
          { name: 'stakerAddress', internalType: 'address', type: 'address' },
          { name: 'peerId', internalType: 'string', type: 'string' },
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'tier', internalType: 'uint8', type: 'uint8' },
          { name: 'roles', internalType: 'uint64[]', type: 'uint64[]' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          { name: 'lastEditTime', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nodeId', internalType: 'uint64', type: 'uint64' },
      { name: 'roleId', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'unsetNodeRole',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MuonNodeStaking
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const muonNodeStakingABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'staker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'ClaimUnstake',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakerAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'delegatee',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Delegated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'exitPendingPeriod',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ExitPendingPeriodUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'functionName',
        internalType: 'string',
        type: 'string',
        indexed: true,
      },
      { name: 'isPaused', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'FunctionPauseStatusChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'minStakeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MinStakeAmountUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'muonAppId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MuonAppIdUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'nodeAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'stakerAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'peerId',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'MuonNodeAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'muonPublicKey',
        internalType: 'struct MuonClientBase.PublicKey',
        type: 'tuple',
        components: [
          { name: 'x', internalType: 'uint256', type: 'uint256' },
          { name: 'parity', internalType: 'uint8', type: 'uint8' },
        ],
        indexed: false,
      },
    ],
    name: 'MuonPublicKeyUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'reqId', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'stakerAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardGot',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'periodStart',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: '_rewardPeriod',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardsDistributed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakerAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'locked', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'StakeLockStatusChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakerAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Staked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'multiplier',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakingTokenUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'tier', internalType: 'uint8', type: 'uint8', indexed: true },
      {
        name: 'maxStakeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TierMaxStakeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakerAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'delegatee',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Undelegated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stakerAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unstaked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'verifierAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'VerifierUpdated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DAO_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REWARD_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'UPDATE_STAKING_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nodeAddress', internalType: 'address', type: 'address' },
      { name: 'peerId', internalType: 'string', type: 'string' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addMuonNode',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nodeAddress', internalType: 'address', type: 'address' },
      { name: 'peerId', internalType: 'string', type: 'string' },
      { name: 'stakeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addMuonNodeByToken',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'bondedToken',
    outputs: [
      { name: '', internalType: 'contract IBondedToken', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'claimUnstake',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'stakerAddress', internalType: 'address', type: 'address' },
    ],
    name: 'deactiveMuonNode',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'delegateeStakers',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    name: 'distributeRewards',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'stakerAddress', internalType: 'address', type: 'address' },
    ],
    name: 'earned',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'exitPendingPeriod',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'functionPauseStatus',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'paidRewardPerToken', internalType: 'uint256', type: 'uint256' },
      { name: 'reqId', internalType: 'bytes', type: 'bytes' },
      {
        name: 'signature',
        internalType: 'struct MuonClientBase.SchnorrSign',
        type: 'tuple',
        components: [
          { name: 'signature', internalType: 'uint256', type: 'uint256' },
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'getReward',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_muonTokenAddress', internalType: 'address', type: 'address' },
      { name: '_nodeManagerAddress', internalType: 'address', type: 'address' },
      { name: '_muonAppId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_muonPublicKey',
        internalType: 'struct MuonClientBase.PublicKey',
        type: 'tuple',
        components: [
          { name: 'x', internalType: 'uint256', type: 'uint256' },
          { name: 'parity', internalType: 'uint8', type: 'uint8' },
        ],
      },
      { name: '_bondedTokenAddress', internalType: 'address', type: 'address' },
      { name: '_totalStaked', internalType: 'uint256', type: 'uint256' },
      { name: '_notPaidRewards', internalType: 'uint256', type: 'uint256' },
      { name: '_periodFinish', internalType: 'uint256', type: 'uint256' },
      { name: '_rewardRate', internalType: 'uint256', type: 'uint256' },
      { name: '_lastUpdateTime', internalType: 'uint256', type: 'uint256' },
      {
        name: '_rewardPerTokenStored',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isStakingToken',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastTimeRewardApplicable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastUpdateTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokens', internalType: 'address[]', type: 'address[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'lockToBondedToken',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'lockedStakes',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenIdA', internalType: 'uint256', type: 'uint256' }],
    name: 'mergeBondedTokens',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address[]', type: 'address[]' },
      { name: '_balance', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_paidReward', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: '_paidRewardPerToken',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: '_pendingRewards', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_tokenId', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_nodeAddress', internalType: 'address[]', type: 'address[]' },
      { name: '_peerId', internalType: 'string[]', type: 'string[]' },
    ],
    name: 'migrate',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'minStakeAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'muonAppId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'muonPublicKey',
    outputs: [
      { name: 'x', internalType: 'uint256', type: 'uint256' },
      { name: 'parity', internalType: 'uint8', type: 'uint8' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'muonToken',
    outputs: [
      { name: '', internalType: 'contract IERC20Upgradeable', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nodeManager',
    outputs: [
      { name: '', internalType: 'contract IMuonNodeManager', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'notPaidRewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'pendingUnstakes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'periodFinish',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'rewardPerToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'rewardPerTokenStored',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'rewardPeriod',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'rewardRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_staker', internalType: 'address', type: 'address' },
      { name: '_delegatee', internalType: 'address', type: 'address' },
    ],
    name: 'setDelegation',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_exitPendingPeriod', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setExitPendingPeriod',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'functionName', internalType: 'string', type: 'string' },
      { name: 'pauseStatus', internalType: 'bool', type: 'bool' },
    ],
    name: 'setFunctionPauseStatus',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_minStakeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setMinStakeAmount',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_muonAppId', internalType: 'uint256', type: 'uint256' }],
    name: 'setMuonAppId',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'stakerAddress', internalType: 'address', type: 'address' },
      { name: 'tier', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'setMuonNodeTier',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_muonPublicKey',
        internalType: 'struct MuonClientBase.PublicKey',
        type: 'tuple',
        components: [
          { name: 'x', internalType: 'uint256', type: 'uint256' },
          { name: 'parity', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
    name: 'setMuonPublicKey',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'period', internalType: 'uint256', type: 'uint256' }],
    name: 'setRewardPeriod',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'stakerAddress', internalType: 'address', type: 'address' },
      { name: 'lockStatus', internalType: 'bool', type: 'bool' },
    ],
    name: 'setStakeLockStatus',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tier', internalType: 'uint8', type: 'uint8' },
      { name: 'maxStakeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setTierMaxStakeAmount',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_verifierAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setVerifier',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'stakingTokens',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'stakingTokensMultiplier',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    name: 'tiersMaxStakeAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalStaked',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_delegatee', internalType: 'address', type: 'address' }],
    name: 'unsetDelegation',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'unstake',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'unstakeReqTimes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'updateStaking',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'updateStakingFor',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokens', internalType: 'address[]', type: 'address[]' },
      { name: 'multipliers', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'updateStakingTokens',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'users',
    outputs: [
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'paidReward', internalType: 'uint256', type: 'uint256' },
      { name: 'paidRewardPerToken', internalType: 'uint256', type: 'uint256' },
      { name: 'pendingRewards', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'valueOfBondedToken',
    outputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'verifier',
    outputs: [
      {
        name: '',
        internalType: 'contract SchnorrSECP256K1VerifierV2',
        type: 'address',
      },
    ],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OldToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const oldTokenABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINTER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PAUSER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PancakePair
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pancakePairABI = [
  {
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Burn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0In',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1In',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount0Out',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1Out',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Swap',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve0',
        internalType: 'uint112',
        type: 'uint112',
        indexed: false,
      },
      {
        name: 'reserve1',
        internalType: 'uint112',
        type: 'uint112',
        indexed: false,
      },
    ],
    name: 'Sync',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINIMUM_LIQUIDITY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'burn',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getReserves',
    outputs: [
      { name: '_reserve0', internalType: 'uint112', type: 'uint112' },
      { name: '_reserve1', internalType: 'uint112', type: 'uint112' },
      { name: '_blockTimestampLast', internalType: 'uint32', type: 'uint32' },
    ],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_token0', internalType: 'address', type: 'address' },
      { name: '_token1', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'kLast',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'mint',
    outputs: [{ name: 'liquidity', internalType: 'uint256', type: 'uint256' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'price0CumulativeLast',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'price1CumulativeLast',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'skim',
    outputs: [],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'amount0Out', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1Out', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'swap',
    outputs: [],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'sync',
    outputs: [],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token0',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token1',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Reward
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rewardABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_muonTokenAddress', internalType: 'address', type: 'address' },
      { name: '_bondedTokenAddress', internalType: 'address', type: 'address' },
      { name: '_signer', internalType: 'address', type: 'address' },
      { name: '_totalReward', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'claimer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'rewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'RewardClaimed',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'bondedToken',
    outputs: [
      { name: '', internalType: 'contract IBondedToken', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'rewardAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'claimReward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address[]', type: 'address[]' },
      { name: '_rewardAmount', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_tokenId', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'migrate',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'muonToken',
    outputs: [{ name: '', internalType: 'contract IToken', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_signer', internalType: 'address', type: 'address' }],
    name: 'setSigner',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'signer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalReward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'users',
    outputs: [
      { name: 'rewardAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__.
 */
export function useAliceRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: aliceABI, ...config } as UseContractReadConfig<
    typeof aliceABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`.
 */
export function useAliceDefaultAdminRole<
  TFunctionName extends 'DEFAULT_ADMIN_ROLE',
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aliceABI,
    functionName: 'DEFAULT_ADMIN_ROLE',
    ...config,
  } as UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"MINTER_ROLE"`.
 */
export function useAliceMinterRole<
  TFunctionName extends 'MINTER_ROLE',
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aliceABI,
    functionName: 'MINTER_ROLE',
    ...config,
  } as UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"PAUSER_ROLE"`.
 */
export function useAlicePauserRole<
  TFunctionName extends 'PAUSER_ROLE',
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aliceABI,
    functionName: 'PAUSER_ROLE',
    ...config,
  } as UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"allowance"`.
 */
export function useAliceAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aliceABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useAliceBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aliceABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"decimals"`.
 */
export function useAliceDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aliceABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"getRoleAdmin"`.
 */
export function useAliceGetRoleAdmin<
  TFunctionName extends 'getRoleAdmin',
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aliceABI,
    functionName: 'getRoleAdmin',
    ...config,
  } as UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"hasRole"`.
 */
export function useAliceHasRole<
  TFunctionName extends 'hasRole',
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aliceABI,
    functionName: 'hasRole',
    ...config,
  } as UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"name"`.
 */
export function useAliceName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aliceABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"paused"`.
 */
export function useAlicePaused<
  TFunctionName extends 'paused',
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aliceABI,
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useAliceSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aliceABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"symbol"`.
 */
export function useAliceSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aliceABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useAliceTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof aliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aliceABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof aliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__.
 */
export function useAliceWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof aliceABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof aliceABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, TFunctionName, TMode>({
    abi: aliceABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"approve"`.
 */
export function useAliceApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aliceABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof aliceABI, 'approve', TMode> & {
        abi?: never;
        functionName?: 'approve';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'approve', TMode>({
    abi: aliceABI,
    functionName: 'approve',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"burn"`.
 */
export function useAliceBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof aliceABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof aliceABI, 'burn', TMode> & {
        abi?: never;
        functionName?: 'burn';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'burn', TMode>({
    abi: aliceABI,
    functionName: 'burn',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"burnFrom"`.
 */
export function useAliceBurnFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aliceABI,
          'burnFrom'
        >['request']['abi'],
        'burnFrom',
        TMode
      > & { functionName?: 'burnFrom' }
    : UseContractWriteConfig<typeof aliceABI, 'burnFrom', TMode> & {
        abi?: never;
        functionName?: 'burnFrom';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'burnFrom', TMode>({
    abi: aliceABI,
    functionName: 'burnFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function useAliceDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aliceABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & { functionName?: 'decreaseAllowance' }
    : UseContractWriteConfig<typeof aliceABI, 'decreaseAllowance', TMode> & {
        abi?: never;
        functionName?: 'decreaseAllowance';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'decreaseAllowance', TMode>({
    abi: aliceABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"grantRole"`.
 */
export function useAliceGrantRole<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aliceABI,
          'grantRole'
        >['request']['abi'],
        'grantRole',
        TMode
      > & { functionName?: 'grantRole' }
    : UseContractWriteConfig<typeof aliceABI, 'grantRole', TMode> & {
        abi?: never;
        functionName?: 'grantRole';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'grantRole', TMode>({
    abi: aliceABI,
    functionName: 'grantRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function useAliceIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aliceABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & { functionName?: 'increaseAllowance' }
    : UseContractWriteConfig<typeof aliceABI, 'increaseAllowance', TMode> & {
        abi?: never;
        functionName?: 'increaseAllowance';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'increaseAllowance', TMode>({
    abi: aliceABI,
    functionName: 'increaseAllowance',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"initialize"`.
 */
export function useAliceInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aliceABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof aliceABI, 'initialize', TMode> & {
        abi?: never;
        functionName?: 'initialize';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'initialize', TMode>({
    abi: aliceABI,
    functionName: 'initialize',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"mint"`.
 */
export function useAliceMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof aliceABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof aliceABI, 'mint', TMode> & {
        abi?: never;
        functionName?: 'mint';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'mint', TMode>({
    abi: aliceABI,
    functionName: 'mint',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"pause"`.
 */
export function useAlicePause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof aliceABI, 'pause'>['request']['abi'],
        'pause',
        TMode
      > & { functionName?: 'pause' }
    : UseContractWriteConfig<typeof aliceABI, 'pause', TMode> & {
        abi?: never;
        functionName?: 'pause';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'pause', TMode>({
    abi: aliceABI,
    functionName: 'pause',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"renounceRole"`.
 */
export function useAliceRenounceRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aliceABI,
          'renounceRole'
        >['request']['abi'],
        'renounceRole',
        TMode
      > & { functionName?: 'renounceRole' }
    : UseContractWriteConfig<typeof aliceABI, 'renounceRole', TMode> & {
        abi?: never;
        functionName?: 'renounceRole';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'renounceRole', TMode>({
    abi: aliceABI,
    functionName: 'renounceRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"revokeRole"`.
 */
export function useAliceRevokeRole<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aliceABI,
          'revokeRole'
        >['request']['abi'],
        'revokeRole',
        TMode
      > & { functionName?: 'revokeRole' }
    : UseContractWriteConfig<typeof aliceABI, 'revokeRole', TMode> & {
        abi?: never;
        functionName?: 'revokeRole';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'revokeRole', TMode>({
    abi: aliceABI,
    functionName: 'revokeRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"transfer"`.
 */
export function useAliceTransfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aliceABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof aliceABI, 'transfer', TMode> & {
        abi?: never;
        functionName?: 'transfer';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'transfer', TMode>({
    abi: aliceABI,
    functionName: 'transfer',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useAliceTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aliceABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof aliceABI, 'transferFrom', TMode> & {
        abi?: never;
        functionName?: 'transferFrom';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'transferFrom', TMode>({
    abi: aliceABI,
    functionName: 'transferFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"unpause"`.
 */
export function useAliceUnpause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof aliceABI,
          'unpause'
        >['request']['abi'],
        'unpause',
        TMode
      > & { functionName?: 'unpause' }
    : UseContractWriteConfig<typeof aliceABI, 'unpause', TMode> & {
        abi?: never;
        functionName?: 'unpause';
      } = {} as any,
) {
  return useContractWrite<typeof aliceABI, 'unpause', TMode>({
    abi: aliceABI,
    functionName: 'unpause',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__.
 */
export function usePrepareAliceWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareAliceApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'approve'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareAliceBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'burn'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'burn'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"burnFrom"`.
 */
export function usePrepareAliceBurnFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'burnFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'burnFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'burnFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function usePrepareAliceDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'decreaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'decreaseAllowance'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"grantRole"`.
 */
export function usePrepareAliceGrantRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'grantRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'grantRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'grantRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function usePrepareAliceIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'increaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'increaseAllowance'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareAliceInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'initialize'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareAliceMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'mint'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"pause"`.
 */
export function usePrepareAlicePause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'pause'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'pause'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"renounceRole"`.
 */
export function usePrepareAliceRenounceRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'renounceRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'renounceRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'renounceRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"revokeRole"`.
 */
export function usePrepareAliceRevokeRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'revokeRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'revokeRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'revokeRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareAliceTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'transfer'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareAliceTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'transferFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link aliceABI}__ and `functionName` set to `"unpause"`.
 */
export function usePrepareAliceUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof aliceABI, 'unpause'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: aliceABI,
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof aliceABI, 'unpause'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aliceABI}__.
 */
export function useAliceEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof aliceABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: aliceABI,
    ...config,
  } as UseContractEventConfig<typeof aliceABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aliceABI}__ and `eventName` set to `"Approval"`.
 */
export function useAliceApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof aliceABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aliceABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof aliceABI, 'Approval'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aliceABI}__ and `eventName` set to `"Initialized"`.
 */
export function useAliceInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof aliceABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aliceABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof aliceABI, 'Initialized'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aliceABI}__ and `eventName` set to `"Paused"`.
 */
export function useAlicePausedEvent(
  config: Omit<
    UseContractEventConfig<typeof aliceABI, 'Paused'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aliceABI,
    eventName: 'Paused',
    ...config,
  } as UseContractEventConfig<typeof aliceABI, 'Paused'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aliceABI}__ and `eventName` set to `"RoleAdminChanged"`.
 */
export function useAliceRoleAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof aliceABI, 'RoleAdminChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aliceABI,
    eventName: 'RoleAdminChanged',
    ...config,
  } as UseContractEventConfig<typeof aliceABI, 'RoleAdminChanged'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aliceABI}__ and `eventName` set to `"RoleGranted"`.
 */
export function useAliceRoleGrantedEvent(
  config: Omit<
    UseContractEventConfig<typeof aliceABI, 'RoleGranted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aliceABI,
    eventName: 'RoleGranted',
    ...config,
  } as UseContractEventConfig<typeof aliceABI, 'RoleGranted'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aliceABI}__ and `eventName` set to `"RoleRevoked"`.
 */
export function useAliceRoleRevokedEvent(
  config: Omit<
    UseContractEventConfig<typeof aliceABI, 'RoleRevoked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aliceABI,
    eventName: 'RoleRevoked',
    ...config,
  } as UseContractEventConfig<typeof aliceABI, 'RoleRevoked'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aliceABI}__ and `eventName` set to `"Transfer"`.
 */
export function useAliceTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof aliceABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aliceABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof aliceABI, 'Transfer'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link aliceABI}__ and `eventName` set to `"Unpaused"`.
 */
export function useAliceUnpausedEvent(
  config: Omit<
    UseContractEventConfig<typeof aliceABI, 'Unpaused'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: aliceABI,
    eventName: 'Unpaused',
    ...config,
  } as UseContractEventConfig<typeof aliceABI, 'Unpaused'>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__.
 */
export function useBonAliceRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"BOOSTER_ROLE"`.
 */
export function useBonAliceBoosterRole<
  TFunctionName extends 'BOOSTER_ROLE',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'BOOSTER_ROLE',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`.
 */
export function useBonAliceDefaultAdminRole<
  TFunctionName extends 'DEFAULT_ADMIN_ROLE',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'DEFAULT_ADMIN_ROLE',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"TRANSFERABLE_ADDRESS_ROLE"`.
 */
export function useBonAliceTransferableAddressRole<
  TFunctionName extends 'TRANSFERABLE_ADDRESS_ROLE',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'TRANSFERABLE_ADDRESS_ROLE',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useBonAliceBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"baseToken"`.
 */
export function useBonAliceBaseToken<
  TFunctionName extends 'baseToken',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'baseToken',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"boostedBalance"`.
 */
export function useBonAliceBoostedBalance<
  TFunctionName extends 'boostedBalance',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'boostedBalance',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"getApproved"`.
 */
export function useBonAliceGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"getLockedOf"`.
 */
export function useBonAliceGetLockedOf<
  TFunctionName extends 'getLockedOf',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'getLockedOf',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"getRoleAdmin"`.
 */
export function useBonAliceGetRoleAdmin<
  TFunctionName extends 'getRoleAdmin',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'getRoleAdmin',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"hasRole"`.
 */
export function useBonAliceHasRole<
  TFunctionName extends 'hasRole',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'hasRole',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useBonAliceIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"isPublicTransferEnabled"`.
 */
export function useBonAliceIsPublicTransferEnabled<
  TFunctionName extends 'isPublicTransferEnabled',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'isPublicTransferEnabled',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"isTokenWhitelisted"`.
 */
export function useBonAliceIsTokenWhitelisted<
  TFunctionName extends 'isTokenWhitelisted',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'isTokenWhitelisted',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"lockedOf"`.
 */
export function useBonAliceLockedOf<
  TFunctionName extends 'lockedOf',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'lockedOf',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"mintedAt"`.
 */
export function useBonAliceMintedAt<
  TFunctionName extends 'mintedAt',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'mintedAt',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"name"`.
 */
export function useBonAliceName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"owner"`.
 */
export function useBonAliceOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useBonAliceOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"paused"`.
 */
export function useBonAlicePaused<
  TFunctionName extends 'paused',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useBonAliceSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"symbol"`.
 */
export function useBonAliceSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"tokenIdCounter"`.
 */
export function useBonAliceTokenIdCounter<
  TFunctionName extends 'tokenIdCounter',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'tokenIdCounter',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useBonAliceTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"tokensWhitelist"`.
 */
export function useBonAliceTokensWhitelist<
  TFunctionName extends 'tokensWhitelist',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'tokensWhitelist',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"totalLocked"`.
 */
export function useBonAliceTotalLocked<
  TFunctionName extends 'totalLocked',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'totalLocked',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"treasury"`.
 */
export function useBonAliceTreasury<
  TFunctionName extends 'treasury',
  TSelectData = ReadContractResult<typeof bonAliceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: bonAliceABI,
    functionName: 'treasury',
    ...config,
  } as UseContractReadConfig<typeof bonAliceABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__.
 */
export function useBonAliceWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof bonAliceABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, TFunctionName, TMode>({
    abi: bonAliceABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"addBoostedBalance"`.
 */
export function useBonAliceAddBoostedBalance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'addBoostedBalance'
        >['request']['abi'],
        'addBoostedBalance',
        TMode
      > & { functionName?: 'addBoostedBalance' }
    : UseContractWriteConfig<typeof bonAliceABI, 'addBoostedBalance', TMode> & {
        abi?: never;
        functionName?: 'addBoostedBalance';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'addBoostedBalance', TMode>({
    abi: bonAliceABI,
    functionName: 'addBoostedBalance',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"approve"`.
 */
export function useBonAliceApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof bonAliceABI, 'approve', TMode> & {
        abi?: never;
        functionName?: 'approve';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'approve', TMode>({
    abi: bonAliceABI,
    functionName: 'approve',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"burn"`.
 */
export function useBonAliceBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'burn'
        >['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof bonAliceABI, 'burn', TMode> & {
        abi?: never;
        functionName?: 'burn';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'burn', TMode>({
    abi: bonAliceABI,
    functionName: 'burn',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"grantRole"`.
 */
export function useBonAliceGrantRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'grantRole'
        >['request']['abi'],
        'grantRole',
        TMode
      > & { functionName?: 'grantRole' }
    : UseContractWriteConfig<typeof bonAliceABI, 'grantRole', TMode> & {
        abi?: never;
        functionName?: 'grantRole';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'grantRole', TMode>({
    abi: bonAliceABI,
    functionName: 'grantRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"initialize"`.
 */
export function useBonAliceInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof bonAliceABI, 'initialize', TMode> & {
        abi?: never;
        functionName?: 'initialize';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'initialize', TMode>({
    abi: bonAliceABI,
    functionName: 'initialize',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"lock"`.
 */
export function useBonAliceLock<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'lock'
        >['request']['abi'],
        'lock',
        TMode
      > & { functionName?: 'lock' }
    : UseContractWriteConfig<typeof bonAliceABI, 'lock', TMode> & {
        abi?: never;
        functionName?: 'lock';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'lock', TMode>({
    abi: bonAliceABI,
    functionName: 'lock',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"merge"`.
 */
export function useBonAliceMerge<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'merge'
        >['request']['abi'],
        'merge',
        TMode
      > & { functionName?: 'merge' }
    : UseContractWriteConfig<typeof bonAliceABI, 'merge', TMode> & {
        abi?: never;
        functionName?: 'merge';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'merge', TMode>({
    abi: bonAliceABI,
    functionName: 'merge',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"migrate"`.
 */
export function useBonAliceMigrate<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'migrate'
        >['request']['abi'],
        'migrate',
        TMode
      > & { functionName?: 'migrate' }
    : UseContractWriteConfig<typeof bonAliceABI, 'migrate', TMode> & {
        abi?: never;
        functionName?: 'migrate';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'migrate', TMode>({
    abi: bonAliceABI,
    functionName: 'migrate',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"mint"`.
 */
export function useBonAliceMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof bonAliceABI, 'mint', TMode> & {
        abi?: never;
        functionName?: 'mint';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'mint', TMode>({
    abi: bonAliceABI,
    functionName: 'mint',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"mintAndLock"`.
 */
export function useBonAliceMintAndLock<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'mintAndLock'
        >['request']['abi'],
        'mintAndLock',
        TMode
      > & { functionName?: 'mintAndLock' }
    : UseContractWriteConfig<typeof bonAliceABI, 'mintAndLock', TMode> & {
        abi?: never;
        functionName?: 'mintAndLock';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'mintAndLock', TMode>({
    abi: bonAliceABI,
    functionName: 'mintAndLock',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"pause"`.
 */
export function useBonAlicePause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'pause'
        >['request']['abi'],
        'pause',
        TMode
      > & { functionName?: 'pause' }
    : UseContractWriteConfig<typeof bonAliceABI, 'pause', TMode> & {
        abi?: never;
        functionName?: 'pause';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'pause', TMode>({
    abi: bonAliceABI,
    functionName: 'pause',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useBonAliceRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof bonAliceABI, 'renounceOwnership', TMode> & {
        abi?: never;
        functionName?: 'renounceOwnership';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'renounceOwnership', TMode>({
    abi: bonAliceABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"renounceRole"`.
 */
export function useBonAliceRenounceRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'renounceRole'
        >['request']['abi'],
        'renounceRole',
        TMode
      > & { functionName?: 'renounceRole' }
    : UseContractWriteConfig<typeof bonAliceABI, 'renounceRole', TMode> & {
        abi?: never;
        functionName?: 'renounceRole';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'renounceRole', TMode>({
    abi: bonAliceABI,
    functionName: 'renounceRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"revokeRole"`.
 */
export function useBonAliceRevokeRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'revokeRole'
        >['request']['abi'],
        'revokeRole',
        TMode
      > & { functionName?: 'revokeRole' }
    : UseContractWriteConfig<typeof bonAliceABI, 'revokeRole', TMode> & {
        abi?: never;
        functionName?: 'revokeRole';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'revokeRole', TMode>({
    abi: bonAliceABI,
    functionName: 'revokeRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useBonAliceSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof bonAliceABI, 'safeTransferFrom', TMode> & {
        abi?: never;
        functionName?: 'safeTransferFrom';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'safeTransferFrom', TMode>({
    abi: bonAliceABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useBonAliceSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof bonAliceABI, 'setApprovalForAll', TMode> & {
        abi?: never;
        functionName?: 'setApprovalForAll';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'setApprovalForAll', TMode>({
    abi: bonAliceABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"setPublicTransfer"`.
 */
export function useBonAliceSetPublicTransfer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'setPublicTransfer'
        >['request']['abi'],
        'setPublicTransfer',
        TMode
      > & { functionName?: 'setPublicTransfer' }
    : UseContractWriteConfig<typeof bonAliceABI, 'setPublicTransfer', TMode> & {
        abi?: never;
        functionName?: 'setPublicTransfer';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'setPublicTransfer', TMode>({
    abi: bonAliceABI,
    functionName: 'setPublicTransfer',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"setTreasury"`.
 */
export function useBonAliceSetTreasury<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'setTreasury'
        >['request']['abi'],
        'setTreasury',
        TMode
      > & { functionName?: 'setTreasury' }
    : UseContractWriteConfig<typeof bonAliceABI, 'setTreasury', TMode> & {
        abi?: never;
        functionName?: 'setTreasury';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'setTreasury', TMode>({
    abi: bonAliceABI,
    functionName: 'setTreasury',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useBonAliceTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof bonAliceABI, 'transferFrom', TMode> & {
        abi?: never;
        functionName?: 'transferFrom';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'transferFrom', TMode>({
    abi: bonAliceABI,
    functionName: 'transferFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useBonAliceTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof bonAliceABI, 'transferOwnership', TMode> & {
        abi?: never;
        functionName?: 'transferOwnership';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'transferOwnership', TMode>({
    abi: bonAliceABI,
    functionName: 'transferOwnership',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"unpause"`.
 */
export function useBonAliceUnpause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'unpause'
        >['request']['abi'],
        'unpause',
        TMode
      > & { functionName?: 'unpause' }
    : UseContractWriteConfig<typeof bonAliceABI, 'unpause', TMode> & {
        abi?: never;
        functionName?: 'unpause';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'unpause', TMode>({
    abi: bonAliceABI,
    functionName: 'unpause',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"whitelistTokens"`.
 */
export function useBonAliceWhitelistTokens<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bonAliceABI,
          'whitelistTokens'
        >['request']['abi'],
        'whitelistTokens',
        TMode
      > & { functionName?: 'whitelistTokens' }
    : UseContractWriteConfig<typeof bonAliceABI, 'whitelistTokens', TMode> & {
        abi?: never;
        functionName?: 'whitelistTokens';
      } = {} as any,
) {
  return useContractWrite<typeof bonAliceABI, 'whitelistTokens', TMode>({
    abi: bonAliceABI,
    functionName: 'whitelistTokens',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__.
 */
export function usePrepareBonAliceWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"addBoostedBalance"`.
 */
export function usePrepareBonAliceAddBoostedBalance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'addBoostedBalance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'addBoostedBalance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'addBoostedBalance'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareBonAliceApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'approve'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareBonAliceBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'burn'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'burn'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"grantRole"`.
 */
export function usePrepareBonAliceGrantRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'grantRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'grantRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'grantRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareBonAliceInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'initialize'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"lock"`.
 */
export function usePrepareBonAliceLock(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'lock'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'lock',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'lock'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"merge"`.
 */
export function usePrepareBonAliceMerge(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'merge'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'merge',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'merge'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"migrate"`.
 */
export function usePrepareBonAliceMigrate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'migrate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'migrate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'migrate'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareBonAliceMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'mint'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"mintAndLock"`.
 */
export function usePrepareBonAliceMintAndLock(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'mintAndLock'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'mintAndLock',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'mintAndLock'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"pause"`.
 */
export function usePrepareBonAlicePause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'pause'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'pause'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareBonAliceRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'renounceOwnership'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"renounceRole"`.
 */
export function usePrepareBonAliceRenounceRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'renounceRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'renounceRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'renounceRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"revokeRole"`.
 */
export function usePrepareBonAliceRevokeRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'revokeRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'revokeRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'revokeRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareBonAliceSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'safeTransferFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareBonAliceSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'setApprovalForAll'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"setPublicTransfer"`.
 */
export function usePrepareBonAliceSetPublicTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'setPublicTransfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'setPublicTransfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'setPublicTransfer'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"setTreasury"`.
 */
export function usePrepareBonAliceSetTreasury(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'setTreasury'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'setTreasury',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'setTreasury'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareBonAliceTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'transferFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareBonAliceTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'transferOwnership'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"unpause"`.
 */
export function usePrepareBonAliceUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'unpause'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'unpause'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bonAliceABI}__ and `functionName` set to `"whitelistTokens"`.
 */
export function usePrepareBonAliceWhitelistTokens(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bonAliceABI, 'whitelistTokens'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: bonAliceABI,
    functionName: 'whitelistTokens',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bonAliceABI, 'whitelistTokens'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__.
 */
export function useBonAliceEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"Approval"`.
 */
export function useBonAliceApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'Approval'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useBonAliceApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'ApprovalForAll'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"Initialized"`.
 */
export function useBonAliceInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'Initialized'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"Locked"`.
 */
export function useBonAliceLockedEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'Locked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'Locked',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'Locked'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"Merged"`.
 */
export function useBonAliceMergedEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'Merged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'Merged',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'Merged'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useBonAliceOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'OwnershipTransferred'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"Paused"`.
 */
export function useBonAlicePausedEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'Paused'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'Paused',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'Paused'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"PublicTransferStatusUpdated"`.
 */
export function useBonAlicePublicTransferStatusUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'PublicTransferStatusUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'PublicTransferStatusUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof bonAliceABI,
    'PublicTransferStatusUpdated'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"RoleAdminChanged"`.
 */
export function useBonAliceRoleAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'RoleAdminChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'RoleAdminChanged',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'RoleAdminChanged'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"RoleGranted"`.
 */
export function useBonAliceRoleGrantedEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'RoleGranted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'RoleGranted',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'RoleGranted'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"RoleRevoked"`.
 */
export function useBonAliceRoleRevokedEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'RoleRevoked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'RoleRevoked',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'RoleRevoked'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"Splited"`.
 */
export function useBonAliceSplitedEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'Splited'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'Splited',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'Splited'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"Transfer"`.
 */
export function useBonAliceTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'Transfer'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"TreasuryUpdated"`.
 */
export function useBonAliceTreasuryUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'TreasuryUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'TreasuryUpdated',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'TreasuryUpdated'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"Unpaused"`.
 */
export function useBonAliceUnpausedEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'Unpaused'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'Unpaused',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'Unpaused'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bonAliceABI}__ and `eventName` set to `"WhitelistTokensUpdated"`.
 */
export function useBonAliceWhitelistTokensUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof bonAliceABI, 'WhitelistTokensUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: bonAliceABI,
    eventName: 'WhitelistTokensUpdated',
    ...config,
  } as UseContractEventConfig<typeof bonAliceABI, 'WhitelistTokensUpdated'>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boosterABI}__.
 */
export function useBoosterRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof boosterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: boosterABI,
    ...config,
  } as UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"bondedToken"`.
 */
export function useBoosterBondedToken<
  TFunctionName extends 'bondedToken',
  TSelectData = ReadContractResult<typeof boosterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boosterABI,
    functionName: 'bondedToken',
    ...config,
  } as UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"boostValue"`.
 */
export function useBoosterBoostValue<
  TFunctionName extends 'boostValue',
  TSelectData = ReadContractResult<typeof boosterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boosterABI,
    functionName: 'boostValue',
    ...config,
  } as UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"getBoostableAmount"`.
 */
export function useBoosterGetBoostableAmount<
  TFunctionName extends 'getBoostableAmount',
  TSelectData = ReadContractResult<typeof boosterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boosterABI,
    functionName: 'getBoostableAmount',
    ...config,
  } as UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"muonToken"`.
 */
export function useBoosterMuonToken<
  TFunctionName extends 'muonToken',
  TSelectData = ReadContractResult<typeof boosterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boosterABI,
    functionName: 'muonToken',
    ...config,
  } as UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"owner"`.
 */
export function useBoosterOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof boosterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boosterABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"signatureValidityPeriod"`.
 */
export function useBoosterSignatureValidityPeriod<
  TFunctionName extends 'signatureValidityPeriod',
  TSelectData = ReadContractResult<typeof boosterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boosterABI,
    functionName: 'signatureValidityPeriod',
    ...config,
  } as UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"signer"`.
 */
export function useBoosterSigner<
  TFunctionName extends 'signer',
  TSelectData = ReadContractResult<typeof boosterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boosterABI,
    functionName: 'signer',
    ...config,
  } as UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"tolerancePercentage"`.
 */
export function useBoosterTolerancePercentage<
  TFunctionName extends 'tolerancePercentage',
  TSelectData = ReadContractResult<typeof boosterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boosterABI,
    functionName: 'tolerancePercentage',
    ...config,
  } as UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"treasury"`.
 */
export function useBoosterTreasury<
  TFunctionName extends 'treasury',
  TSelectData = ReadContractResult<typeof boosterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boosterABI,
    functionName: 'treasury',
    ...config,
  } as UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"uniswapV2Pair"`.
 */
export function useBoosterUniswapV2Pair<
  TFunctionName extends 'uniswapV2Pair',
  TSelectData = ReadContractResult<typeof boosterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boosterABI,
    functionName: 'uniswapV2Pair',
    ...config,
  } as UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"usdcToken"`.
 */
export function useBoosterUsdcToken<
  TFunctionName extends 'usdcToken',
  TSelectData = ReadContractResult<typeof boosterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boosterABI,
    functionName: 'usdcToken',
    ...config,
  } as UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"validateAmount"`.
 */
export function useBoosterValidateAmount<
  TFunctionName extends 'validateAmount',
  TSelectData = ReadContractResult<typeof boosterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: boosterABI,
    functionName: 'validateAmount',
    ...config,
  } as UseContractReadConfig<typeof boosterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boosterABI}__.
 */
export function useBoosterWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof boosterABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof boosterABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof boosterABI, TFunctionName, TMode>({
    abi: boosterABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"adminWithdraw"`.
 */
export function useBoosterAdminWithdraw<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boosterABI,
          'adminWithdraw'
        >['request']['abi'],
        'adminWithdraw',
        TMode
      > & { functionName?: 'adminWithdraw' }
    : UseContractWriteConfig<typeof boosterABI, 'adminWithdraw', TMode> & {
        abi?: never;
        functionName?: 'adminWithdraw';
      } = {} as any,
) {
  return useContractWrite<typeof boosterABI, 'adminWithdraw', TMode>({
    abi: boosterABI,
    functionName: 'adminWithdraw',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"boost"`.
 */
export function useBoosterBoost<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boosterABI,
          'boost'
        >['request']['abi'],
        'boost',
        TMode
      > & { functionName?: 'boost' }
    : UseContractWriteConfig<typeof boosterABI, 'boost', TMode> & {
        abi?: never;
        functionName?: 'boost';
      } = {} as any,
) {
  return useContractWrite<typeof boosterABI, 'boost', TMode>({
    abi: boosterABI,
    functionName: 'boost',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"createAndBoost"`.
 */
export function useBoosterCreateAndBoost<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boosterABI,
          'createAndBoost'
        >['request']['abi'],
        'createAndBoost',
        TMode
      > & { functionName?: 'createAndBoost' }
    : UseContractWriteConfig<typeof boosterABI, 'createAndBoost', TMode> & {
        abi?: never;
        functionName?: 'createAndBoost';
      } = {} as any,
) {
  return useContractWrite<typeof boosterABI, 'createAndBoost', TMode>({
    abi: boosterABI,
    functionName: 'createAndBoost',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useBoosterRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boosterABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof boosterABI, 'renounceOwnership', TMode> & {
        abi?: never;
        functionName?: 'renounceOwnership';
      } = {} as any,
) {
  return useContractWrite<typeof boosterABI, 'renounceOwnership', TMode>({
    abi: boosterABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"setBoostValue"`.
 */
export function useBoosterSetBoostValue<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boosterABI,
          'setBoostValue'
        >['request']['abi'],
        'setBoostValue',
        TMode
      > & { functionName?: 'setBoostValue' }
    : UseContractWriteConfig<typeof boosterABI, 'setBoostValue', TMode> & {
        abi?: never;
        functionName?: 'setBoostValue';
      } = {} as any,
) {
  return useContractWrite<typeof boosterABI, 'setBoostValue', TMode>({
    abi: boosterABI,
    functionName: 'setBoostValue',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"setSignatureValidityPeriod"`.
 */
export function useBoosterSetSignatureValidityPeriod<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boosterABI,
          'setSignatureValidityPeriod'
        >['request']['abi'],
        'setSignatureValidityPeriod',
        TMode
      > & { functionName?: 'setSignatureValidityPeriod' }
    : UseContractWriteConfig<
        typeof boosterABI,
        'setSignatureValidityPeriod',
        TMode
      > & {
        abi?: never;
        functionName?: 'setSignatureValidityPeriod';
      } = {} as any,
) {
  return useContractWrite<
    typeof boosterABI,
    'setSignatureValidityPeriod',
    TMode
  >({
    abi: boosterABI,
    functionName: 'setSignatureValidityPeriod',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"setSigner"`.
 */
export function useBoosterSetSigner<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boosterABI,
          'setSigner'
        >['request']['abi'],
        'setSigner',
        TMode
      > & { functionName?: 'setSigner' }
    : UseContractWriteConfig<typeof boosterABI, 'setSigner', TMode> & {
        abi?: never;
        functionName?: 'setSigner';
      } = {} as any,
) {
  return useContractWrite<typeof boosterABI, 'setSigner', TMode>({
    abi: boosterABI,
    functionName: 'setSigner',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"setTokenInfo"`.
 */
export function useBoosterSetTokenInfo<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boosterABI,
          'setTokenInfo'
        >['request']['abi'],
        'setTokenInfo',
        TMode
      > & { functionName?: 'setTokenInfo' }
    : UseContractWriteConfig<typeof boosterABI, 'setTokenInfo', TMode> & {
        abi?: never;
        functionName?: 'setTokenInfo';
      } = {} as any,
) {
  return useContractWrite<typeof boosterABI, 'setTokenInfo', TMode>({
    abi: boosterABI,
    functionName: 'setTokenInfo',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"setTolerancePercentage"`.
 */
export function useBoosterSetTolerancePercentage<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boosterABI,
          'setTolerancePercentage'
        >['request']['abi'],
        'setTolerancePercentage',
        TMode
      > & { functionName?: 'setTolerancePercentage' }
    : UseContractWriteConfig<
        typeof boosterABI,
        'setTolerancePercentage',
        TMode
      > & {
        abi?: never;
        functionName?: 'setTolerancePercentage';
      } = {} as any,
) {
  return useContractWrite<typeof boosterABI, 'setTolerancePercentage', TMode>({
    abi: boosterABI,
    functionName: 'setTolerancePercentage',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"setTreasury"`.
 */
export function useBoosterSetTreasury<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boosterABI,
          'setTreasury'
        >['request']['abi'],
        'setTreasury',
        TMode
      > & { functionName?: 'setTreasury' }
    : UseContractWriteConfig<typeof boosterABI, 'setTreasury', TMode> & {
        abi?: never;
        functionName?: 'setTreasury';
      } = {} as any,
) {
  return useContractWrite<typeof boosterABI, 'setTreasury', TMode>({
    abi: boosterABI,
    functionName: 'setTreasury',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useBoosterTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boosterABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof boosterABI, 'transferOwnership', TMode> & {
        abi?: never;
        functionName?: 'transferOwnership';
      } = {} as any,
) {
  return useContractWrite<typeof boosterABI, 'transferOwnership', TMode>({
    abi: boosterABI,
    functionName: 'transferOwnership',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boosterABI}__.
 */
export function usePrepareBoosterWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boosterABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boosterABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof boosterABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"adminWithdraw"`.
 */
export function usePrepareBoosterAdminWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boosterABI, 'adminWithdraw'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boosterABI,
    functionName: 'adminWithdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boosterABI, 'adminWithdraw'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"boost"`.
 */
export function usePrepareBoosterBoost(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boosterABI, 'boost'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boosterABI,
    functionName: 'boost',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boosterABI, 'boost'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"createAndBoost"`.
 */
export function usePrepareBoosterCreateAndBoost(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boosterABI, 'createAndBoost'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boosterABI,
    functionName: 'createAndBoost',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boosterABI, 'createAndBoost'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareBoosterRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boosterABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boosterABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boosterABI, 'renounceOwnership'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"setBoostValue"`.
 */
export function usePrepareBoosterSetBoostValue(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boosterABI, 'setBoostValue'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boosterABI,
    functionName: 'setBoostValue',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boosterABI, 'setBoostValue'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"setSignatureValidityPeriod"`.
 */
export function usePrepareBoosterSetSignatureValidityPeriod(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof boosterABI,
      'setSignatureValidityPeriod'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boosterABI,
    functionName: 'setSignatureValidityPeriod',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof boosterABI,
    'setSignatureValidityPeriod'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"setSigner"`.
 */
export function usePrepareBoosterSetSigner(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boosterABI, 'setSigner'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boosterABI,
    functionName: 'setSigner',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boosterABI, 'setSigner'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"setTokenInfo"`.
 */
export function usePrepareBoosterSetTokenInfo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boosterABI, 'setTokenInfo'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boosterABI,
    functionName: 'setTokenInfo',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boosterABI, 'setTokenInfo'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"setTolerancePercentage"`.
 */
export function usePrepareBoosterSetTolerancePercentage(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boosterABI, 'setTolerancePercentage'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boosterABI,
    functionName: 'setTolerancePercentage',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof boosterABI,
    'setTolerancePercentage'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"setTreasury"`.
 */
export function usePrepareBoosterSetTreasury(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boosterABI, 'setTreasury'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boosterABI,
    functionName: 'setTreasury',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boosterABI, 'setTreasury'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boosterABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareBoosterTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boosterABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boosterABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boosterABI, 'transferOwnership'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link boosterABI}__.
 */
export function useBoosterEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof boosterABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: boosterABI,
    ...config,
  } as UseContractEventConfig<typeof boosterABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link boosterABI}__ and `eventName` set to `"Boosted"`.
 */
export function useBoosterBoostedEvent(
  config: Omit<
    UseContractEventConfig<typeof boosterABI, 'Boosted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: boosterABI,
    eventName: 'Boosted',
    ...config,
  } as UseContractEventConfig<typeof boosterABI, 'Boosted'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link boosterABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useBoosterOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof boosterABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: boosterABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof boosterABI, 'OwnershipTransferred'>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__.
 */
export function useLpTokenRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"CANCEL_AUTHORIZATION_TYPEHASH"`.
 */
export function useLpTokenCancelAuthorizationTypehash<
  TFunctionName extends 'CANCEL_AUTHORIZATION_TYPEHASH',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'CANCEL_AUTHORIZATION_TYPEHASH',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 */
export function useLpTokenDomainSeparator<
  TFunctionName extends 'DOMAIN_SEPARATOR',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'DOMAIN_SEPARATOR',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"PERMIT_TYPEHASH"`.
 */
export function useLpTokenPermitTypehash<
  TFunctionName extends 'PERMIT_TYPEHASH',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'PERMIT_TYPEHASH',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"RECEIVE_WITH_AUTHORIZATION_TYPEHASH"`.
 */
export function useLpTokenReceiveWithAuthorizationTypehash<
  TFunctionName extends 'RECEIVE_WITH_AUTHORIZATION_TYPEHASH',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'RECEIVE_WITH_AUTHORIZATION_TYPEHASH',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"TRANSFER_WITH_AUTHORIZATION_TYPEHASH"`.
 */
export function useLpTokenTransferWithAuthorizationTypehash<
  TFunctionName extends 'TRANSFER_WITH_AUTHORIZATION_TYPEHASH',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'TRANSFER_WITH_AUTHORIZATION_TYPEHASH',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"allowance"`.
 */
export function useLpTokenAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"authorizationState"`.
 */
export function useLpTokenAuthorizationState<
  TFunctionName extends 'authorizationState',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'authorizationState',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useLpTokenBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"blacklister"`.
 */
export function useLpTokenBlacklister<
  TFunctionName extends 'blacklister',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'blacklister',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"currency"`.
 */
export function useLpTokenCurrency<
  TFunctionName extends 'currency',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'currency',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"decimals"`.
 */
export function useLpTokenDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"isBlacklisted"`.
 */
export function useLpTokenIsBlacklisted<
  TFunctionName extends 'isBlacklisted',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'isBlacklisted',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"isMinter"`.
 */
export function useLpTokenIsMinter<
  TFunctionName extends 'isMinter',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'isMinter',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"masterMinter"`.
 */
export function useLpTokenMasterMinter<
  TFunctionName extends 'masterMinter',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'masterMinter',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"minterAllowance"`.
 */
export function useLpTokenMinterAllowance<
  TFunctionName extends 'minterAllowance',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'minterAllowance',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"name"`.
 */
export function useLpTokenName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"nonces"`.
 */
export function useLpTokenNonces<
  TFunctionName extends 'nonces',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'nonces',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"owner"`.
 */
export function useLpTokenOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"paused"`.
 */
export function useLpTokenPaused<
  TFunctionName extends 'paused',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"pauser"`.
 */
export function useLpTokenPauser<
  TFunctionName extends 'pauser',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'pauser',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"rescuer"`.
 */
export function useLpTokenRescuer<
  TFunctionName extends 'rescuer',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'rescuer',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"symbol"`.
 */
export function useLpTokenSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useLpTokenTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"version"`.
 */
export function useLpTokenVersion<
  TFunctionName extends 'version',
  TSelectData = ReadContractResult<typeof lpTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lpTokenABI,
    functionName: 'version',
    ...config,
  } as UseContractReadConfig<typeof lpTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__.
 */
export function useLpTokenWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lpTokenABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof lpTokenABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, TFunctionName, TMode>({
    abi: lpTokenABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"approve"`.
 */
export function useLpTokenApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof lpTokenABI, 'approve', TMode> & {
        abi?: never;
        functionName?: 'approve';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'approve', TMode>({
    abi: lpTokenABI,
    functionName: 'approve',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"blacklist"`.
 */
export function useLpTokenBlacklist<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'blacklist'
        >['request']['abi'],
        'blacklist',
        TMode
      > & { functionName?: 'blacklist' }
    : UseContractWriteConfig<typeof lpTokenABI, 'blacklist', TMode> & {
        abi?: never;
        functionName?: 'blacklist';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'blacklist', TMode>({
    abi: lpTokenABI,
    functionName: 'blacklist',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"burn"`.
 */
export function useLpTokenBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lpTokenABI, 'burn'>['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof lpTokenABI, 'burn', TMode> & {
        abi?: never;
        functionName?: 'burn';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'burn', TMode>({
    abi: lpTokenABI,
    functionName: 'burn',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"cancelAuthorization"`.
 */
export function useLpTokenCancelAuthorization<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'cancelAuthorization'
        >['request']['abi'],
        'cancelAuthorization',
        TMode
      > & { functionName?: 'cancelAuthorization' }
    : UseContractWriteConfig<
        typeof lpTokenABI,
        'cancelAuthorization',
        TMode
      > & {
        abi?: never;
        functionName?: 'cancelAuthorization';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'cancelAuthorization', TMode>({
    abi: lpTokenABI,
    functionName: 'cancelAuthorization',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"configureMinter"`.
 */
export function useLpTokenConfigureMinter<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'configureMinter'
        >['request']['abi'],
        'configureMinter',
        TMode
      > & { functionName?: 'configureMinter' }
    : UseContractWriteConfig<typeof lpTokenABI, 'configureMinter', TMode> & {
        abi?: never;
        functionName?: 'configureMinter';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'configureMinter', TMode>({
    abi: lpTokenABI,
    functionName: 'configureMinter',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function useLpTokenDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & { functionName?: 'decreaseAllowance' }
    : UseContractWriteConfig<typeof lpTokenABI, 'decreaseAllowance', TMode> & {
        abi?: never;
        functionName?: 'decreaseAllowance';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'decreaseAllowance', TMode>({
    abi: lpTokenABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function useLpTokenIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & { functionName?: 'increaseAllowance' }
    : UseContractWriteConfig<typeof lpTokenABI, 'increaseAllowance', TMode> & {
        abi?: never;
        functionName?: 'increaseAllowance';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'increaseAllowance', TMode>({
    abi: lpTokenABI,
    functionName: 'increaseAllowance',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"initialize"`.
 */
export function useLpTokenInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof lpTokenABI, 'initialize', TMode> & {
        abi?: never;
        functionName?: 'initialize';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'initialize', TMode>({
    abi: lpTokenABI,
    functionName: 'initialize',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"initializeV2"`.
 */
export function useLpTokenInitializeV2<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'initializeV2'
        >['request']['abi'],
        'initializeV2',
        TMode
      > & { functionName?: 'initializeV2' }
    : UseContractWriteConfig<typeof lpTokenABI, 'initializeV2', TMode> & {
        abi?: never;
        functionName?: 'initializeV2';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'initializeV2', TMode>({
    abi: lpTokenABI,
    functionName: 'initializeV2',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"initializeV2_1"`.
 */
export function useLpTokenInitializeV2_1<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'initializeV2_1'
        >['request']['abi'],
        'initializeV2_1',
        TMode
      > & { functionName?: 'initializeV2_1' }
    : UseContractWriteConfig<typeof lpTokenABI, 'initializeV2_1', TMode> & {
        abi?: never;
        functionName?: 'initializeV2_1';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'initializeV2_1', TMode>({
    abi: lpTokenABI,
    functionName: 'initializeV2_1',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"mint"`.
 */
export function useLpTokenMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lpTokenABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof lpTokenABI, 'mint', TMode> & {
        abi?: never;
        functionName?: 'mint';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'mint', TMode>({
    abi: lpTokenABI,
    functionName: 'mint',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"pause"`.
 */
export function useLpTokenPause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'pause'
        >['request']['abi'],
        'pause',
        TMode
      > & { functionName?: 'pause' }
    : UseContractWriteConfig<typeof lpTokenABI, 'pause', TMode> & {
        abi?: never;
        functionName?: 'pause';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'pause', TMode>({
    abi: lpTokenABI,
    functionName: 'pause',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"permit"`.
 */
export function useLpTokenPermit<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'permit'
        >['request']['abi'],
        'permit',
        TMode
      > & { functionName?: 'permit' }
    : UseContractWriteConfig<typeof lpTokenABI, 'permit', TMode> & {
        abi?: never;
        functionName?: 'permit';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'permit', TMode>({
    abi: lpTokenABI,
    functionName: 'permit',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"receiveWithAuthorization"`.
 */
export function useLpTokenReceiveWithAuthorization<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'receiveWithAuthorization'
        >['request']['abi'],
        'receiveWithAuthorization',
        TMode
      > & { functionName?: 'receiveWithAuthorization' }
    : UseContractWriteConfig<
        typeof lpTokenABI,
        'receiveWithAuthorization',
        TMode
      > & {
        abi?: never;
        functionName?: 'receiveWithAuthorization';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'receiveWithAuthorization', TMode>(
    {
      abi: lpTokenABI,
      functionName: 'receiveWithAuthorization',
      ...config,
    } as any,
  );
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"removeMinter"`.
 */
export function useLpTokenRemoveMinter<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'removeMinter'
        >['request']['abi'],
        'removeMinter',
        TMode
      > & { functionName?: 'removeMinter' }
    : UseContractWriteConfig<typeof lpTokenABI, 'removeMinter', TMode> & {
        abi?: never;
        functionName?: 'removeMinter';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'removeMinter', TMode>({
    abi: lpTokenABI,
    functionName: 'removeMinter',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"rescueERC20"`.
 */
export function useLpTokenRescueErc20<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'rescueERC20'
        >['request']['abi'],
        'rescueERC20',
        TMode
      > & { functionName?: 'rescueERC20' }
    : UseContractWriteConfig<typeof lpTokenABI, 'rescueERC20', TMode> & {
        abi?: never;
        functionName?: 'rescueERC20';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'rescueERC20', TMode>({
    abi: lpTokenABI,
    functionName: 'rescueERC20',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"transfer"`.
 */
export function useLpTokenTransfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof lpTokenABI, 'transfer', TMode> & {
        abi?: never;
        functionName?: 'transfer';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'transfer', TMode>({
    abi: lpTokenABI,
    functionName: 'transfer',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useLpTokenTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof lpTokenABI, 'transferFrom', TMode> & {
        abi?: never;
        functionName?: 'transferFrom';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'transferFrom', TMode>({
    abi: lpTokenABI,
    functionName: 'transferFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useLpTokenTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof lpTokenABI, 'transferOwnership', TMode> & {
        abi?: never;
        functionName?: 'transferOwnership';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'transferOwnership', TMode>({
    abi: lpTokenABI,
    functionName: 'transferOwnership',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"transferWithAuthorization"`.
 */
export function useLpTokenTransferWithAuthorization<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'transferWithAuthorization'
        >['request']['abi'],
        'transferWithAuthorization',
        TMode
      > & { functionName?: 'transferWithAuthorization' }
    : UseContractWriteConfig<
        typeof lpTokenABI,
        'transferWithAuthorization',
        TMode
      > & {
        abi?: never;
        functionName?: 'transferWithAuthorization';
      } = {} as any,
) {
  return useContractWrite<
    typeof lpTokenABI,
    'transferWithAuthorization',
    TMode
  >({
    abi: lpTokenABI,
    functionName: 'transferWithAuthorization',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"unBlacklist"`.
 */
export function useLpTokenUnBlacklist<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'unBlacklist'
        >['request']['abi'],
        'unBlacklist',
        TMode
      > & { functionName?: 'unBlacklist' }
    : UseContractWriteConfig<typeof lpTokenABI, 'unBlacklist', TMode> & {
        abi?: never;
        functionName?: 'unBlacklist';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'unBlacklist', TMode>({
    abi: lpTokenABI,
    functionName: 'unBlacklist',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"unpause"`.
 */
export function useLpTokenUnpause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'unpause'
        >['request']['abi'],
        'unpause',
        TMode
      > & { functionName?: 'unpause' }
    : UseContractWriteConfig<typeof lpTokenABI, 'unpause', TMode> & {
        abi?: never;
        functionName?: 'unpause';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'unpause', TMode>({
    abi: lpTokenABI,
    functionName: 'unpause',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"updateBlacklister"`.
 */
export function useLpTokenUpdateBlacklister<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'updateBlacklister'
        >['request']['abi'],
        'updateBlacklister',
        TMode
      > & { functionName?: 'updateBlacklister' }
    : UseContractWriteConfig<typeof lpTokenABI, 'updateBlacklister', TMode> & {
        abi?: never;
        functionName?: 'updateBlacklister';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'updateBlacklister', TMode>({
    abi: lpTokenABI,
    functionName: 'updateBlacklister',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"updateMasterMinter"`.
 */
export function useLpTokenUpdateMasterMinter<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'updateMasterMinter'
        >['request']['abi'],
        'updateMasterMinter',
        TMode
      > & { functionName?: 'updateMasterMinter' }
    : UseContractWriteConfig<typeof lpTokenABI, 'updateMasterMinter', TMode> & {
        abi?: never;
        functionName?: 'updateMasterMinter';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'updateMasterMinter', TMode>({
    abi: lpTokenABI,
    functionName: 'updateMasterMinter',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"updatePauser"`.
 */
export function useLpTokenUpdatePauser<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'updatePauser'
        >['request']['abi'],
        'updatePauser',
        TMode
      > & { functionName?: 'updatePauser' }
    : UseContractWriteConfig<typeof lpTokenABI, 'updatePauser', TMode> & {
        abi?: never;
        functionName?: 'updatePauser';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'updatePauser', TMode>({
    abi: lpTokenABI,
    functionName: 'updatePauser',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"updateRescuer"`.
 */
export function useLpTokenUpdateRescuer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lpTokenABI,
          'updateRescuer'
        >['request']['abi'],
        'updateRescuer',
        TMode
      > & { functionName?: 'updateRescuer' }
    : UseContractWriteConfig<typeof lpTokenABI, 'updateRescuer', TMode> & {
        abi?: never;
        functionName?: 'updateRescuer';
      } = {} as any,
) {
  return useContractWrite<typeof lpTokenABI, 'updateRescuer', TMode>({
    abi: lpTokenABI,
    functionName: 'updateRescuer',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__.
 */
export function usePrepareLpTokenWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareLpTokenApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'approve'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"blacklist"`.
 */
export function usePrepareLpTokenBlacklist(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'blacklist'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'blacklist',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'blacklist'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareLpTokenBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'burn'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'burn'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"cancelAuthorization"`.
 */
export function usePrepareLpTokenCancelAuthorization(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'cancelAuthorization'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'cancelAuthorization',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'cancelAuthorization'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"configureMinter"`.
 */
export function usePrepareLpTokenConfigureMinter(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'configureMinter'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'configureMinter',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'configureMinter'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function usePrepareLpTokenDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'decreaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'decreaseAllowance'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function usePrepareLpTokenIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'increaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'increaseAllowance'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareLpTokenInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'initialize'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"initializeV2"`.
 */
export function usePrepareLpTokenInitializeV2(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'initializeV2'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'initializeV2',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'initializeV2'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"initializeV2_1"`.
 */
export function usePrepareLpTokenInitializeV2_1(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'initializeV2_1'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'initializeV2_1',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'initializeV2_1'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareLpTokenMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'mint'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"pause"`.
 */
export function usePrepareLpTokenPause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'pause'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'pause'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"permit"`.
 */
export function usePrepareLpTokenPermit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'permit'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'permit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'permit'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"receiveWithAuthorization"`.
 */
export function usePrepareLpTokenReceiveWithAuthorization(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof lpTokenABI,
      'receiveWithAuthorization'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'receiveWithAuthorization',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof lpTokenABI,
    'receiveWithAuthorization'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"removeMinter"`.
 */
export function usePrepareLpTokenRemoveMinter(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'removeMinter'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'removeMinter',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'removeMinter'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"rescueERC20"`.
 */
export function usePrepareLpTokenRescueErc20(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'rescueERC20'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'rescueERC20',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'rescueERC20'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareLpTokenTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'transfer'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareLpTokenTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'transferFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareLpTokenTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'transferOwnership'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"transferWithAuthorization"`.
 */
export function usePrepareLpTokenTransferWithAuthorization(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof lpTokenABI,
      'transferWithAuthorization'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'transferWithAuthorization',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof lpTokenABI,
    'transferWithAuthorization'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"unBlacklist"`.
 */
export function usePrepareLpTokenUnBlacklist(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'unBlacklist'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'unBlacklist',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'unBlacklist'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"unpause"`.
 */
export function usePrepareLpTokenUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'unpause'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'unpause'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"updateBlacklister"`.
 */
export function usePrepareLpTokenUpdateBlacklister(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'updateBlacklister'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'updateBlacklister',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'updateBlacklister'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"updateMasterMinter"`.
 */
export function usePrepareLpTokenUpdateMasterMinter(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'updateMasterMinter'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'updateMasterMinter',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'updateMasterMinter'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"updatePauser"`.
 */
export function usePrepareLpTokenUpdatePauser(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'updatePauser'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'updatePauser',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'updatePauser'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lpTokenABI}__ and `functionName` set to `"updateRescuer"`.
 */
export function usePrepareLpTokenUpdateRescuer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lpTokenABI, 'updateRescuer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lpTokenABI,
    functionName: 'updateRescuer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lpTokenABI, 'updateRescuer'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__.
 */
export function useLpTokenEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"Approval"`.
 */
export function useLpTokenApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'Approval'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"AuthorizationCanceled"`.
 */
export function useLpTokenAuthorizationCanceledEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'AuthorizationCanceled'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'AuthorizationCanceled',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'AuthorizationCanceled'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"AuthorizationUsed"`.
 */
export function useLpTokenAuthorizationUsedEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'AuthorizationUsed'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'AuthorizationUsed',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'AuthorizationUsed'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"Blacklisted"`.
 */
export function useLpTokenBlacklistedEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'Blacklisted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'Blacklisted',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'Blacklisted'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"BlacklisterChanged"`.
 */
export function useLpTokenBlacklisterChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'BlacklisterChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'BlacklisterChanged',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'BlacklisterChanged'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"Burn"`.
 */
export function useLpTokenBurnEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'Burn'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'Burn',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'Burn'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"MasterMinterChanged"`.
 */
export function useLpTokenMasterMinterChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'MasterMinterChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'MasterMinterChanged',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'MasterMinterChanged'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"Mint"`.
 */
export function useLpTokenMintEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'Mint'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'Mint',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'Mint'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"MinterConfigured"`.
 */
export function useLpTokenMinterConfiguredEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'MinterConfigured'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'MinterConfigured',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'MinterConfigured'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"MinterRemoved"`.
 */
export function useLpTokenMinterRemovedEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'MinterRemoved'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'MinterRemoved',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'MinterRemoved'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useLpTokenOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'OwnershipTransferred'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"Pause"`.
 */
export function useLpTokenPauseEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'Pause'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'Pause',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'Pause'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"PauserChanged"`.
 */
export function useLpTokenPauserChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'PauserChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'PauserChanged',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'PauserChanged'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"RescuerChanged"`.
 */
export function useLpTokenRescuerChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'RescuerChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'RescuerChanged',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'RescuerChanged'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"Transfer"`.
 */
export function useLpTokenTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'Transfer'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"UnBlacklisted"`.
 */
export function useLpTokenUnBlacklistedEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'UnBlacklisted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'UnBlacklisted',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'UnBlacklisted'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lpTokenABI}__ and `eventName` set to `"Unpause"`.
 */
export function useLpTokenUnpauseEvent(
  config: Omit<
    UseContractEventConfig<typeof lpTokenABI, 'Unpause'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lpTokenABI,
    eventName: 'Unpause',
    ...config,
  } as UseContractEventConfig<typeof lpTokenABI, 'Unpause'>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link migrationHelperABI}__.
 */
export function useMigrationHelperRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof migrationHelperABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof migrationHelperABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: migrationHelperABI,
    ...config,
  } as UseContractReadConfig<
    typeof migrationHelperABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"claimed"`.
 */
export function useMigrationHelperClaimed<
  TFunctionName extends 'claimed',
  TSelectData = ReadContractResult<typeof migrationHelperABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof migrationHelperABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: migrationHelperABI,
    functionName: 'claimed',
    ...config,
  } as UseContractReadConfig<
    typeof migrationHelperABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"muonToken"`.
 */
export function useMigrationHelperMuonToken<
  TFunctionName extends 'muonToken',
  TSelectData = ReadContractResult<typeof migrationHelperABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof migrationHelperABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: migrationHelperABI,
    functionName: 'muonToken',
    ...config,
  } as UseContractReadConfig<
    typeof migrationHelperABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"oldToken"`.
 */
export function useMigrationHelperOldToken<
  TFunctionName extends 'oldToken',
  TSelectData = ReadContractResult<typeof migrationHelperABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof migrationHelperABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: migrationHelperABI,
    functionName: 'oldToken',
    ...config,
  } as UseContractReadConfig<
    typeof migrationHelperABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"owner"`.
 */
export function useMigrationHelperOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof migrationHelperABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof migrationHelperABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: migrationHelperABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof migrationHelperABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"signer"`.
 */
export function useMigrationHelperSigner<
  TFunctionName extends 'signer',
  TSelectData = ReadContractResult<typeof migrationHelperABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof migrationHelperABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: migrationHelperABI,
    functionName: 'signer',
    ...config,
  } as UseContractReadConfig<
    typeof migrationHelperABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link migrationHelperABI}__.
 */
export function useMigrationHelperWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof migrationHelperABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof migrationHelperABI,
        TFunctionName,
        TMode
      > & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof migrationHelperABI, TFunctionName, TMode>({
    abi: migrationHelperABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"claim"`.
 */
export function useMigrationHelperClaim<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof migrationHelperABI,
          'claim'
        >['request']['abi'],
        'claim',
        TMode
      > & { functionName?: 'claim' }
    : UseContractWriteConfig<typeof migrationHelperABI, 'claim', TMode> & {
        abi?: never;
        functionName?: 'claim';
      } = {} as any,
) {
  return useContractWrite<typeof migrationHelperABI, 'claim', TMode>({
    abi: migrationHelperABI,
    functionName: 'claim',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"ownerWithdraw"`.
 */
export function useMigrationHelperOwnerWithdraw<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof migrationHelperABI,
          'ownerWithdraw'
        >['request']['abi'],
        'ownerWithdraw',
        TMode
      > & { functionName?: 'ownerWithdraw' }
    : UseContractWriteConfig<
        typeof migrationHelperABI,
        'ownerWithdraw',
        TMode
      > & {
        abi?: never;
        functionName?: 'ownerWithdraw';
      } = {} as any,
) {
  return useContractWrite<typeof migrationHelperABI, 'ownerWithdraw', TMode>({
    abi: migrationHelperABI,
    functionName: 'ownerWithdraw',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useMigrationHelperRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof migrationHelperABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<
        typeof migrationHelperABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never;
        functionName?: 'renounceOwnership';
      } = {} as any,
) {
  return useContractWrite<
    typeof migrationHelperABI,
    'renounceOwnership',
    TMode
  >({
    abi: migrationHelperABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"setMuonToken"`.
 */
export function useMigrationHelperSetMuonToken<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof migrationHelperABI,
          'setMuonToken'
        >['request']['abi'],
        'setMuonToken',
        TMode
      > & { functionName?: 'setMuonToken' }
    : UseContractWriteConfig<
        typeof migrationHelperABI,
        'setMuonToken',
        TMode
      > & {
        abi?: never;
        functionName?: 'setMuonToken';
      } = {} as any,
) {
  return useContractWrite<typeof migrationHelperABI, 'setMuonToken', TMode>({
    abi: migrationHelperABI,
    functionName: 'setMuonToken',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"setSigner"`.
 */
export function useMigrationHelperSetSigner<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof migrationHelperABI,
          'setSigner'
        >['request']['abi'],
        'setSigner',
        TMode
      > & { functionName?: 'setSigner' }
    : UseContractWriteConfig<typeof migrationHelperABI, 'setSigner', TMode> & {
        abi?: never;
        functionName?: 'setSigner';
      } = {} as any,
) {
  return useContractWrite<typeof migrationHelperABI, 'setSigner', TMode>({
    abi: migrationHelperABI,
    functionName: 'setSigner',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useMigrationHelperTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof migrationHelperABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<
        typeof migrationHelperABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never;
        functionName?: 'transferOwnership';
      } = {} as any,
) {
  return useContractWrite<
    typeof migrationHelperABI,
    'transferOwnership',
    TMode
  >({
    abi: migrationHelperABI,
    functionName: 'transferOwnership',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link migrationHelperABI}__.
 */
export function usePrepareMigrationHelperWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof migrationHelperABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: migrationHelperABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof migrationHelperABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"claim"`.
 */
export function usePrepareMigrationHelperClaim(
  config: Omit<
    UsePrepareContractWriteConfig<typeof migrationHelperABI, 'claim'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: migrationHelperABI,
    functionName: 'claim',
    ...config,
  } as UsePrepareContractWriteConfig<typeof migrationHelperABI, 'claim'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"ownerWithdraw"`.
 */
export function usePrepareMigrationHelperOwnerWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof migrationHelperABI, 'ownerWithdraw'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: migrationHelperABI,
    functionName: 'ownerWithdraw',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof migrationHelperABI,
    'ownerWithdraw'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareMigrationHelperRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof migrationHelperABI,
      'renounceOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: migrationHelperABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof migrationHelperABI,
    'renounceOwnership'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"setMuonToken"`.
 */
export function usePrepareMigrationHelperSetMuonToken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof migrationHelperABI, 'setMuonToken'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: migrationHelperABI,
    functionName: 'setMuonToken',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof migrationHelperABI,
    'setMuonToken'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"setSigner"`.
 */
export function usePrepareMigrationHelperSetSigner(
  config: Omit<
    UsePrepareContractWriteConfig<typeof migrationHelperABI, 'setSigner'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: migrationHelperABI,
    functionName: 'setSigner',
    ...config,
  } as UsePrepareContractWriteConfig<typeof migrationHelperABI, 'setSigner'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link migrationHelperABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareMigrationHelperTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof migrationHelperABI,
      'transferOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: migrationHelperABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof migrationHelperABI,
    'transferOwnership'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link migrationHelperABI}__.
 */
export function useMigrationHelperEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof migrationHelperABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: migrationHelperABI,
    ...config,
  } as UseContractEventConfig<typeof migrationHelperABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link migrationHelperABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useMigrationHelperOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof migrationHelperABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: migrationHelperABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<
    typeof migrationHelperABI,
    'OwnershipTransferred'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link migrationHelperABI}__ and `eventName` set to `"TokenClaimed"`.
 */
export function useMigrationHelperTokenClaimedEvent(
  config: Omit<
    UseContractEventConfig<typeof migrationHelperABI, 'TokenClaimed'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: migrationHelperABI,
    eventName: 'TokenClaimed',
    ...config,
  } as UseContractEventConfig<typeof migrationHelperABI, 'TokenClaimed'>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__.
 */
export function useMuonNodeManagerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"ADMIN_ROLE"`.
 */
export function useMuonNodeManagerAdminRole<
  TFunctionName extends 'ADMIN_ROLE',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'ADMIN_ROLE',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"DAO_ROLE"`.
 */
export function useMuonNodeManagerDaoRole<
  TFunctionName extends 'DAO_ROLE',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'DAO_ROLE',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`.
 */
export function useMuonNodeManagerDefaultAdminRole<
  TFunctionName extends 'DEFAULT_ADMIN_ROLE',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'DEFAULT_ADMIN_ROLE',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"configs"`.
 */
export function useMuonNodeManagerConfigs<
  TFunctionName extends 'configs',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'configs',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"editLogs"`.
 */
export function useMuonNodeManagerEditLogs<
  TFunctionName extends 'editLogs',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'editLogs',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"getAllNodes"`.
 */
export function useMuonNodeManagerGetAllNodes<
  TFunctionName extends 'getAllNodes',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'getAllNodes',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"getEditedNodes"`.
 */
export function useMuonNodeManagerGetEditedNodes<
  TFunctionName extends 'getEditedNodes',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'getEditedNodes',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"getInfo"`.
 */
export function useMuonNodeManagerGetInfo<
  TFunctionName extends 'getInfo',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'getInfo',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"getNode"`.
 */
export function useMuonNodeManagerGetNode<
  TFunctionName extends 'getNode',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'getNode',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"getNodeRoles"`.
 */
export function useMuonNodeManagerGetNodeRoles<
  TFunctionName extends 'getNodeRoles',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'getNodeRoles',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"getRoleAdmin"`.
 */
export function useMuonNodeManagerGetRoleAdmin<
  TFunctionName extends 'getRoleAdmin',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'getRoleAdmin',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"hasRole"`.
 */
export function useMuonNodeManagerHasRole<
  TFunctionName extends 'hasRole',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'hasRole',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"lastNodeId"`.
 */
export function useMuonNodeManagerLastNodeId<
  TFunctionName extends 'lastNodeId',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'lastNodeId',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"lastUpdateTime"`.
 */
export function useMuonNodeManagerLastUpdateTime<
  TFunctionName extends 'lastUpdateTime',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'lastUpdateTime',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"nodeAddressIds"`.
 */
export function useMuonNodeManagerNodeAddressIds<
  TFunctionName extends 'nodeAddressIds',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'nodeAddressIds',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"nodeAddressInfo"`.
 */
export function useMuonNodeManagerNodeAddressInfo<
  TFunctionName extends 'nodeAddressInfo',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'nodeAddressInfo',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"nodeHasRole"`.
 */
export function useMuonNodeManagerNodeHasRole<
  TFunctionName extends 'nodeHasRole',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'nodeHasRole',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"nodes"`.
 */
export function useMuonNodeManagerNodes<
  TFunctionName extends 'nodes',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'nodes',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"nodesRoles"`.
 */
export function useMuonNodeManagerNodesRoles<
  TFunctionName extends 'nodesRoles',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'nodesRoles',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"stakerAddressIds"`.
 */
export function useMuonNodeManagerStakerAddressIds<
  TFunctionName extends 'stakerAddressIds',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'stakerAddressIds',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"stakerAddressInfo"`.
 */
export function useMuonNodeManagerStakerAddressInfo<
  TFunctionName extends 'stakerAddressInfo',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'stakerAddressInfo',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useMuonNodeManagerSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof muonNodeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeManagerABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__.
 */
export function useMuonNodeManagerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeManagerABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof muonNodeManagerABI,
        TFunctionName,
        TMode
      > & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeManagerABI, TFunctionName, TMode>({
    abi: muonNodeManagerABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"addNode"`.
 */
export function useMuonNodeManagerAddNode<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeManagerABI,
          'addNode'
        >['request']['abi'],
        'addNode',
        TMode
      > & { functionName?: 'addNode' }
    : UseContractWriteConfig<typeof muonNodeManagerABI, 'addNode', TMode> & {
        abi?: never;
        functionName?: 'addNode';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeManagerABI, 'addNode', TMode>({
    abi: muonNodeManagerABI,
    functionName: 'addNode',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"deactiveNode"`.
 */
export function useMuonNodeManagerDeactiveNode<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeManagerABI,
          'deactiveNode'
        >['request']['abi'],
        'deactiveNode',
        TMode
      > & { functionName?: 'deactiveNode' }
    : UseContractWriteConfig<
        typeof muonNodeManagerABI,
        'deactiveNode',
        TMode
      > & {
        abi?: never;
        functionName?: 'deactiveNode';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeManagerABI, 'deactiveNode', TMode>({
    abi: muonNodeManagerABI,
    functionName: 'deactiveNode',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"exitBatch"`.
 */
export function useMuonNodeManagerExitBatch<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeManagerABI,
          'exitBatch'
        >['request']['abi'],
        'exitBatch',
        TMode
      > & { functionName?: 'exitBatch' }
    : UseContractWriteConfig<typeof muonNodeManagerABI, 'exitBatch', TMode> & {
        abi?: never;
        functionName?: 'exitBatch';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeManagerABI, 'exitBatch', TMode>({
    abi: muonNodeManagerABI,
    functionName: 'exitBatch',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"grantRole"`.
 */
export function useMuonNodeManagerGrantRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeManagerABI,
          'grantRole'
        >['request']['abi'],
        'grantRole',
        TMode
      > & { functionName?: 'grantRole' }
    : UseContractWriteConfig<typeof muonNodeManagerABI, 'grantRole', TMode> & {
        abi?: never;
        functionName?: 'grantRole';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeManagerABI, 'grantRole', TMode>({
    abi: muonNodeManagerABI,
    functionName: 'grantRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"initialize"`.
 */
export function useMuonNodeManagerInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeManagerABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof muonNodeManagerABI, 'initialize', TMode> & {
        abi?: never;
        functionName?: 'initialize';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeManagerABI, 'initialize', TMode>({
    abi: muonNodeManagerABI,
    functionName: 'initialize',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"migrate"`.
 */
export function useMuonNodeManagerMigrate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeManagerABI,
          'migrate'
        >['request']['abi'],
        'migrate',
        TMode
      > & { functionName?: 'migrate' }
    : UseContractWriteConfig<typeof muonNodeManagerABI, 'migrate', TMode> & {
        abi?: never;
        functionName?: 'migrate';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeManagerABI, 'migrate', TMode>({
    abi: muonNodeManagerABI,
    functionName: 'migrate',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"renounceRole"`.
 */
export function useMuonNodeManagerRenounceRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeManagerABI,
          'renounceRole'
        >['request']['abi'],
        'renounceRole',
        TMode
      > & { functionName?: 'renounceRole' }
    : UseContractWriteConfig<
        typeof muonNodeManagerABI,
        'renounceRole',
        TMode
      > & {
        abi?: never;
        functionName?: 'renounceRole';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeManagerABI, 'renounceRole', TMode>({
    abi: muonNodeManagerABI,
    functionName: 'renounceRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"revokeRole"`.
 */
export function useMuonNodeManagerRevokeRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeManagerABI,
          'revokeRole'
        >['request']['abi'],
        'revokeRole',
        TMode
      > & { functionName?: 'revokeRole' }
    : UseContractWriteConfig<typeof muonNodeManagerABI, 'revokeRole', TMode> & {
        abi?: never;
        functionName?: 'revokeRole';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeManagerABI, 'revokeRole', TMode>({
    abi: muonNodeManagerABI,
    functionName: 'revokeRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"setConfig"`.
 */
export function useMuonNodeManagerSetConfig<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeManagerABI,
          'setConfig'
        >['request']['abi'],
        'setConfig',
        TMode
      > & { functionName?: 'setConfig' }
    : UseContractWriteConfig<typeof muonNodeManagerABI, 'setConfig', TMode> & {
        abi?: never;
        functionName?: 'setConfig';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeManagerABI, 'setConfig', TMode>({
    abi: muonNodeManagerABI,
    functionName: 'setConfig',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"setNodeRole"`.
 */
export function useMuonNodeManagerSetNodeRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeManagerABI,
          'setNodeRole'
        >['request']['abi'],
        'setNodeRole',
        TMode
      > & { functionName?: 'setNodeRole' }
    : UseContractWriteConfig<
        typeof muonNodeManagerABI,
        'setNodeRole',
        TMode
      > & {
        abi?: never;
        functionName?: 'setNodeRole';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeManagerABI, 'setNodeRole', TMode>({
    abi: muonNodeManagerABI,
    functionName: 'setNodeRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"setTier"`.
 */
export function useMuonNodeManagerSetTier<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeManagerABI,
          'setTier'
        >['request']['abi'],
        'setTier',
        TMode
      > & { functionName?: 'setTier' }
    : UseContractWriteConfig<typeof muonNodeManagerABI, 'setTier', TMode> & {
        abi?: never;
        functionName?: 'setTier';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeManagerABI, 'setTier', TMode>({
    abi: muonNodeManagerABI,
    functionName: 'setTier',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"unsetNodeRole"`.
 */
export function useMuonNodeManagerUnsetNodeRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeManagerABI,
          'unsetNodeRole'
        >['request']['abi'],
        'unsetNodeRole',
        TMode
      > & { functionName?: 'unsetNodeRole' }
    : UseContractWriteConfig<
        typeof muonNodeManagerABI,
        'unsetNodeRole',
        TMode
      > & {
        abi?: never;
        functionName?: 'unsetNodeRole';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeManagerABI, 'unsetNodeRole', TMode>({
    abi: muonNodeManagerABI,
    functionName: 'unsetNodeRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__.
 */
export function usePrepareMuonNodeManagerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeManagerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeManagerABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeManagerABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"addNode"`.
 */
export function usePrepareMuonNodeManagerAddNode(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'addNode'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeManagerABI,
    functionName: 'addNode',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'addNode'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"deactiveNode"`.
 */
export function usePrepareMuonNodeManagerDeactiveNode(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'deactiveNode'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeManagerABI,
    functionName: 'deactiveNode',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeManagerABI,
    'deactiveNode'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"exitBatch"`.
 */
export function usePrepareMuonNodeManagerExitBatch(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'exitBatch'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeManagerABI,
    functionName: 'exitBatch',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'exitBatch'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"grantRole"`.
 */
export function usePrepareMuonNodeManagerGrantRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'grantRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeManagerABI,
    functionName: 'grantRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'grantRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareMuonNodeManagerInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeManagerABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'initialize'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"migrate"`.
 */
export function usePrepareMuonNodeManagerMigrate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'migrate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeManagerABI,
    functionName: 'migrate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'migrate'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"renounceRole"`.
 */
export function usePrepareMuonNodeManagerRenounceRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'renounceRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeManagerABI,
    functionName: 'renounceRole',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeManagerABI,
    'renounceRole'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"revokeRole"`.
 */
export function usePrepareMuonNodeManagerRevokeRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'revokeRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeManagerABI,
    functionName: 'revokeRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'revokeRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"setConfig"`.
 */
export function usePrepareMuonNodeManagerSetConfig(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'setConfig'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeManagerABI,
    functionName: 'setConfig',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'setConfig'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"setNodeRole"`.
 */
export function usePrepareMuonNodeManagerSetNodeRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'setNodeRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeManagerABI,
    functionName: 'setNodeRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'setNodeRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"setTier"`.
 */
export function usePrepareMuonNodeManagerSetTier(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'setTier'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeManagerABI,
    functionName: 'setTier',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'setTier'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeManagerABI}__ and `functionName` set to `"unsetNodeRole"`.
 */
export function usePrepareMuonNodeManagerUnsetNodeRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeManagerABI, 'unsetNodeRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeManagerABI,
    functionName: 'unsetNodeRole',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeManagerABI,
    'unsetNodeRole'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeManagerABI}__.
 */
export function useMuonNodeManagerEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof muonNodeManagerABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeManagerABI,
    ...config,
  } as UseContractEventConfig<typeof muonNodeManagerABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeManagerABI}__ and `eventName` set to `"ConfigSet"`.
 */
export function useMuonNodeManagerConfigSetEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeManagerABI, 'ConfigSet'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeManagerABI,
    eventName: 'ConfigSet',
    ...config,
  } as UseContractEventConfig<typeof muonNodeManagerABI, 'ConfigSet'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeManagerABI}__ and `eventName` set to `"Initialized"`.
 */
export function useMuonNodeManagerInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeManagerABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeManagerABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof muonNodeManagerABI, 'Initialized'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeManagerABI}__ and `eventName` set to `"NodeAdded"`.
 */
export function useMuonNodeManagerNodeAddedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeManagerABI, 'NodeAdded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeManagerABI,
    eventName: 'NodeAdded',
    ...config,
  } as UseContractEventConfig<typeof muonNodeManagerABI, 'NodeAdded'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeManagerABI}__ and `eventName` set to `"NodeDeactivated"`.
 */
export function useMuonNodeManagerNodeDeactivatedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeManagerABI, 'NodeDeactivated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeManagerABI,
    eventName: 'NodeDeactivated',
    ...config,
  } as UseContractEventConfig<typeof muonNodeManagerABI, 'NodeDeactivated'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeManagerABI}__ and `eventName` set to `"NodeRoleSet"`.
 */
export function useMuonNodeManagerNodeRoleSetEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeManagerABI, 'NodeRoleSet'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeManagerABI,
    eventName: 'NodeRoleSet',
    ...config,
  } as UseContractEventConfig<typeof muonNodeManagerABI, 'NodeRoleSet'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeManagerABI}__ and `eventName` set to `"NodeRoleUnset"`.
 */
export function useMuonNodeManagerNodeRoleUnsetEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeManagerABI, 'NodeRoleUnset'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeManagerABI,
    eventName: 'NodeRoleUnset',
    ...config,
  } as UseContractEventConfig<typeof muonNodeManagerABI, 'NodeRoleUnset'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeManagerABI}__ and `eventName` set to `"RoleAdminChanged"`.
 */
export function useMuonNodeManagerRoleAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeManagerABI, 'RoleAdminChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeManagerABI,
    eventName: 'RoleAdminChanged',
    ...config,
  } as UseContractEventConfig<typeof muonNodeManagerABI, 'RoleAdminChanged'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeManagerABI}__ and `eventName` set to `"RoleGranted"`.
 */
export function useMuonNodeManagerRoleGrantedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeManagerABI, 'RoleGranted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeManagerABI,
    eventName: 'RoleGranted',
    ...config,
  } as UseContractEventConfig<typeof muonNodeManagerABI, 'RoleGranted'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeManagerABI}__ and `eventName` set to `"RoleRevoked"`.
 */
export function useMuonNodeManagerRoleRevokedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeManagerABI, 'RoleRevoked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeManagerABI,
    eventName: 'RoleRevoked',
    ...config,
  } as UseContractEventConfig<typeof muonNodeManagerABI, 'RoleRevoked'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeManagerABI}__ and `eventName` set to `"TierSet"`.
 */
export function useMuonNodeManagerTierSetEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeManagerABI, 'TierSet'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeManagerABI,
    eventName: 'TierSet',
    ...config,
  } as UseContractEventConfig<typeof muonNodeManagerABI, 'TierSet'>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__.
 */
export function useMuonNodeStakingRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"DAO_ROLE"`.
 */
export function useMuonNodeStakingDaoRole<
  TFunctionName extends 'DAO_ROLE',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'DAO_ROLE',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`.
 */
export function useMuonNodeStakingDefaultAdminRole<
  TFunctionName extends 'DEFAULT_ADMIN_ROLE',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'DEFAULT_ADMIN_ROLE',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"REWARD_ROLE"`.
 */
export function useMuonNodeStakingRewardRole<
  TFunctionName extends 'REWARD_ROLE',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'REWARD_ROLE',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"UPDATE_STAKING_ROLE"`.
 */
export function useMuonNodeStakingUpdateStakingRole<
  TFunctionName extends 'UPDATE_STAKING_ROLE',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'UPDATE_STAKING_ROLE',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"bondedToken"`.
 */
export function useMuonNodeStakingBondedToken<
  TFunctionName extends 'bondedToken',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'bondedToken',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"delegateeStakers"`.
 */
export function useMuonNodeStakingDelegateeStakers<
  TFunctionName extends 'delegateeStakers',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'delegateeStakers',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"earned"`.
 */
export function useMuonNodeStakingEarned<
  TFunctionName extends 'earned',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'earned',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"exitPendingPeriod"`.
 */
export function useMuonNodeStakingExitPendingPeriod<
  TFunctionName extends 'exitPendingPeriod',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'exitPendingPeriod',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"functionPauseStatus"`.
 */
export function useMuonNodeStakingFunctionPauseStatus<
  TFunctionName extends 'functionPauseStatus',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'functionPauseStatus',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"getRoleAdmin"`.
 */
export function useMuonNodeStakingGetRoleAdmin<
  TFunctionName extends 'getRoleAdmin',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'getRoleAdmin',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"hasRole"`.
 */
export function useMuonNodeStakingHasRole<
  TFunctionName extends 'hasRole',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'hasRole',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"isStakingToken"`.
 */
export function useMuonNodeStakingIsStakingToken<
  TFunctionName extends 'isStakingToken',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'isStakingToken',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"lastTimeRewardApplicable"`.
 */
export function useMuonNodeStakingLastTimeRewardApplicable<
  TFunctionName extends 'lastTimeRewardApplicable',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'lastTimeRewardApplicable',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"lastUpdateTime"`.
 */
export function useMuonNodeStakingLastUpdateTime<
  TFunctionName extends 'lastUpdateTime',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'lastUpdateTime',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"lockedStakes"`.
 */
export function useMuonNodeStakingLockedStakes<
  TFunctionName extends 'lockedStakes',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'lockedStakes',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"minStakeAmount"`.
 */
export function useMuonNodeStakingMinStakeAmount<
  TFunctionName extends 'minStakeAmount',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'minStakeAmount',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"muonAppId"`.
 */
export function useMuonNodeStakingMuonAppId<
  TFunctionName extends 'muonAppId',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'muonAppId',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"muonPublicKey"`.
 */
export function useMuonNodeStakingMuonPublicKey<
  TFunctionName extends 'muonPublicKey',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'muonPublicKey',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"muonToken"`.
 */
export function useMuonNodeStakingMuonToken<
  TFunctionName extends 'muonToken',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'muonToken',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"nodeManager"`.
 */
export function useMuonNodeStakingNodeManager<
  TFunctionName extends 'nodeManager',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'nodeManager',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"notPaidRewards"`.
 */
export function useMuonNodeStakingNotPaidRewards<
  TFunctionName extends 'notPaidRewards',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'notPaidRewards',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function useMuonNodeStakingOnErc721Received<
  TFunctionName extends 'onERC721Received',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'onERC721Received',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"pendingUnstakes"`.
 */
export function useMuonNodeStakingPendingUnstakes<
  TFunctionName extends 'pendingUnstakes',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'pendingUnstakes',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"periodFinish"`.
 */
export function useMuonNodeStakingPeriodFinish<
  TFunctionName extends 'periodFinish',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'periodFinish',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"rewardPerToken"`.
 */
export function useMuonNodeStakingRewardPerToken<
  TFunctionName extends 'rewardPerToken',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'rewardPerToken',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"rewardPerTokenStored"`.
 */
export function useMuonNodeStakingRewardPerTokenStored<
  TFunctionName extends 'rewardPerTokenStored',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'rewardPerTokenStored',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"rewardPeriod"`.
 */
export function useMuonNodeStakingRewardPeriod<
  TFunctionName extends 'rewardPeriod',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'rewardPeriod',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"rewardRate"`.
 */
export function useMuonNodeStakingRewardRate<
  TFunctionName extends 'rewardRate',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'rewardRate',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"stakingTokens"`.
 */
export function useMuonNodeStakingStakingTokens<
  TFunctionName extends 'stakingTokens',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'stakingTokens',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"stakingTokensMultiplier"`.
 */
export function useMuonNodeStakingStakingTokensMultiplier<
  TFunctionName extends 'stakingTokensMultiplier',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'stakingTokensMultiplier',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useMuonNodeStakingSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"tiersMaxStakeAmount"`.
 */
export function useMuonNodeStakingTiersMaxStakeAmount<
  TFunctionName extends 'tiersMaxStakeAmount',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'tiersMaxStakeAmount',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"totalStaked"`.
 */
export function useMuonNodeStakingTotalStaked<
  TFunctionName extends 'totalStaked',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'totalStaked',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"unstakeReqTimes"`.
 */
export function useMuonNodeStakingUnstakeReqTimes<
  TFunctionName extends 'unstakeReqTimes',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'unstakeReqTimes',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"users"`.
 */
export function useMuonNodeStakingUsers<
  TFunctionName extends 'users',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'users',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"valueOfBondedToken"`.
 */
export function useMuonNodeStakingValueOfBondedToken<
  TFunctionName extends 'valueOfBondedToken',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'valueOfBondedToken',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"verifier"`.
 */
export function useMuonNodeStakingVerifier<
  TFunctionName extends 'verifier',
  TSelectData = ReadContractResult<typeof muonNodeStakingABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof muonNodeStakingABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: muonNodeStakingABI,
    functionName: 'verifier',
    ...config,
  } as UseContractReadConfig<
    typeof muonNodeStakingABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__.
 */
export function useMuonNodeStakingWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        TFunctionName,
        TMode
      > & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, TFunctionName, TMode>({
    abi: muonNodeStakingABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"addMuonNode"`.
 */
export function useMuonNodeStakingAddMuonNode<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'addMuonNode'
        >['request']['abi'],
        'addMuonNode',
        TMode
      > & { functionName?: 'addMuonNode' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'addMuonNode',
        TMode
      > & {
        abi?: never;
        functionName?: 'addMuonNode';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'addMuonNode', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'addMuonNode',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"addMuonNodeByToken"`.
 */
export function useMuonNodeStakingAddMuonNodeByToken<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'addMuonNodeByToken'
        >['request']['abi'],
        'addMuonNodeByToken',
        TMode
      > & { functionName?: 'addMuonNodeByToken' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'addMuonNodeByToken',
        TMode
      > & {
        abi?: never;
        functionName?: 'addMuonNodeByToken';
      } = {} as any,
) {
  return useContractWrite<
    typeof muonNodeStakingABI,
    'addMuonNodeByToken',
    TMode
  >({
    abi: muonNodeStakingABI,
    functionName: 'addMuonNodeByToken',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"claimUnstake"`.
 */
export function useMuonNodeStakingClaimUnstake<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'claimUnstake'
        >['request']['abi'],
        'claimUnstake',
        TMode
      > & { functionName?: 'claimUnstake' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'claimUnstake',
        TMode
      > & {
        abi?: never;
        functionName?: 'claimUnstake';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'claimUnstake', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'claimUnstake',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"deactiveMuonNode"`.
 */
export function useMuonNodeStakingDeactiveMuonNode<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'deactiveMuonNode'
        >['request']['abi'],
        'deactiveMuonNode',
        TMode
      > & { functionName?: 'deactiveMuonNode' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'deactiveMuonNode',
        TMode
      > & {
        abi?: never;
        functionName?: 'deactiveMuonNode';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'deactiveMuonNode', TMode>(
    {
      abi: muonNodeStakingABI,
      functionName: 'deactiveMuonNode',
      ...config,
    } as any,
  );
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"distributeRewards"`.
 */
export function useMuonNodeStakingDistributeRewards<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'distributeRewards'
        >['request']['abi'],
        'distributeRewards',
        TMode
      > & { functionName?: 'distributeRewards' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'distributeRewards',
        TMode
      > & {
        abi?: never;
        functionName?: 'distributeRewards';
      } = {} as any,
) {
  return useContractWrite<
    typeof muonNodeStakingABI,
    'distributeRewards',
    TMode
  >({
    abi: muonNodeStakingABI,
    functionName: 'distributeRewards',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"getReward"`.
 */
export function useMuonNodeStakingGetReward<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'getReward'
        >['request']['abi'],
        'getReward',
        TMode
      > & { functionName?: 'getReward' }
    : UseContractWriteConfig<typeof muonNodeStakingABI, 'getReward', TMode> & {
        abi?: never;
        functionName?: 'getReward';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'getReward', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'getReward',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"grantRole"`.
 */
export function useMuonNodeStakingGrantRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'grantRole'
        >['request']['abi'],
        'grantRole',
        TMode
      > & { functionName?: 'grantRole' }
    : UseContractWriteConfig<typeof muonNodeStakingABI, 'grantRole', TMode> & {
        abi?: never;
        functionName?: 'grantRole';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'grantRole', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'grantRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"initialize"`.
 */
export function useMuonNodeStakingInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof muonNodeStakingABI, 'initialize', TMode> & {
        abi?: never;
        functionName?: 'initialize';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'initialize', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'initialize',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"lockToBondedToken"`.
 */
export function useMuonNodeStakingLockToBondedToken<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'lockToBondedToken'
        >['request']['abi'],
        'lockToBondedToken',
        TMode
      > & { functionName?: 'lockToBondedToken' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'lockToBondedToken',
        TMode
      > & {
        abi?: never;
        functionName?: 'lockToBondedToken';
      } = {} as any,
) {
  return useContractWrite<
    typeof muonNodeStakingABI,
    'lockToBondedToken',
    TMode
  >({
    abi: muonNodeStakingABI,
    functionName: 'lockToBondedToken',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"mergeBondedTokens"`.
 */
export function useMuonNodeStakingMergeBondedTokens<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'mergeBondedTokens'
        >['request']['abi'],
        'mergeBondedTokens',
        TMode
      > & { functionName?: 'mergeBondedTokens' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'mergeBondedTokens',
        TMode
      > & {
        abi?: never;
        functionName?: 'mergeBondedTokens';
      } = {} as any,
) {
  return useContractWrite<
    typeof muonNodeStakingABI,
    'mergeBondedTokens',
    TMode
  >({
    abi: muonNodeStakingABI,
    functionName: 'mergeBondedTokens',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"migrate"`.
 */
export function useMuonNodeStakingMigrate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'migrate'
        >['request']['abi'],
        'migrate',
        TMode
      > & { functionName?: 'migrate' }
    : UseContractWriteConfig<typeof muonNodeStakingABI, 'migrate', TMode> & {
        abi?: never;
        functionName?: 'migrate';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'migrate', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'migrate',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"renounceRole"`.
 */
export function useMuonNodeStakingRenounceRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'renounceRole'
        >['request']['abi'],
        'renounceRole',
        TMode
      > & { functionName?: 'renounceRole' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'renounceRole',
        TMode
      > & {
        abi?: never;
        functionName?: 'renounceRole';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'renounceRole', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'renounceRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"revokeRole"`.
 */
export function useMuonNodeStakingRevokeRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'revokeRole'
        >['request']['abi'],
        'revokeRole',
        TMode
      > & { functionName?: 'revokeRole' }
    : UseContractWriteConfig<typeof muonNodeStakingABI, 'revokeRole', TMode> & {
        abi?: never;
        functionName?: 'revokeRole';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'revokeRole', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'revokeRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setDelegation"`.
 */
export function useMuonNodeStakingSetDelegation<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'setDelegation'
        >['request']['abi'],
        'setDelegation',
        TMode
      > & { functionName?: 'setDelegation' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'setDelegation',
        TMode
      > & {
        abi?: never;
        functionName?: 'setDelegation';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'setDelegation', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'setDelegation',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setExitPendingPeriod"`.
 */
export function useMuonNodeStakingSetExitPendingPeriod<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'setExitPendingPeriod'
        >['request']['abi'],
        'setExitPendingPeriod',
        TMode
      > & { functionName?: 'setExitPendingPeriod' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'setExitPendingPeriod',
        TMode
      > & {
        abi?: never;
        functionName?: 'setExitPendingPeriod';
      } = {} as any,
) {
  return useContractWrite<
    typeof muonNodeStakingABI,
    'setExitPendingPeriod',
    TMode
  >({
    abi: muonNodeStakingABI,
    functionName: 'setExitPendingPeriod',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setFunctionPauseStatus"`.
 */
export function useMuonNodeStakingSetFunctionPauseStatus<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'setFunctionPauseStatus'
        >['request']['abi'],
        'setFunctionPauseStatus',
        TMode
      > & { functionName?: 'setFunctionPauseStatus' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'setFunctionPauseStatus',
        TMode
      > & {
        abi?: never;
        functionName?: 'setFunctionPauseStatus';
      } = {} as any,
) {
  return useContractWrite<
    typeof muonNodeStakingABI,
    'setFunctionPauseStatus',
    TMode
  >({
    abi: muonNodeStakingABI,
    functionName: 'setFunctionPauseStatus',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setMinStakeAmount"`.
 */
export function useMuonNodeStakingSetMinStakeAmount<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'setMinStakeAmount'
        >['request']['abi'],
        'setMinStakeAmount',
        TMode
      > & { functionName?: 'setMinStakeAmount' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'setMinStakeAmount',
        TMode
      > & {
        abi?: never;
        functionName?: 'setMinStakeAmount';
      } = {} as any,
) {
  return useContractWrite<
    typeof muonNodeStakingABI,
    'setMinStakeAmount',
    TMode
  >({
    abi: muonNodeStakingABI,
    functionName: 'setMinStakeAmount',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setMuonAppId"`.
 */
export function useMuonNodeStakingSetMuonAppId<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'setMuonAppId'
        >['request']['abi'],
        'setMuonAppId',
        TMode
      > & { functionName?: 'setMuonAppId' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'setMuonAppId',
        TMode
      > & {
        abi?: never;
        functionName?: 'setMuonAppId';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'setMuonAppId', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'setMuonAppId',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setMuonNodeTier"`.
 */
export function useMuonNodeStakingSetMuonNodeTier<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'setMuonNodeTier'
        >['request']['abi'],
        'setMuonNodeTier',
        TMode
      > & { functionName?: 'setMuonNodeTier' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'setMuonNodeTier',
        TMode
      > & {
        abi?: never;
        functionName?: 'setMuonNodeTier';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'setMuonNodeTier', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'setMuonNodeTier',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setMuonPublicKey"`.
 */
export function useMuonNodeStakingSetMuonPublicKey<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'setMuonPublicKey'
        >['request']['abi'],
        'setMuonPublicKey',
        TMode
      > & { functionName?: 'setMuonPublicKey' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'setMuonPublicKey',
        TMode
      > & {
        abi?: never;
        functionName?: 'setMuonPublicKey';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'setMuonPublicKey', TMode>(
    {
      abi: muonNodeStakingABI,
      functionName: 'setMuonPublicKey',
      ...config,
    } as any,
  );
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setRewardPeriod"`.
 */
export function useMuonNodeStakingSetRewardPeriod<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'setRewardPeriod'
        >['request']['abi'],
        'setRewardPeriod',
        TMode
      > & { functionName?: 'setRewardPeriod' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'setRewardPeriod',
        TMode
      > & {
        abi?: never;
        functionName?: 'setRewardPeriod';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'setRewardPeriod', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'setRewardPeriod',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setStakeLockStatus"`.
 */
export function useMuonNodeStakingSetStakeLockStatus<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'setStakeLockStatus'
        >['request']['abi'],
        'setStakeLockStatus',
        TMode
      > & { functionName?: 'setStakeLockStatus' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'setStakeLockStatus',
        TMode
      > & {
        abi?: never;
        functionName?: 'setStakeLockStatus';
      } = {} as any,
) {
  return useContractWrite<
    typeof muonNodeStakingABI,
    'setStakeLockStatus',
    TMode
  >({
    abi: muonNodeStakingABI,
    functionName: 'setStakeLockStatus',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setTierMaxStakeAmount"`.
 */
export function useMuonNodeStakingSetTierMaxStakeAmount<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'setTierMaxStakeAmount'
        >['request']['abi'],
        'setTierMaxStakeAmount',
        TMode
      > & { functionName?: 'setTierMaxStakeAmount' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'setTierMaxStakeAmount',
        TMode
      > & {
        abi?: never;
        functionName?: 'setTierMaxStakeAmount';
      } = {} as any,
) {
  return useContractWrite<
    typeof muonNodeStakingABI,
    'setTierMaxStakeAmount',
    TMode
  >({
    abi: muonNodeStakingABI,
    functionName: 'setTierMaxStakeAmount',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setVerifier"`.
 */
export function useMuonNodeStakingSetVerifier<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'setVerifier'
        >['request']['abi'],
        'setVerifier',
        TMode
      > & { functionName?: 'setVerifier' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'setVerifier',
        TMode
      > & {
        abi?: never;
        functionName?: 'setVerifier';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'setVerifier', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'setVerifier',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"unsetDelegation"`.
 */
export function useMuonNodeStakingUnsetDelegation<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'unsetDelegation'
        >['request']['abi'],
        'unsetDelegation',
        TMode
      > & { functionName?: 'unsetDelegation' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'unsetDelegation',
        TMode
      > & {
        abi?: never;
        functionName?: 'unsetDelegation';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'unsetDelegation', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'unsetDelegation',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"unstake"`.
 */
export function useMuonNodeStakingUnstake<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'unstake'
        >['request']['abi'],
        'unstake',
        TMode
      > & { functionName?: 'unstake' }
    : UseContractWriteConfig<typeof muonNodeStakingABI, 'unstake', TMode> & {
        abi?: never;
        functionName?: 'unstake';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'unstake', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'unstake',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"updateStaking"`.
 */
export function useMuonNodeStakingUpdateStaking<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'updateStaking'
        >['request']['abi'],
        'updateStaking',
        TMode
      > & { functionName?: 'updateStaking' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'updateStaking',
        TMode
      > & {
        abi?: never;
        functionName?: 'updateStaking';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'updateStaking', TMode>({
    abi: muonNodeStakingABI,
    functionName: 'updateStaking',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"updateStakingFor"`.
 */
export function useMuonNodeStakingUpdateStakingFor<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'updateStakingFor'
        >['request']['abi'],
        'updateStakingFor',
        TMode
      > & { functionName?: 'updateStakingFor' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'updateStakingFor',
        TMode
      > & {
        abi?: never;
        functionName?: 'updateStakingFor';
      } = {} as any,
) {
  return useContractWrite<typeof muonNodeStakingABI, 'updateStakingFor', TMode>(
    {
      abi: muonNodeStakingABI,
      functionName: 'updateStakingFor',
      ...config,
    } as any,
  );
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"updateStakingTokens"`.
 */
export function useMuonNodeStakingUpdateStakingTokens<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof muonNodeStakingABI,
          'updateStakingTokens'
        >['request']['abi'],
        'updateStakingTokens',
        TMode
      > & { functionName?: 'updateStakingTokens' }
    : UseContractWriteConfig<
        typeof muonNodeStakingABI,
        'updateStakingTokens',
        TMode
      > & {
        abi?: never;
        functionName?: 'updateStakingTokens';
      } = {} as any,
) {
  return useContractWrite<
    typeof muonNodeStakingABI,
    'updateStakingTokens',
    TMode
  >({
    abi: muonNodeStakingABI,
    functionName: 'updateStakingTokens',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__.
 */
export function usePrepareMuonNodeStakingWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeStakingABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"addMuonNode"`.
 */
export function usePrepareMuonNodeStakingAddMuonNode(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'addMuonNode'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'addMuonNode',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'addMuonNode'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"addMuonNodeByToken"`.
 */
export function usePrepareMuonNodeStakingAddMuonNodeByToken(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof muonNodeStakingABI,
      'addMuonNodeByToken'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'addMuonNodeByToken',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'addMuonNodeByToken'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"claimUnstake"`.
 */
export function usePrepareMuonNodeStakingClaimUnstake(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'claimUnstake'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'claimUnstake',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'claimUnstake'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"deactiveMuonNode"`.
 */
export function usePrepareMuonNodeStakingDeactiveMuonNode(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof muonNodeStakingABI,
      'deactiveMuonNode'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'deactiveMuonNode',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'deactiveMuonNode'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"distributeRewards"`.
 */
export function usePrepareMuonNodeStakingDistributeRewards(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof muonNodeStakingABI,
      'distributeRewards'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'distributeRewards',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'distributeRewards'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"getReward"`.
 */
export function usePrepareMuonNodeStakingGetReward(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'getReward'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'getReward',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'getReward'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"grantRole"`.
 */
export function usePrepareMuonNodeStakingGrantRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'grantRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'grantRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'grantRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareMuonNodeStakingInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'initialize'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"lockToBondedToken"`.
 */
export function usePrepareMuonNodeStakingLockToBondedToken(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof muonNodeStakingABI,
      'lockToBondedToken'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'lockToBondedToken',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'lockToBondedToken'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"mergeBondedTokens"`.
 */
export function usePrepareMuonNodeStakingMergeBondedTokens(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof muonNodeStakingABI,
      'mergeBondedTokens'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'mergeBondedTokens',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'mergeBondedTokens'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"migrate"`.
 */
export function usePrepareMuonNodeStakingMigrate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'migrate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'migrate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'migrate'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"renounceRole"`.
 */
export function usePrepareMuonNodeStakingRenounceRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'renounceRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'renounceRole',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'renounceRole'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"revokeRole"`.
 */
export function usePrepareMuonNodeStakingRevokeRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'revokeRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'revokeRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'revokeRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setDelegation"`.
 */
export function usePrepareMuonNodeStakingSetDelegation(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'setDelegation'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'setDelegation',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'setDelegation'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setExitPendingPeriod"`.
 */
export function usePrepareMuonNodeStakingSetExitPendingPeriod(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof muonNodeStakingABI,
      'setExitPendingPeriod'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'setExitPendingPeriod',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'setExitPendingPeriod'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setFunctionPauseStatus"`.
 */
export function usePrepareMuonNodeStakingSetFunctionPauseStatus(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof muonNodeStakingABI,
      'setFunctionPauseStatus'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'setFunctionPauseStatus',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'setFunctionPauseStatus'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setMinStakeAmount"`.
 */
export function usePrepareMuonNodeStakingSetMinStakeAmount(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof muonNodeStakingABI,
      'setMinStakeAmount'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'setMinStakeAmount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'setMinStakeAmount'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setMuonAppId"`.
 */
export function usePrepareMuonNodeStakingSetMuonAppId(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'setMuonAppId'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'setMuonAppId',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'setMuonAppId'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setMuonNodeTier"`.
 */
export function usePrepareMuonNodeStakingSetMuonNodeTier(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'setMuonNodeTier'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'setMuonNodeTier',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'setMuonNodeTier'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setMuonPublicKey"`.
 */
export function usePrepareMuonNodeStakingSetMuonPublicKey(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof muonNodeStakingABI,
      'setMuonPublicKey'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'setMuonPublicKey',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'setMuonPublicKey'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setRewardPeriod"`.
 */
export function usePrepareMuonNodeStakingSetRewardPeriod(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'setRewardPeriod'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'setRewardPeriod',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'setRewardPeriod'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setStakeLockStatus"`.
 */
export function usePrepareMuonNodeStakingSetStakeLockStatus(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof muonNodeStakingABI,
      'setStakeLockStatus'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'setStakeLockStatus',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'setStakeLockStatus'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setTierMaxStakeAmount"`.
 */
export function usePrepareMuonNodeStakingSetTierMaxStakeAmount(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof muonNodeStakingABI,
      'setTierMaxStakeAmount'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'setTierMaxStakeAmount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'setTierMaxStakeAmount'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"setVerifier"`.
 */
export function usePrepareMuonNodeStakingSetVerifier(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'setVerifier'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'setVerifier',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'setVerifier'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"unsetDelegation"`.
 */
export function usePrepareMuonNodeStakingUnsetDelegation(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'unsetDelegation'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'unsetDelegation',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'unsetDelegation'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"unstake"`.
 */
export function usePrepareMuonNodeStakingUnstake(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'unstake'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'unstake',
    ...config,
  } as UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'unstake'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"updateStaking"`.
 */
export function usePrepareMuonNodeStakingUpdateStaking(
  config: Omit<
    UsePrepareContractWriteConfig<typeof muonNodeStakingABI, 'updateStaking'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'updateStaking',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'updateStaking'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"updateStakingFor"`.
 */
export function usePrepareMuonNodeStakingUpdateStakingFor(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof muonNodeStakingABI,
      'updateStakingFor'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'updateStakingFor',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'updateStakingFor'
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link muonNodeStakingABI}__ and `functionName` set to `"updateStakingTokens"`.
 */
export function usePrepareMuonNodeStakingUpdateStakingTokens(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof muonNodeStakingABI,
      'updateStakingTokens'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: muonNodeStakingABI,
    functionName: 'updateStakingTokens',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof muonNodeStakingABI,
    'updateStakingTokens'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__.
 */
export function useMuonNodeStakingEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"ClaimUnstake"`.
 */
export function useMuonNodeStakingClaimUnstakeEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'ClaimUnstake'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'ClaimUnstake',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'ClaimUnstake'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"Delegated"`.
 */
export function useMuonNodeStakingDelegatedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'Delegated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'Delegated',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'Delegated'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"ExitPendingPeriodUpdated"`.
 */
export function useMuonNodeStakingExitPendingPeriodUpdatedEvent(
  config: Omit<
    UseContractEventConfig<
      typeof muonNodeStakingABI,
      'ExitPendingPeriodUpdated'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'ExitPendingPeriodUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof muonNodeStakingABI,
    'ExitPendingPeriodUpdated'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"FunctionPauseStatusChanged"`.
 */
export function useMuonNodeStakingFunctionPauseStatusChangedEvent(
  config: Omit<
    UseContractEventConfig<
      typeof muonNodeStakingABI,
      'FunctionPauseStatusChanged'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'FunctionPauseStatusChanged',
    ...config,
  } as UseContractEventConfig<
    typeof muonNodeStakingABI,
    'FunctionPauseStatusChanged'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"Initialized"`.
 */
export function useMuonNodeStakingInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'Initialized'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"MinStakeAmountUpdated"`.
 */
export function useMuonNodeStakingMinStakeAmountUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'MinStakeAmountUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'MinStakeAmountUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof muonNodeStakingABI,
    'MinStakeAmountUpdated'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"MuonAppIdUpdated"`.
 */
export function useMuonNodeStakingMuonAppIdUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'MuonAppIdUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'MuonAppIdUpdated',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'MuonAppIdUpdated'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"MuonNodeAdded"`.
 */
export function useMuonNodeStakingMuonNodeAddedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'MuonNodeAdded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'MuonNodeAdded',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'MuonNodeAdded'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"MuonPublicKeyUpdated"`.
 */
export function useMuonNodeStakingMuonPublicKeyUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'MuonPublicKeyUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'MuonPublicKeyUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof muonNodeStakingABI,
    'MuonPublicKeyUpdated'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"RewardGot"`.
 */
export function useMuonNodeStakingRewardGotEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'RewardGot'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'RewardGot',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'RewardGot'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"RewardsDistributed"`.
 */
export function useMuonNodeStakingRewardsDistributedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'RewardsDistributed'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'RewardsDistributed',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'RewardsDistributed'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"RoleAdminChanged"`.
 */
export function useMuonNodeStakingRoleAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'RoleAdminChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'RoleAdminChanged',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'RoleAdminChanged'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"RoleGranted"`.
 */
export function useMuonNodeStakingRoleGrantedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'RoleGranted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'RoleGranted',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'RoleGranted'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"RoleRevoked"`.
 */
export function useMuonNodeStakingRoleRevokedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'RoleRevoked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'RoleRevoked',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'RoleRevoked'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"StakeLockStatusChanged"`.
 */
export function useMuonNodeStakingStakeLockStatusChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'StakeLockStatusChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'StakeLockStatusChanged',
    ...config,
  } as UseContractEventConfig<
    typeof muonNodeStakingABI,
    'StakeLockStatusChanged'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"Staked"`.
 */
export function useMuonNodeStakingStakedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'Staked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'Staked',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'Staked'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"StakingTokenUpdated"`.
 */
export function useMuonNodeStakingStakingTokenUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'StakingTokenUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'StakingTokenUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof muonNodeStakingABI,
    'StakingTokenUpdated'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"TierMaxStakeUpdated"`.
 */
export function useMuonNodeStakingTierMaxStakeUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'TierMaxStakeUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'TierMaxStakeUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof muonNodeStakingABI,
    'TierMaxStakeUpdated'
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"Undelegated"`.
 */
export function useMuonNodeStakingUndelegatedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'Undelegated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'Undelegated',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'Undelegated'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"Unstaked"`.
 */
export function useMuonNodeStakingUnstakedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'Unstaked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'Unstaked',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'Unstaked'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link muonNodeStakingABI}__ and `eventName` set to `"VerifierUpdated"`.
 */
export function useMuonNodeStakingVerifierUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof muonNodeStakingABI, 'VerifierUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: muonNodeStakingABI,
    eventName: 'VerifierUpdated',
    ...config,
  } as UseContractEventConfig<typeof muonNodeStakingABI, 'VerifierUpdated'>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__.
 */
export function useOldTokenRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`.
 */
export function useOldTokenDefaultAdminRole<
  TFunctionName extends 'DEFAULT_ADMIN_ROLE',
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    functionName: 'DEFAULT_ADMIN_ROLE',
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"MINTER_ROLE"`.
 */
export function useOldTokenMinterRole<
  TFunctionName extends 'MINTER_ROLE',
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    functionName: 'MINTER_ROLE',
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"PAUSER_ROLE"`.
 */
export function useOldTokenPauserRole<
  TFunctionName extends 'PAUSER_ROLE',
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    functionName: 'PAUSER_ROLE',
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"allowance"`.
 */
export function useOldTokenAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useOldTokenBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"decimals"`.
 */
export function useOldTokenDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"getRoleAdmin"`.
 */
export function useOldTokenGetRoleAdmin<
  TFunctionName extends 'getRoleAdmin',
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    functionName: 'getRoleAdmin',
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"hasRole"`.
 */
export function useOldTokenHasRole<
  TFunctionName extends 'hasRole',
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    functionName: 'hasRole',
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"name"`.
 */
export function useOldTokenName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"paused"`.
 */
export function useOldTokenPaused<
  TFunctionName extends 'paused',
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useOldTokenSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"symbol"`.
 */
export function useOldTokenSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useOldTokenTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof oldTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: oldTokenABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof oldTokenABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__.
 */
export function useOldTokenWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof oldTokenABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, TFunctionName, TMode>({
    abi: oldTokenABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"approve"`.
 */
export function useOldTokenApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof oldTokenABI, 'approve', TMode> & {
        abi?: never;
        functionName?: 'approve';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'approve', TMode>({
    abi: oldTokenABI,
    functionName: 'approve',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"burn"`.
 */
export function useOldTokenBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'burn'
        >['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof oldTokenABI, 'burn', TMode> & {
        abi?: never;
        functionName?: 'burn';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'burn', TMode>({
    abi: oldTokenABI,
    functionName: 'burn',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"burnFrom"`.
 */
export function useOldTokenBurnFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'burnFrom'
        >['request']['abi'],
        'burnFrom',
        TMode
      > & { functionName?: 'burnFrom' }
    : UseContractWriteConfig<typeof oldTokenABI, 'burnFrom', TMode> & {
        abi?: never;
        functionName?: 'burnFrom';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'burnFrom', TMode>({
    abi: oldTokenABI,
    functionName: 'burnFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function useOldTokenDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & { functionName?: 'decreaseAllowance' }
    : UseContractWriteConfig<typeof oldTokenABI, 'decreaseAllowance', TMode> & {
        abi?: never;
        functionName?: 'decreaseAllowance';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'decreaseAllowance', TMode>({
    abi: oldTokenABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"grantRole"`.
 */
export function useOldTokenGrantRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'grantRole'
        >['request']['abi'],
        'grantRole',
        TMode
      > & { functionName?: 'grantRole' }
    : UseContractWriteConfig<typeof oldTokenABI, 'grantRole', TMode> & {
        abi?: never;
        functionName?: 'grantRole';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'grantRole', TMode>({
    abi: oldTokenABI,
    functionName: 'grantRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function useOldTokenIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & { functionName?: 'increaseAllowance' }
    : UseContractWriteConfig<typeof oldTokenABI, 'increaseAllowance', TMode> & {
        abi?: never;
        functionName?: 'increaseAllowance';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'increaseAllowance', TMode>({
    abi: oldTokenABI,
    functionName: 'increaseAllowance',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"initialize"`.
 */
export function useOldTokenInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof oldTokenABI, 'initialize', TMode> & {
        abi?: never;
        functionName?: 'initialize';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'initialize', TMode>({
    abi: oldTokenABI,
    functionName: 'initialize',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"mint"`.
 */
export function useOldTokenMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof oldTokenABI, 'mint', TMode> & {
        abi?: never;
        functionName?: 'mint';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'mint', TMode>({
    abi: oldTokenABI,
    functionName: 'mint',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"pause"`.
 */
export function useOldTokenPause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'pause'
        >['request']['abi'],
        'pause',
        TMode
      > & { functionName?: 'pause' }
    : UseContractWriteConfig<typeof oldTokenABI, 'pause', TMode> & {
        abi?: never;
        functionName?: 'pause';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'pause', TMode>({
    abi: oldTokenABI,
    functionName: 'pause',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"renounceRole"`.
 */
export function useOldTokenRenounceRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'renounceRole'
        >['request']['abi'],
        'renounceRole',
        TMode
      > & { functionName?: 'renounceRole' }
    : UseContractWriteConfig<typeof oldTokenABI, 'renounceRole', TMode> & {
        abi?: never;
        functionName?: 'renounceRole';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'renounceRole', TMode>({
    abi: oldTokenABI,
    functionName: 'renounceRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"revokeRole"`.
 */
export function useOldTokenRevokeRole<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'revokeRole'
        >['request']['abi'],
        'revokeRole',
        TMode
      > & { functionName?: 'revokeRole' }
    : UseContractWriteConfig<typeof oldTokenABI, 'revokeRole', TMode> & {
        abi?: never;
        functionName?: 'revokeRole';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'revokeRole', TMode>({
    abi: oldTokenABI,
    functionName: 'revokeRole',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"transfer"`.
 */
export function useOldTokenTransfer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof oldTokenABI, 'transfer', TMode> & {
        abi?: never;
        functionName?: 'transfer';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'transfer', TMode>({
    abi: oldTokenABI,
    functionName: 'transfer',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useOldTokenTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof oldTokenABI, 'transferFrom', TMode> & {
        abi?: never;
        functionName?: 'transferFrom';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'transferFrom', TMode>({
    abi: oldTokenABI,
    functionName: 'transferFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"unpause"`.
 */
export function useOldTokenUnpause<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof oldTokenABI,
          'unpause'
        >['request']['abi'],
        'unpause',
        TMode
      > & { functionName?: 'unpause' }
    : UseContractWriteConfig<typeof oldTokenABI, 'unpause', TMode> & {
        abi?: never;
        functionName?: 'unpause';
      } = {} as any,
) {
  return useContractWrite<typeof oldTokenABI, 'unpause', TMode>({
    abi: oldTokenABI,
    functionName: 'unpause',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__.
 */
export function usePrepareOldTokenWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareOldTokenApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'approve'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareOldTokenBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'burn'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'burn'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"burnFrom"`.
 */
export function usePrepareOldTokenBurnFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'burnFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'burnFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'burnFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function usePrepareOldTokenDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'decreaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'decreaseAllowance'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"grantRole"`.
 */
export function usePrepareOldTokenGrantRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'grantRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'grantRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'grantRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function usePrepareOldTokenIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'increaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'increaseAllowance'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareOldTokenInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'initialize'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareOldTokenMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'mint'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"pause"`.
 */
export function usePrepareOldTokenPause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'pause'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'pause'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"renounceRole"`.
 */
export function usePrepareOldTokenRenounceRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'renounceRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'renounceRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'renounceRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"revokeRole"`.
 */
export function usePrepareOldTokenRevokeRole(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'revokeRole'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'revokeRole',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'revokeRole'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareOldTokenTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'transfer'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareOldTokenTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'transferFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oldTokenABI}__ and `functionName` set to `"unpause"`.
 */
export function usePrepareOldTokenUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oldTokenABI, 'unpause'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oldTokenABI,
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof oldTokenABI, 'unpause'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link oldTokenABI}__.
 */
export function useOldTokenEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof oldTokenABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: oldTokenABI,
    ...config,
  } as UseContractEventConfig<typeof oldTokenABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link oldTokenABI}__ and `eventName` set to `"Approval"`.
 */
export function useOldTokenApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof oldTokenABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: oldTokenABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof oldTokenABI, 'Approval'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link oldTokenABI}__ and `eventName` set to `"Initialized"`.
 */
export function useOldTokenInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof oldTokenABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: oldTokenABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof oldTokenABI, 'Initialized'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link oldTokenABI}__ and `eventName` set to `"Paused"`.
 */
export function useOldTokenPausedEvent(
  config: Omit<
    UseContractEventConfig<typeof oldTokenABI, 'Paused'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: oldTokenABI,
    eventName: 'Paused',
    ...config,
  } as UseContractEventConfig<typeof oldTokenABI, 'Paused'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link oldTokenABI}__ and `eventName` set to `"RoleAdminChanged"`.
 */
export function useOldTokenRoleAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof oldTokenABI, 'RoleAdminChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: oldTokenABI,
    eventName: 'RoleAdminChanged',
    ...config,
  } as UseContractEventConfig<typeof oldTokenABI, 'RoleAdminChanged'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link oldTokenABI}__ and `eventName` set to `"RoleGranted"`.
 */
export function useOldTokenRoleGrantedEvent(
  config: Omit<
    UseContractEventConfig<typeof oldTokenABI, 'RoleGranted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: oldTokenABI,
    eventName: 'RoleGranted',
    ...config,
  } as UseContractEventConfig<typeof oldTokenABI, 'RoleGranted'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link oldTokenABI}__ and `eventName` set to `"RoleRevoked"`.
 */
export function useOldTokenRoleRevokedEvent(
  config: Omit<
    UseContractEventConfig<typeof oldTokenABI, 'RoleRevoked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: oldTokenABI,
    eventName: 'RoleRevoked',
    ...config,
  } as UseContractEventConfig<typeof oldTokenABI, 'RoleRevoked'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link oldTokenABI}__ and `eventName` set to `"Transfer"`.
 */
export function useOldTokenTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof oldTokenABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: oldTokenABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof oldTokenABI, 'Transfer'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link oldTokenABI}__ and `eventName` set to `"Unpaused"`.
 */
export function useOldTokenUnpausedEvent(
  config: Omit<
    UseContractEventConfig<typeof oldTokenABI, 'Unpaused'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: oldTokenABI,
    eventName: 'Unpaused',
    ...config,
  } as UseContractEventConfig<typeof oldTokenABI, 'Unpaused'>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__.
 */
export function usePancakePairRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 */
export function usePancakePairDomainSeparator<
  TFunctionName extends 'DOMAIN_SEPARATOR',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'DOMAIN_SEPARATOR',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"MINIMUM_LIQUIDITY"`.
 */
export function usePancakePairMinimumLiquidity<
  TFunctionName extends 'MINIMUM_LIQUIDITY',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'MINIMUM_LIQUIDITY',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"PERMIT_TYPEHASH"`.
 */
export function usePancakePairPermitTypehash<
  TFunctionName extends 'PERMIT_TYPEHASH',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'PERMIT_TYPEHASH',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"allowance"`.
 */
export function usePancakePairAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"balanceOf"`.
 */
export function usePancakePairBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"decimals"`.
 */
export function usePancakePairDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"factory"`.
 */
export function usePancakePairFactory<
  TFunctionName extends 'factory',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'factory',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"getReserves"`.
 */
export function usePancakePairGetReserves<
  TFunctionName extends 'getReserves',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'getReserves',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"kLast"`.
 */
export function usePancakePairKLast<
  TFunctionName extends 'kLast',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'kLast',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"name"`.
 */
export function usePancakePairName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"nonces"`.
 */
export function usePancakePairNonces<
  TFunctionName extends 'nonces',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'nonces',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"price0CumulativeLast"`.
 */
export function usePancakePairPrice0CumulativeLast<
  TFunctionName extends 'price0CumulativeLast',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'price0CumulativeLast',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"price1CumulativeLast"`.
 */
export function usePancakePairPrice1CumulativeLast<
  TFunctionName extends 'price1CumulativeLast',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'price1CumulativeLast',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"symbol"`.
 */
export function usePancakePairSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"token0"`.
 */
export function usePancakePairToken0<
  TFunctionName extends 'token0',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'token0',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"token1"`.
 */
export function usePancakePairToken1<
  TFunctionName extends 'token1',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'token1',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"totalSupply"`.
 */
export function usePancakePairTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof pancakePairABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pancakePairABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pancakePairABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof pancakePairABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pancakePairABI}__.
 */
export function usePancakePairWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pancakePairABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof pancakePairABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof pancakePairABI, TFunctionName, TMode>({
    abi: pancakePairABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"approve"`.
 */
export function usePancakePairApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pancakePairABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof pancakePairABI, 'approve', TMode> & {
        abi?: never;
        functionName?: 'approve';
      } = {} as any,
) {
  return useContractWrite<typeof pancakePairABI, 'approve', TMode>({
    abi: pancakePairABI,
    functionName: 'approve',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"burn"`.
 */
export function usePancakePairBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pancakePairABI,
          'burn'
        >['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof pancakePairABI, 'burn', TMode> & {
        abi?: never;
        functionName?: 'burn';
      } = {} as any,
) {
  return useContractWrite<typeof pancakePairABI, 'burn', TMode>({
    abi: pancakePairABI,
    functionName: 'burn',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"initialize"`.
 */
export function usePancakePairInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pancakePairABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof pancakePairABI, 'initialize', TMode> & {
        abi?: never;
        functionName?: 'initialize';
      } = {} as any,
) {
  return useContractWrite<typeof pancakePairABI, 'initialize', TMode>({
    abi: pancakePairABI,
    functionName: 'initialize',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"mint"`.
 */
export function usePancakePairMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pancakePairABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof pancakePairABI, 'mint', TMode> & {
        abi?: never;
        functionName?: 'mint';
      } = {} as any,
) {
  return useContractWrite<typeof pancakePairABI, 'mint', TMode>({
    abi: pancakePairABI,
    functionName: 'mint',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"permit"`.
 */
export function usePancakePairPermit<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pancakePairABI,
          'permit'
        >['request']['abi'],
        'permit',
        TMode
      > & { functionName?: 'permit' }
    : UseContractWriteConfig<typeof pancakePairABI, 'permit', TMode> & {
        abi?: never;
        functionName?: 'permit';
      } = {} as any,
) {
  return useContractWrite<typeof pancakePairABI, 'permit', TMode>({
    abi: pancakePairABI,
    functionName: 'permit',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"skim"`.
 */
export function usePancakePairSkim<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pancakePairABI,
          'skim'
        >['request']['abi'],
        'skim',
        TMode
      > & { functionName?: 'skim' }
    : UseContractWriteConfig<typeof pancakePairABI, 'skim', TMode> & {
        abi?: never;
        functionName?: 'skim';
      } = {} as any,
) {
  return useContractWrite<typeof pancakePairABI, 'skim', TMode>({
    abi: pancakePairABI,
    functionName: 'skim',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"swap"`.
 */
export function usePancakePairSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pancakePairABI,
          'swap'
        >['request']['abi'],
        'swap',
        TMode
      > & { functionName?: 'swap' }
    : UseContractWriteConfig<typeof pancakePairABI, 'swap', TMode> & {
        abi?: never;
        functionName?: 'swap';
      } = {} as any,
) {
  return useContractWrite<typeof pancakePairABI, 'swap', TMode>({
    abi: pancakePairABI,
    functionName: 'swap',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"sync"`.
 */
export function usePancakePairSync<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pancakePairABI,
          'sync'
        >['request']['abi'],
        'sync',
        TMode
      > & { functionName?: 'sync' }
    : UseContractWriteConfig<typeof pancakePairABI, 'sync', TMode> & {
        abi?: never;
        functionName?: 'sync';
      } = {} as any,
) {
  return useContractWrite<typeof pancakePairABI, 'sync', TMode>({
    abi: pancakePairABI,
    functionName: 'sync',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"transfer"`.
 */
export function usePancakePairTransfer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pancakePairABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof pancakePairABI, 'transfer', TMode> & {
        abi?: never;
        functionName?: 'transfer';
      } = {} as any,
) {
  return useContractWrite<typeof pancakePairABI, 'transfer', TMode>({
    abi: pancakePairABI,
    functionName: 'transfer',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePancakePairTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pancakePairABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof pancakePairABI, 'transferFrom', TMode> & {
        abi?: never;
        functionName?: 'transferFrom';
      } = {} as any,
) {
  return useContractWrite<typeof pancakePairABI, 'transferFrom', TMode>({
    abi: pancakePairABI,
    functionName: 'transferFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pancakePairABI}__.
 */
export function usePreparePancakePairWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pancakePairABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pancakePairABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof pancakePairABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"approve"`.
 */
export function usePreparePancakePairApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pancakePairABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pancakePairABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pancakePairABI, 'approve'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"burn"`.
 */
export function usePreparePancakePairBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pancakePairABI, 'burn'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pancakePairABI,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pancakePairABI, 'burn'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"initialize"`.
 */
export function usePreparePancakePairInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pancakePairABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pancakePairABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pancakePairABI, 'initialize'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"mint"`.
 */
export function usePreparePancakePairMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pancakePairABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pancakePairABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pancakePairABI, 'mint'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"permit"`.
 */
export function usePreparePancakePairPermit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pancakePairABI, 'permit'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pancakePairABI,
    functionName: 'permit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pancakePairABI, 'permit'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"skim"`.
 */
export function usePreparePancakePairSkim(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pancakePairABI, 'skim'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pancakePairABI,
    functionName: 'skim',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pancakePairABI, 'skim'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"swap"`.
 */
export function usePreparePancakePairSwap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pancakePairABI, 'swap'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pancakePairABI,
    functionName: 'swap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pancakePairABI, 'swap'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"sync"`.
 */
export function usePreparePancakePairSync(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pancakePairABI, 'sync'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pancakePairABI,
    functionName: 'sync',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pancakePairABI, 'sync'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"transfer"`.
 */
export function usePreparePancakePairTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pancakePairABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pancakePairABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pancakePairABI, 'transfer'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pancakePairABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePreparePancakePairTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pancakePairABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pancakePairABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pancakePairABI, 'transferFrom'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pancakePairABI}__.
 */
export function usePancakePairEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof pancakePairABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: pancakePairABI,
    ...config,
  } as UseContractEventConfig<typeof pancakePairABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pancakePairABI}__ and `eventName` set to `"Approval"`.
 */
export function usePancakePairApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof pancakePairABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pancakePairABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof pancakePairABI, 'Approval'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pancakePairABI}__ and `eventName` set to `"Burn"`.
 */
export function usePancakePairBurnEvent(
  config: Omit<
    UseContractEventConfig<typeof pancakePairABI, 'Burn'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pancakePairABI,
    eventName: 'Burn',
    ...config,
  } as UseContractEventConfig<typeof pancakePairABI, 'Burn'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pancakePairABI}__ and `eventName` set to `"Mint"`.
 */
export function usePancakePairMintEvent(
  config: Omit<
    UseContractEventConfig<typeof pancakePairABI, 'Mint'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pancakePairABI,
    eventName: 'Mint',
    ...config,
  } as UseContractEventConfig<typeof pancakePairABI, 'Mint'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pancakePairABI}__ and `eventName` set to `"Swap"`.
 */
export function usePancakePairSwapEvent(
  config: Omit<
    UseContractEventConfig<typeof pancakePairABI, 'Swap'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pancakePairABI,
    eventName: 'Swap',
    ...config,
  } as UseContractEventConfig<typeof pancakePairABI, 'Swap'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pancakePairABI}__ and `eventName` set to `"Sync"`.
 */
export function usePancakePairSyncEvent(
  config: Omit<
    UseContractEventConfig<typeof pancakePairABI, 'Sync'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pancakePairABI,
    eventName: 'Sync',
    ...config,
  } as UseContractEventConfig<typeof pancakePairABI, 'Sync'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pancakePairABI}__ and `eventName` set to `"Transfer"`.
 */
export function usePancakePairTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof pancakePairABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: pancakePairABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof pancakePairABI, 'Transfer'>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link rewardABI}__.
 */
export function useRewardRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof rewardABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof rewardABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: rewardABI, ...config } as UseContractReadConfig<
    typeof rewardABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"bondedToken"`.
 */
export function useRewardBondedToken<
  TFunctionName extends 'bondedToken',
  TSelectData = ReadContractResult<typeof rewardABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof rewardABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: rewardABI,
    functionName: 'bondedToken',
    ...config,
  } as UseContractReadConfig<typeof rewardABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"muonToken"`.
 */
export function useRewardMuonToken<
  TFunctionName extends 'muonToken',
  TSelectData = ReadContractResult<typeof rewardABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof rewardABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: rewardABI,
    functionName: 'muonToken',
    ...config,
  } as UseContractReadConfig<typeof rewardABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"owner"`.
 */
export function useRewardOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof rewardABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof rewardABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: rewardABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof rewardABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"signer"`.
 */
export function useRewardSigner<
  TFunctionName extends 'signer',
  TSelectData = ReadContractResult<typeof rewardABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof rewardABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: rewardABI,
    functionName: 'signer',
    ...config,
  } as UseContractReadConfig<typeof rewardABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"totalReward"`.
 */
export function useRewardTotalReward<
  TFunctionName extends 'totalReward',
  TSelectData = ReadContractResult<typeof rewardABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof rewardABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: rewardABI,
    functionName: 'totalReward',
    ...config,
  } as UseContractReadConfig<typeof rewardABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"users"`.
 */
export function useRewardUsers<
  TFunctionName extends 'users',
  TSelectData = ReadContractResult<typeof rewardABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof rewardABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: rewardABI,
    functionName: 'users',
    ...config,
  } as UseContractReadConfig<typeof rewardABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link rewardABI}__.
 */
export function useRewardWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof rewardABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof rewardABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof rewardABI, TFunctionName, TMode>({
    abi: rewardABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"claimReward"`.
 */
export function useRewardClaimReward<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof rewardABI,
          'claimReward'
        >['request']['abi'],
        'claimReward',
        TMode
      > & { functionName?: 'claimReward' }
    : UseContractWriteConfig<typeof rewardABI, 'claimReward', TMode> & {
        abi?: never;
        functionName?: 'claimReward';
      } = {} as any,
) {
  return useContractWrite<typeof rewardABI, 'claimReward', TMode>({
    abi: rewardABI,
    functionName: 'claimReward',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"migrate"`.
 */
export function useRewardMigrate<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof rewardABI,
          'migrate'
        >['request']['abi'],
        'migrate',
        TMode
      > & { functionName?: 'migrate' }
    : UseContractWriteConfig<typeof rewardABI, 'migrate', TMode> & {
        abi?: never;
        functionName?: 'migrate';
      } = {} as any,
) {
  return useContractWrite<typeof rewardABI, 'migrate', TMode>({
    abi: rewardABI,
    functionName: 'migrate',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useRewardRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof rewardABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof rewardABI, 'renounceOwnership', TMode> & {
        abi?: never;
        functionName?: 'renounceOwnership';
      } = {} as any,
) {
  return useContractWrite<typeof rewardABI, 'renounceOwnership', TMode>({
    abi: rewardABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"setSigner"`.
 */
export function useRewardSetSigner<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof rewardABI,
          'setSigner'
        >['request']['abi'],
        'setSigner',
        TMode
      > & { functionName?: 'setSigner' }
    : UseContractWriteConfig<typeof rewardABI, 'setSigner', TMode> & {
        abi?: never;
        functionName?: 'setSigner';
      } = {} as any,
) {
  return useContractWrite<typeof rewardABI, 'setSigner', TMode>({
    abi: rewardABI,
    functionName: 'setSigner',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useRewardTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof rewardABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof rewardABI, 'transferOwnership', TMode> & {
        abi?: never;
        functionName?: 'transferOwnership';
      } = {} as any,
) {
  return useContractWrite<typeof rewardABI, 'transferOwnership', TMode>({
    abi: rewardABI,
    functionName: 'transferOwnership',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"withdraw"`.
 */
export function useRewardWithdraw<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof rewardABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof rewardABI, 'withdraw', TMode> & {
        abi?: never;
        functionName?: 'withdraw';
      } = {} as any,
) {
  return useContractWrite<typeof rewardABI, 'withdraw', TMode>({
    abi: rewardABI,
    functionName: 'withdraw',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link rewardABI}__.
 */
export function usePrepareRewardWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof rewardABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: rewardABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof rewardABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"claimReward"`.
 */
export function usePrepareRewardClaimReward(
  config: Omit<
    UsePrepareContractWriteConfig<typeof rewardABI, 'claimReward'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: rewardABI,
    functionName: 'claimReward',
    ...config,
  } as UsePrepareContractWriteConfig<typeof rewardABI, 'claimReward'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"migrate"`.
 */
export function usePrepareRewardMigrate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof rewardABI, 'migrate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: rewardABI,
    functionName: 'migrate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof rewardABI, 'migrate'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareRewardRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof rewardABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: rewardABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof rewardABI, 'renounceOwnership'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"setSigner"`.
 */
export function usePrepareRewardSetSigner(
  config: Omit<
    UsePrepareContractWriteConfig<typeof rewardABI, 'setSigner'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: rewardABI,
    functionName: 'setSigner',
    ...config,
  } as UsePrepareContractWriteConfig<typeof rewardABI, 'setSigner'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareRewardTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof rewardABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: rewardABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof rewardABI, 'transferOwnership'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link rewardABI}__ and `functionName` set to `"withdraw"`.
 */
export function usePrepareRewardWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof rewardABI, 'withdraw'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: rewardABI,
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof rewardABI, 'withdraw'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link rewardABI}__.
 */
export function useRewardEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof rewardABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: rewardABI,
    ...config,
  } as UseContractEventConfig<typeof rewardABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link rewardABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useRewardOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof rewardABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: rewardABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof rewardABI, 'OwnershipTransferred'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link rewardABI}__ and `eventName` set to `"RewardClaimed"`.
 */
export function useRewardRewardClaimedEvent(
  config: Omit<
    UseContractEventConfig<typeof rewardABI, 'RewardClaimed'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: rewardABI,
    eventName: 'RewardClaimed',
    ...config,
  } as UseContractEventConfig<typeof rewardABI, 'RewardClaimed'>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc20ABI, ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20Decimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"name"`.
 */
export function useErc20Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20ABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, TFunctionName, TMode>({
    abi: erc20ABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc20ABI, 'approve', TMode> & {
        abi?: never;
        functionName?: 'approve';
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'approve', TMode>({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof erc20ABI, 'transfer', TMode> & {
        abi?: never;
        functionName?: 'transfer';
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transfer', TMode>({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc20ABI, 'transferFrom', TMode> & {
        abi?: never;
        functionName?: 'transferFrom';
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transferFrom', TMode>({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function usePrepareErc20Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20Transfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Approval'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Transfer'>);
}

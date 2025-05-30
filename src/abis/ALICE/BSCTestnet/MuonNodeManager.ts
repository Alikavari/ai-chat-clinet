export default [
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'string', name: 'key', type: 'string'},
      {
        indexed: false,
        internalType: 'string',
        name: 'value',
        type: 'string'
      }
    ],
    name: 'ConfigSet',
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
        indexed: true,
        internalType: 'uint64',
        name: 'nodeId',
        type: 'uint64'
      },
      {
        components: [
          {internalType: 'uint64', name: 'id', type: 'uint64'},
          {
            internalType: 'address',
            name: 'nodeAddress',
            type: 'address'
          },
          {internalType: 'address', name: 'stakerAddress', type: 'address'},
          {
            internalType: 'string',
            name: 'peerId',
            type: 'string'
          },
          {internalType: 'bool', name: 'active', type: 'bool'},
          {
            internalType: 'uint8',
            name: 'tier',
            type: 'uint8'
          },
          {internalType: 'uint64[]', name: 'roles', type: 'uint64[]'},
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256'
          },
          {internalType: 'uint256', name: 'endTime', type: 'uint256'},
          {
            internalType: 'uint256',
            name: 'lastEditTime',
            type: 'uint256'
          }
        ],
        indexed: false,
        internalType: 'struct IMuonNodeManager.Node',
        name: 'node',
        type: 'tuple'
      }
    ],
    name: 'NodeAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{indexed: true, internalType: 'uint64', name: 'nodeId', type: 'uint64'}],
    name: 'NodeDeactivated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'uint64', name: 'nodeId', type: 'uint64'},
      {
        indexed: true,
        internalType: 'uint64',
        name: 'roleId',
        type: 'uint64'
      }
    ],
    name: 'NodeRoleSet',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'uint64', name: 'nodeId', type: 'uint64'},
      {
        indexed: true,
        internalType: 'uint64',
        name: 'roleId',
        type: 'uint64'
      }
    ],
    name: 'NodeRoleUnset',
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
      {indexed: true, internalType: 'uint64', name: 'nodeId', type: 'uint64'},
      {
        indexed: true,
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8'
      }
    ],
    name: 'TierSet',
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
      {internalType: 'address', name: 'nodeAddress', type: 'address'},
      {
        internalType: 'address',
        name: 'stakerAddress',
        type: 'address'
      },
      {internalType: 'string', name: 'peerId', type: 'string'},
      {
        internalType: 'bool',
        name: 'active',
        type: 'bool'
      }
    ],
    name: 'addNode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'string', name: '', type: 'string'}],
    name: 'configs',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint64', name: 'nodeId', type: 'uint64'}],
    name: 'deactiveNode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'editLogs',
    outputs: [
      {internalType: 'uint64', name: 'nodeId', type: 'uint64'},
      {
        internalType: 'uint256',
        name: 'editTime',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'lastEditTime', type: 'uint256'},
      {
        internalType: 'uint64',
        name: 'startId',
        type: 'uint64'
      },
      {internalType: 'uint64', name: 'endId', type: 'uint64'}
    ],
    name: 'getAllNodes',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'id',
            type: 'uint64'
          },
          {internalType: 'address', name: 'nodeAddress', type: 'address'},
          {
            internalType: 'address',
            name: 'stakerAddress',
            type: 'address'
          },
          {internalType: 'string', name: 'peerId', type: 'string'},
          {
            internalType: 'bool',
            name: 'active',
            type: 'bool'
          },
          {internalType: 'uint8', name: 'tier', type: 'uint8'},
          {
            internalType: 'uint64[]',
            name: 'roles',
            type: 'uint64[]'
          },
          {internalType: 'uint256', name: 'startTime', type: 'uint256'},
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256'
          },
          {internalType: 'uint256', name: 'lastEditTime', type: 'uint256'}
        ],
        internalType: 'struct IMuonNodeManager.Node[]',
        name: 'nodesList',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'lastEditTime', type: 'uint256'},
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      },
      {internalType: 'uint16', name: 'maxNodesToRetrieve', type: 'uint16'}
    ],
    name: 'getEditedNodes',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'id',
            type: 'uint64'
          },
          {internalType: 'address', name: 'nodeAddress', type: 'address'},
          {
            internalType: 'address',
            name: 'stakerAddress',
            type: 'address'
          },
          {internalType: 'string', name: 'peerId', type: 'string'},
          {
            internalType: 'bool',
            name: 'active',
            type: 'bool'
          },
          {internalType: 'uint8', name: 'tier', type: 'uint8'},
          {
            internalType: 'uint64[]',
            name: 'roles',
            type: 'uint64[]'
          },
          {internalType: 'uint256', name: 'startTime', type: 'uint256'},
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256'
          },
          {internalType: 'uint256', name: 'lastEditTime', type: 'uint256'}
        ],
        internalType: 'struct IMuonNodeManager.Node[]',
        name: 'nodesList',
        type: 'tuple[]'
      },
      {internalType: 'uint256', name: 'lastIndex', type: 'uint256'}
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'string[]', name: 'configKeys', type: 'string[]'}],
    name: 'getInfo',
    outputs: [
      {internalType: 'uint256', name: '', type: 'uint256'},
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64'
      },
      {internalType: 'string[]', name: '', type: 'string[]'}
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint64', name: 'nodeId', type: 'uint64'}],
    name: 'getNode',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'id',
            type: 'uint64'
          },
          {internalType: 'address', name: 'nodeAddress', type: 'address'},
          {
            internalType: 'address',
            name: 'stakerAddress',
            type: 'address'
          },
          {internalType: 'string', name: 'peerId', type: 'string'},
          {
            internalType: 'bool',
            name: 'active',
            type: 'bool'
          },
          {internalType: 'uint8', name: 'tier', type: 'uint8'},
          {
            internalType: 'uint64[]',
            name: 'roles',
            type: 'uint64[]'
          },
          {internalType: 'uint256', name: 'startTime', type: 'uint256'},
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256'
          },
          {internalType: 'uint256', name: 'lastEditTime', type: 'uint256'}
        ],
        internalType: 'struct IMuonNodeManager.Node',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint64', name: 'nodeId', type: 'uint64'}],
    name: 'getNodeRoles',
    outputs: [{internalType: 'uint64[]', name: '', type: 'uint64[]'}],
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
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'lastNodeId',
    outputs: [{internalType: 'uint64', name: '', type: 'uint64'}],
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
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'nodeAddressIds',
    outputs: [{internalType: 'uint64', name: '', type: 'uint64'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: 'nodeAddress', type: 'address'}],
    name: 'nodeAddressInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'id',
            type: 'uint64'
          },
          {internalType: 'address', name: 'nodeAddress', type: 'address'},
          {
            internalType: 'address',
            name: 'stakerAddress',
            type: 'address'
          },
          {internalType: 'string', name: 'peerId', type: 'string'},
          {
            internalType: 'bool',
            name: 'active',
            type: 'bool'
          },
          {internalType: 'uint8', name: 'tier', type: 'uint8'},
          {
            internalType: 'uint64[]',
            name: 'roles',
            type: 'uint64[]'
          },
          {internalType: 'uint256', name: 'startTime', type: 'uint256'},
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256'
          },
          {internalType: 'uint256', name: 'lastEditTime', type: 'uint256'}
        ],
        internalType: 'struct IMuonNodeManager.Node',
        name: 'node',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'uint64', name: 'nodeId', type: 'uint64'},
      {
        internalType: 'uint64',
        name: 'roleId',
        type: 'uint64'
      }
    ],
    name: 'nodeHasRole',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'uint64', name: '', type: 'uint64'}],
    name: 'nodes',
    outputs: [
      {internalType: 'uint64', name: 'id', type: 'uint64'},
      {
        internalType: 'address',
        name: 'nodeAddress',
        type: 'address'
      },
      {internalType: 'address', name: 'stakerAddress', type: 'address'},
      {
        internalType: 'string',
        name: 'peerId',
        type: 'string'
      },
      {internalType: 'bool', name: 'active', type: 'bool'},
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8'
      },
      {internalType: 'uint256', name: 'startTime', type: 'uint256'},
      {
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256'
      },
      {internalType: 'uint256', name: 'lastEditTime', type: 'uint256'}
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'uint64', name: '', type: 'uint64'},
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64'
      }
    ],
    name: 'nodesRoles',
    outputs: [{internalType: 'uint16', name: '', type: 'uint16'}],
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
    inputs: [
      {internalType: 'string', name: 'key', type: 'string'},
      {
        internalType: 'string',
        name: 'val',
        type: 'string'
      }
    ],
    name: 'setConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'uint64', name: 'nodeId', type: 'uint64'},
      {
        internalType: 'uint64',
        name: 'roleId',
        type: 'uint64'
      }
    ],
    name: 'setNodeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {internalType: 'uint64', name: 'nodeId', type: 'uint64'},
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8'
      }
    ],
    name: 'setTier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'stakerAddressIds',
    outputs: [{internalType: 'uint64', name: '', type: 'uint64'}],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{internalType: 'address', name: 'stakerAddress', type: 'address'}],
    name: 'stakerAddressInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'id',
            type: 'uint64'
          },
          {internalType: 'address', name: 'nodeAddress', type: 'address'},
          {
            internalType: 'address',
            name: 'stakerAddress',
            type: 'address'
          },
          {internalType: 'string', name: 'peerId', type: 'string'},
          {
            internalType: 'bool',
            name: 'active',
            type: 'bool'
          },
          {internalType: 'uint8', name: 'tier', type: 'uint8'},
          {
            internalType: 'uint64[]',
            name: 'roles',
            type: 'uint64[]'
          },
          {internalType: 'uint256', name: 'startTime', type: 'uint256'},
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256'
          },
          {internalType: 'uint256', name: 'lastEditTime', type: 'uint256'}
        ],
        internalType: 'struct IMuonNodeManager.Node',
        name: 'node',
        type: 'tuple'
      }
    ],
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
    inputs: [
      {internalType: 'uint64', name: 'nodeId', type: 'uint64'},
      {
        internalType: 'uint64',
        name: 'roleId',
        type: 'uint64'
      }
    ],
    name: 'unsetNodeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

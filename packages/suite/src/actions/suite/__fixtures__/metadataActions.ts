import { METADATA } from '@suite-actions/constants';

const getDeviceMetadataKey = [
    {
        description: `Metadata not enabled`,
        initialState: {
            metadata: { enabled: false },
        },
    },
    {
        description: `Device without state`,
        initialState: {
            metadata: { enabled: true },
            device: { state: undefined },
        },
    },
    {
        description: `Device metadata cancelled`,
        initialState: {
            metadata: { enabled: true },
            device: { state: 'device-state', metadata: { status: 'cancelled' } },
        },
    },
    {
        description: `Device metadata already enabled`,
        initialState: {
            metadata: { enabled: true },
            device: { state: 'device-state', metadata: { status: 'enabled' } },
        },
    },
    {
        description: `Master key cancelled`,
        connect: {
            success: false,
        },
        initialState: {
            metadata: { enabled: true },
            device: { state: 'device-state', metadata: { status: 'disabled' } },
        },
        result: {
            type: METADATA.SET_MASTER_KEY,
            payload: {
                metadata: {
                    status: 'cancelled',
                },
            },
        },
    },
    // {
    //     description: `Master key successfully generated`,
    //     initialState: {
    //         metadata: { enabled: true },
    //         device: { state: 'device-state', metadata: { status: 'disabled' } },
    //     },
    //     result: {
    //         type: MODAL.OPEN_USER_CONTEXT,
    //     },
    // },

    {
        description: `Master key successfully generated, provider already connected`,
        initialState: {
            metadata: {
                enabled: true,
                provider: { type: 'dropbox', user: 'User Name', token: 'oauth-token' },
            },
            device: { state: 'device-state', metadata: { status: 'disabled' } },
        },
        result: {
            type: METADATA.SET_MASTER_KEY,
            payload: {
                metadata: {
                    aesKey: 'eb0f1f0238c7fa8018c6101f4e887b871ce07b99d01d5ea57089b82f93149557',
                    fileName: '039fe833cba71d84b7bf4c99d44468ee48e311e741cbfcd6daf5263f584ef9f6',
                    key: 'CKValue',
                    status: 'enabled',
                },
            },
        },
    },
];

const setAccountMetadataKey = [
    {
        description: `Device without master key`,
        initialState: {
            device: { metadata: { status: 'disabled' } },
        },
        account: { key: 'account-key' },
        result: { key: 'account-key' },
    },
    {
        description: `Device with invalid master key`,
        initialState: {
            device: { metadata: { status: 'enabled', key: { unexpected: 'key-format' } } },
        },
        account: { key: 'account-key', metadata: { key: 'A', fileName: '' } },
        result: { key: 'account-key', metadata: { key: 'A', fileName: '' } },
    },
    {
        description: `Account with invalid key`,
        initialState: {
            device: { metadata: { status: 'enabled', key: 'A' } },
        },
        account: { key: 'account-key', metadata: { key: undefined } },
        result: { key: 'account-key', metadata: { key: undefined } },
    },
    {
        description: `Account m/49'/0'/0'`,
        initialState: {
            device: {
                metadata: {
                    status: 'enabled',
                    key: '20c8bf0701213cdcf4c2f56fd0096c1772322d42fb9c4d0ddf6bb122d713d2f3',
                },
            },
        },
        account: {
            metadata: {
                key:
                    'xpub6CVKsQYXc9awxgV1tWbG4foDvdcnieK2JkbpPEBKB5WwAPKBZ1mstLbKVB4ov7QzxzjaxNK6EfmNY5Jsk2cG26EVcEkycGW4tchT2dyUhrx',
            },
        },
        result: {
            metadata: {
                fileName: '828652b66f2e6f919fbb7fe4c9609d4891ed531c6fac4c28441e53ebe577ac85',
                aesKey: '9bc3736f0b45cd681854a724b5bba67b9da1e50bc9983fd2dd56e53e74b75480',
            },
        },
    },
];

const addDeviceMetadata = [
    {
        description: `Without provider`,
        initialState: {
            metadata: {},
        },
        params: {},
    },
    {
        description: `Unknown provider`,
        initialState: {
            metadata: { provider: { type: 'unknown-provider' } },
        },
        params: {},
        result: undefined,
    },
    {
        description: `Without device`,
        initialState: {
            metadata: { provider: { type: 'dropbox', key: 'A' } },
            device: { state: undefined },
        },
        params: { type: 'walletLabel', deviceState: 'device-state' },
        result: undefined,
    },
    {
        description: `Add walletLabel`,
        initialState: {
            metadata: { provider: { type: 'dropbox', key: 'A' } },
            device: {
                state: 'device-state',
                metadata: {
                    aesKey: 'eb0f1f0238c7fa8018c6101f4e887b871ce07b99d01d5ea57089b82f93149557',
                    fileName: '039fe833cba71d84b7bf4c99d44468ee48e311e741cbfcd6daf5263f584ef9f6',
                    key: 'CKValue',
                    status: 'enabled',
                },
            },
        },
        params: { type: 'walletLabel', deviceState: 'device-state', value: 'Custom label' },
        result: {
            type: METADATA.WALLET_ADD,
            payload: { deviceState: 'device-state', walletLabel: 'Custom label' },
        },
    },
];

const addAccountMetadata = [
    {
        description: `Without provider`,
        initialState: {
            metadata: {},
        },
        params: {},
        result: undefined,
    },
    {
        description: `Without account`,
        initialState: {
            metadata: { provider: { type: 'dropbox', key: 'A' } },
        },
        params: {},
        result: undefined,
    },
    {
        description: `add outputLabel`,
        initialState: {
            metadata: { provider: { type: 'drobox', key: 'A' } },
            device: {
                metadata: { status: 'enabled', key: 'B' },
            },
            accounts: [
                {
                    metadata: {
                        aesKey: '9bc3736f0b45cd681854a724b5bba67b9da1e50bc9983fd2dd56e53e74b75480',
                        outputLabels: {},
                    },
                },
            ],
        },
        params: {
            type: 'outputLabel',
            txid: 'TXID',
            outputIndex: 0,
            value: 'Foo',
        },
        result: {
            type: METADATA.ACCOUNT_ADD,
            payload: {
                metadata: {
                    outputLabels: {
                        TXID: {
                            0: 'Foo',
                        },
                    },
                },
            },
        },
    },
    {
        description: `remove outputLabel`,
        initialState: {
            metadata: { provider: { type: 'dropbox', key: 'A' } },
            device: {
                metadata: { status: 'enabled', key: 'B' },
            },
            accounts: [
                {
                    metadata: {
                        aesKey: '9bc3736f0b45cd681854a724b5bba67b9da1e50bc9983fd2dd56e53e74b75480',
                        outputLabels: {
                            TXID: {
                                0: 'Foo',
                            },
                        },
                    },
                },
            ],
        },
        params: {
            type: 'outputLabel',
            txid: 'TXID',
            outputIndex: 0,
            value: '', // empty string removes value
        },
        result: {
            type: METADATA.ACCOUNT_ADD,
            payload: {
                metadata: {
                    outputLabels: {
                        TXID: {
                            0: 'Foo',
                        },
                    },
                },
            },
        },
    },
];

const fetchMetadata = [
    {
        description: `Without provider`,
        initialState: {
            metadata: undefined,
        },
        result: undefined,
    },
    {
        description: 'Metadata not enabled',
        initialState: {
            metadata: {
                enabled: true,
                provider: {
                    token: 'foo',
                    type: 'google',
                    user: 'batman',
                },
            },
            device: { state: 'device-state', metadata: { status: 'cancelled' } },
            accounts: [],
        },
        params: 'device-state',
    },
    {
        description: 'Metadata enabled - decode device metadata',
        initialState: {
            metadata: {
                enabled: true,
                provider: { type: 'dropbox', user: 'User Name', token: 'oauth-token' },
            },
            device: {
                state: 'mkUHEWSY9zaq4A4RjicJSPSPPxZ1dr2CfF@B45F1224E1EFDEE921BE328F:undefined',
                metadata: {
                    status: 'enabled',
                    aesKey: 'f2734778f6b87864a02fc1e0ad2c69fcfc1160d86fff43b5acbef6f90772cba1',
                },
            },
        },
        params: 'mkUHEWSY9zaq4A4RjicJSPSPPxZ1dr2CfF@B45F1224E1EFDEE921BE328F:undefined',
        result: [
            {
                type: '@metadata/wallet-loaded',
                payload: {
                    deviceState:
                        'mkUHEWSY9zaq4A4RjicJSPSPPxZ1dr2CfF@B45F1224E1EFDEE921BE328F:undefined',
                    walletLabel: 'k',
                },
            },
        ],
    },
    // todo: decode account metadata
];

const connectProvider = [
    {
        description: 'Dropbox',
        initialState: {
            metadata: undefined,
        },
        params: 'dropbox',
        result: [
            {
                type: '@metadata/set-provider',
                payload: { type: 'dropbox', token: 'token-haf-mnau', user: 'haf' },
            },
        ],
    },
    // todo: google provider
    // todo: singleton (instance) behavior
];

const addMetadata = [
    {
        description: 'when disabled globally, should return immediately',
        initialState: {
            metadata: { enabled: false },
            // device: {
            //     state: 'mmcGdEpTPqgQNRHqf3gmB5uDsEoPo2d3tp@46CE52D1ED50A900687D6BA2:undefined'
            // },
        },
        params: {
            accountKey:
                'zpub6rGTYpdEKi9Hs1boNGxPPVDvb6MnAqQhXX4ts9zSxwxEVtxnTByAScDHKca8AB2cD3RGJd9upVD7ccNLrAMR5QEYvtKqrjpTYsz8yoR6RMz-btc-mmcGdEpTPqgQNRHqf3gmB5uDsEoPo2d3tp@46CE52D1ED50A900687D6BA2:undefined',
            defaultValue: "m/84'/0'/0'",
            type: 'accountLabel',
            value: undefined,
        },
        result: [],
    },
    // {
    //     description: 'when disabled for device, needsUpdate is true',
    //     initialState: {
    //         metadata: { enabled: true },
    //         device: {
    //             state: 'mmcGdEpTPqgQNRHqf3gmB5uDsEoPo2d3tp@46CE52D1ED50A900687D6BA2:undefined',
    //             metadata: { status: 'cancelled' },
    //         },
    //         accounts: [
    //             {
    //                 metadata: {
    //                     key: 'xpub6CbvwVHQ2M4LARDZhZP8yK2vFA4tHbRhhJ2TJNCgCwCUPhLKwse3CUu1HCexAMimPmBeofxnuAW1r39DQmXPUvsMCCvzgvBV1RrrCdnKaZ4',
    //                     outputLabels: {},
    //                 },
    //             },
    //         ],
    //     },
    //     params: {
    //         accountKey:
    //             'zpub6rGTYpdEKi9Hs1boNGxPPVDvb6MnAqQhXX4ts9zSxwxEVtxnTByAScDHKca8AB2cD3RGJd9upVD7ccNLrAMR5QEYvtKqrjpTYsz8yoR6RMz-btc-mmcGdEpTPqgQNRHqf3gmB5uDsEoPo2d3tp@46CE52D1ED50A900687D6BA2:undefined',
    //         defaultValue: "m/84'/0'/0'",
    //         type: 'accountLabel',
    //         value: undefined,
    //     },
    //     result: [
    //         {
    //             type: METADATA.ENABLE,
    //             payload: true,
    //         },
    //         {
    //             type: METADATA.SET_MASTER_KEY,
    //             payload: {
    //                 deviceState:
    //                     'mmcGdEpTPqgQNRHqf3gmB5uDsEoPo2d3tp@46CE52D1ED50A900687D6BA2:undefined',
    //                 metadata: {
    //                     aesKey: 'e5a761589ac4950ae899c7ffe572e492d21864f5a5822e228e165f02c0124d53',
    //                     fileName:
    //                         '597ff11fe9d82e88d449f5aca3c7747d0d8eccc46bd64a48f29e49f4aff5dc3f',
    //                     key: 'CKValue',
    //                     status: 'enabled',
    //                 },
    //             },
    //         },
    //         {
    //             type: MODAL.OPEN_USER_CONTEXT,
    //             payload: {
    //                 decision: expect.any(Object),
    //                 type: 'metadata-provider',
    //             },
    //         },
    //         {
    //             type: MODAL.OPEN_USER_CONTEXT,
    //             payload: {
    //                 decision: expect.any(Object),
    //                 payload: expect.any(Object),
    //                 type: 'metadata-add',
    //             },
    //         },
    //     ],
    // },
];

export {
    getDeviceMetadataKey,
    setAccountMetadataKey,
    addDeviceMetadata,
    addAccountMetadata,
    fetchMetadata,
    connectProvider,
    addMetadata,
};
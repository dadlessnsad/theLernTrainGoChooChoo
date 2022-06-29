export const InfuraId = process.env.NEXT_PUBLIC_InfuraId
export const CONTRACT_ADDRESS = ""



export const NETWORKS = {

    kovan: {
        name: "kovan",
        color: "#7003DD",
        chainId: 42,
        rpcUrl: `https://kovan.infura.io/v3/${InfuraId}`,
        blockExplorer: "https://kovan.etherscan.io/",
      faucet: "https://gitter.im/kovan-testnet/faucet", // https://faucet.kovan.network/
    },
    rinkeby: {
        name: "rinkeby",
        color: "#e0d068",
        chainId: 4,
        rpcUrl: `https://rinkeby.infura.io/v3/${InfuraId}`,
        faucet: "https://faucet.rinkeby.io/",
        blockExplorer: "https://rinkeby.etherscan.io/",
    },
    ropsten: {
        name: "ropsten",
        color: "#F60D09",
        chainId: 3,
        faucet: "https://faucet.ropsten.be/",
        blockExplorer: "https://ropsten.etherscan.io/",
        rpcUrl: `https://ropsten.infura.io/v3/${InfuraId}`,
    },
    goerli: {
        name: "goerli",
        color: "#0975F6",
        chainId: 5,
        faucet: "https://goerli-faucet.slock.it/",
        blockExplorer: "https://goerli.etherscan.io/",
        rpcUrl: `https://goerli.infura.io/v3/${InfuraId}`,
    },
    mumbai: {
        name: "mumbai",
        color: "#92D9FA",
        chainId: 80001,
        price: 1,
        gasPrice: 1000000000,
        rpcUrl: "https://rpc-mumbai.maticvigil.com",
        faucet: "https://faucet.polygon.technology/",
        blockExplorer: "https://mumbai.polygonscan.com/",
    },
    kovanOptimism: {
        name: "kovanOptimism",
        color: "#f01a37",
        chainId: 69,
        blockExplorer: "https://kovan-optimistic.etherscan.io/",
        rpcUrl: `https://kovan.optimism.io`,
        gasPrice: 0,
    },
    optimism: {
        name: "optimism",
        color: "#f01a37",
        chainId: 10,
        blockExplorer: "https://optimistic.etherscan.io/",
        rpcUrl: `https://mainnet.optimism.io`,
    },
};

export const NETWORK = chainId => {
    for (const n in NETWORKS) {
        if (NETWORKS[n].chainId === chainId) {
            return NETWORKS[n];
        }
    }
}
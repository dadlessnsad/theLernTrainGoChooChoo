import { React, useState, useEffect, useCallback } from 'react'
import '../styles/globals.css'
import styles from '../styles/Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { ethers } from 'ethers'
import {CONTRACT_ADDRESS, InfuraId, NETWORKS} from '../config'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import NetworkSwitch from '../components/NetworkSwitch'

const initialNetwork = NETWORKS.rinkeby;
const USE_NETWORK_SELECTOR = true;


function MyApp({ Component, pageProps }) {
    const networkOptions = [initialNetwork.name, "kovan", "ropsten", "rinkeby"];
    const [account, setAccount] = useState(null)
    const [provider, setProvider] = useState(null)
    const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]);
    
    const targetNetwork = NETWORKS[selectedNetwork];

    async function getWe3Modal() {
        const web3modal = new Web3Modal({
            network: selectedNetwork,
            cacheProvider: false,
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        infuraId: InfuraId
                    }
                },
                coinbasewallet: {
                    package: CoinbaseWalletSDK,
                    options: {
                        appName: "DecentrAgora", // Required
                        infuraId:  InfuraId,
                        chainId: 4, 
                        darkMode: true
                    }
                }
            },
        })
        return web3modal
    }

    const Connect = useCallback(async () =>{
        try {
            const web3Modal = await getWe3Modal()
            const connect = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connect)
            const accounts = await provider.listAccounts()
            const name = await provider.lookupAddress(accounts[0])
            setProvider(provider)

            if (name) {
                setAccount(name)
            }   else {
                setAccount(accounts[0].substring(0, 6) + "..." + accounts[0].substring(36));
            }

            provider.on("chainChanged", chainId => {
                console.log(`chain changed to ${chainId}! updating providers`);
                setProvider(new ethers.providers.Web3Provider(provider));
            });

        }   catch(err) {
            console.log(err)
        }
    }, [setProvider]);

    async function Logout() {
        const web3Modal = await getWe3Modal()
        await web3Modal.clearCachedProvider();
        setTimeout(() => {
            window.location.reload();
        }, 1);
    };

    useEffect(() => {
        async function getNetwork() {
            const web3Modal = await getWe3Modal()
            if (web3Modal.cachedProvider) {
                Connect();
            }
        }
        getNetwork();
    }, [Connect]);

    return (
        <div>
            <header className={styles.Header}>
                <h1 className={styles.HeaderTitle}>dAgora Bridge</h1>
                {USE_NETWORK_SELECTOR && (
                <div >
                    <NetworkSwitch
                        networkOptions={networkOptions}
                        selectedNetwork={selectedNetwork}
                        setSelectedNetwork={setSelectedNetwork}
                    />
                </div>
            )}        
                {!account && (
                    <button className={styles.ConnectButton} onClick={Connect}>Connect Wallet</button>
                )}
                {account && USE_NETWORK_SELECTOR && (
                    <div>
                        <NetworkSwitch
                            networkOptions={networkOptions}
                            selectedNetwork={selectedNetwork}
                            setSelectedNetwork={setSelectedNetwork}
                        />
                        <button className={styles.ConnectButton} onClick={Logout}>{account}</button>
                    </div>
                )}
                {/* <NetworkDisplay
                    NETWORKCHECK={NETWORKCHECK}
                    localChainId={localChainId}
                    selectedChainId={selectedChainId}
                    targetNetwork={targetNetwork}
                    logoutOfWeb3Modal={logoutOfWeb3Modal}
                    USE_NETWORK_SELECTOR={USE_NETWORK_SELECTOR}
                /> */}
            </header>
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp

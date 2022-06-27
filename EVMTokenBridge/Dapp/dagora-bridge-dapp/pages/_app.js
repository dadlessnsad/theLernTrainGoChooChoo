import { React, useState, useEffect } from 'react'
import '../styles/globals.css'
import styles from '../styles/Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { ethers } from 'ethers'
import {CONTRACT_ADDRESS, InfuraId} from '../config'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';



function MyApp({ Component, pageProps }) {
    const [account, setAccount] = useState(null)

    async function getWe3Modal() {
        const web3modal = new Web3Modal({
            network: `"rinkeby", "ropsten"`,
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

    async function connect() {
        try {
            const web3Modal = await getWe3Modal()
            const connect = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connect)
            const accounts = await provider.listAccounts()
            const name = await provider.lookupAddress(accounts[0])

            if (name) {
                setAccount(name)
            }   else {
                setAccount(accounts[0].substring(0, 6) + "..." + accounts[0].substring(36));
            }
        }   catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <header className={styles.Header}>
                <h1 className={styles.HeaderTitle}>dAgora Bridge</h1>
                {!account && (
                    <button className={styles.ConnectButton} onClick={connect}>Connect Wallet</button>
                )}
                {account && (
                    <button className={styles.ConnectButton} onClick={connect}>{account}</button>
                )}
            </header>
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp

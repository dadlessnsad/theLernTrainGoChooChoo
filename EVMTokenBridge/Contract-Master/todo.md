Components:

- Solidity smart contracts and interaction (SDK or directly from FE)
- Front-End (React, Next, Angular) + usage of Metamask Widget (optional WalletConnect)
    - Show wallet details (in the template)
    - Connect/Disconnect state (in the template)
    - Token Transaction Details (Amount, Status, Hash) (action required)
    - Action buttons (action required)

User stories:

- As a user, I want to select a token (from my wallet or by address).
- As a user, I can select a target chain.
- As a user, I can send the bridging transaction.
- As a user, I can connect to the target chain.
- As a user, I can claim the bridged tokens.
- As a user, I can bridge the tokens back to their native chain.
- As a user, I can claim the tokens on the native chain and receive the original ones.
- As a user, I cannot bridge native tokens on the selected network.

# Bonus features

- The solution should be implemented with a stand-alone transaction validator solution.
- As a user, I can see the history of my transactions.
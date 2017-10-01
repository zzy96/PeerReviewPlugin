### PeerReviewPlugin

![logo](https://github.com/zzy96/PeerReviewPlugin/blob/master/favicon.png)

A Chrome Peer Review Plugin connecting to Ethereum Blockchain.

# Setup

1. Run a [testRPC](https://github.com/ethereumjs/testrpc) at `http://localhost:8545` (default port).
2. Deploy contract by running `node deploy.js`.
3. Copy account address and paste it to `var store_registry_address = "your contract address";` at the bottom of `js/blockchainConnector.js`.
4. Add the plugin into your chrome extension.

# Key Functionalities

Read and write reviews on plugin when you select a store on google map.
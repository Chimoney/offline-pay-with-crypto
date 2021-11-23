const Web3 = require('web3')
const ContractKit = require('@celo/contractkit')

const network = 'wss://forno.celo.org/ws'
let lastSeenBlock = null

const toNumber = (wei) => {
  return wei / 10 ** 18
}
async function setupProviderAndSubscriptions(address) {
  let provider = new Web3.providers.WebsocketProvider(network)
  let web3 = new Web3(provider)

  const kit = ContractKit.newKitFromWeb3(web3)
  web3 = kit.web3

  let setupNewProvider = false

  // Keeps track of the number of times we've retried to set up a new provider
  // and subs without a successful header
  let sequentialRetryCount = 0

  const setupNewProviderAndSubs = async () => {
    // To prevent us from retrying too aggressively, wait a little if
    // we try setting up multiple times in a row
    const sleepTimeMs = sequentialRetryCount * 100
    console.log('sleeping', sleepTimeMs)

    await sleep(sleepTimeMs)
    sequentialRetryCount++
    // To avoid a situation where multiple error events are triggered
    if (!setupNewProvider) {
      setupNewProvider = true
      setupProviderAndSubscriptions()
    }
  }

  provider.on('connect', async (connect) => {
    console.log('WebsocketProvider has connected', connect)
  })

  provider.on('error', async (error) => {
    console.log('WebsocketProvider encountered an error', error)
    await setupNewProviderAndSubs()
  })

  provider.on('end', async () => {
    console.log('WebsocketProvider has ended, will restart')
    await setupNewProviderAndSubs()
  })

  let eventSubscription = web3.eth.subscribe('logs', {
    address,
  })

  eventSubscription.on('data', function (data) {
    console.log({ data })
  })

  eventSubscription.on('changed', function (changed) {
    console.log({ changed })
  })

  eventSubscription.on('error', async (error) => {
    console.log('Block header subscription encountered an error', error)
    await setupNewProviderAndSubs()
  })

  let syncingSubscription = web3.eth.subscribe('syncing')
  syncingSubscription.on('data', function (result) {
    console.log({ result })
  })

  const pendingTransactionsSubscription = web3.eth.subscribe(
    'pendingTransactions',
    (err, res) => {
      if (err) console.error({ err })
    }
  )
  pendingTransactionsSubscription.on('data', (txHash) => {
    setTimeout(async () => {
      try {
        let tx = await web3.eth.getTransaction(txHash)
        const receiverAddress = tx && tx.to
        // if (tx) {
        //   console.log({ tx })
        //   console.log('TX hash: ', txHash) // transaction hash
        //   console.log('TX confirmation: ', tx.transactionIndex) // "null" when transaction is pending
        //   console.log('TX nonce: ', tx.nonce) // number of transactions made by the sender prior to this one
        //   console.log('TX block hash: ', tx.blockHash) // hash of the block where this transaction was in. "null" when transaction is pending
        //   console.log('TX block number: ', tx.blockNumber) // number of the block where this transaction was in. "null" when transaction is pending
        //   console.log('TX sender address: ', tx.from) // address of the sender
        //   console.log(
        //     'TX amount(in Ether): ',
        //     web3.utils.fromWei(tx.value, 'ether')
        //   ) // value transferred in ether
        //   console.log('TX date: ', new Date()) // transaction date
        //   console.log('TX gas price: ', tx.gasPrice) // gas price provided by the sender in wei
        //   console.log('TX gas: ', tx.gas) // gas provided by the sender.
        //   console.log('TX input: ', tx.input) // the data sent along with the transaction.
        //   console.log('=====================================') // a visual separator
        // }
        if (tx && receiverAddress == address) {
          console.log('FOUND')
          console.log('TX hash: ', txHash) // transaction hash
          console.log('TX confirmation: ', tx.transactionIndex) // "null" when transaction is pending
          console.log('TX nonce: ', tx.nonce) // number of transactions made by the sender prior to this one
          console.log('TX block hash: ', tx.blockHash) // hash of the block where this transaction was in. "null" when transaction is pending
          console.log('TX block number: ', tx.blockNumber) // number of the block where this transaction was in. "null" when transaction is pending
          console.log('TX sender address: ', tx.from) // address of the sender
          console.log(
            'TX amount(in Ether): ',
            web3.utils.fromWei(tx.value, 'ether')
          ) // value transferred in ether
          console.log('TX date: ', new Date()) // transaction date
          console.log('TX gas price: ', tx.gasPrice) // gas price provided by the sender in wei
          console.log('TX gas: ', tx.gas) // gas provided by the sender.
          console.log('TX input: ', tx.input) // the data sent along with the transaction.
          console.log('=====================================') // a visual separator
        }
      } catch (err) {
        console.error(err)
      }
    })
  })
}

function sleep(ms, onSleep) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
    if (onSleep) {
      onSleep()
    }
  })
}
module.exports = setupProviderAndSubscriptions

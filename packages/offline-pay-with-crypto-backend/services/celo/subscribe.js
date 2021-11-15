const Web3 = require("web3");
const ContractKit = require("@celo/contractkit");

const network = "wss://forno.celo.org/ws";
let lastSeenBlock = null;
async function setupProviderAndSubscriptions(address) {
  let provider = new Web3.providers.WebsocketProvider(network);
  let web3 = new Web3(provider);

  const kit = ContractKit.newKitFromWeb3(web3);
  web3 = kit.web3;
  console.log({ web3 });

  let setupNewProvider = false;

  // Keeps track of the number of times we've retried to set up a new provider
  // and subs without a successful header
  let sequentialRetryCount = 0;

  const setupNewProviderAndSubs = async () => {
    // To prevent us from retrying too aggressively, wait a little if
    // we try setting up multiple times in a row
    const sleepTimeMs = sequentialRetryCount * 100;
    console.log("sleeping", sleepTimeMs);

    await sleep(sleepTimeMs);
    sequentialRetryCount++;
    // To avoid a situation where multiple error events are triggered
    if (!setupNewProvider) {
      setupNewProvider = true;
      setupProviderAndSubscriptions();
    }
  };

  provider.on("connect", async (connect) => {
    console.log("WebsocketProvider has connected", connect);
  });

  provider.on("error", async (error) => {
    console.log("WebsocketProvider encountered an error", error);
    await setupNewProviderAndSubs();
  });

  provider.on("end", async () => {
    console.log("WebsocketProvider has ended, will restart");
    await setupNewProviderAndSubs();
  });

  let headerSubscription = web3.eth.subscribe("newBlockHeaders");

  headerSubscription.on("data", function (blockHeader) {
    if (sequentialRetryCount > 0) {
      sequentialRetryCount = 0;
    }
    lastSeenBlock = blockHeader.number;
  });

  let eventSubscription = web3.eth.subscribe("logs", {
    address,
    fromBlock: lastSeenBlock,
  });

  eventSubscription.on("data", function (data) {
    console.log({ data });
  });

  eventSubscription.on("changed", function (changed) {
    console.log({ changed });
  });

  eventSubscription.on("error", async (error) => {
    console.log("Block header subscription encountered an error", error);
    await setupNewProviderAndSubs();
  });


  let syncingSubscription = web3.eth.subscribe("syncing");
  syncingSubscription.on("data", function (result) {
    console.log({ result });
  });

}

function sleep(ms, onSleep) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
    if (onSleep) {
      onSleep();
    }
  });
}
module.exports = setupProviderAndSubscriptions

# `@chimoney/offline-pay-with-crypto-util`

A simple utility script for offline-pay-with-crypto-widget that handles embedding the `@chimoney/offline-pay-with-crypto-widget` easily in your application.

## Usage

## Include to `script` tag

Manually add the `@chimoney/offline-pay-with-crypto-util` script tag to the <head> on your site. This adds the script to the browser's `window` as `OfflinePayWithCryptoUtil`

```html
<!-- add in site's  <head> -->
<script
  src="https://unpkg.com/@chimoney/offline-pay-with-crypto-util/umd/index.js"
  async
></script>
```

```html
<script>
  const payBtn = document.getElementById("pay-btn");

    payBtn.addEventListener("click", (e) => {
      e.preventDefault();

    const offlinePayWithCryptoUtilInstance =  new OfflinePayWithCryptoUtil({
    onOpen = () => {
      console.log("modal is opened)
    },
    onClose = () => {
      console.log("modal is closed)
    },
    onComplete = (response) => {
      // optional: save response from transaction.
      // e.g api.save(response)
      console.log("transaction completed")
    },
      // configuration information
    name: "Test app",
    store_img: "https://lh3.googleusercontent.com/-crMj-_7sKco/AAAAAAAAAAI/AAAAAAAAAAA/8wRiFKrmpe8/s88-p-k-no-ns-nd/photo.jpg",
    paymentDescription: "Send a payment to my test app",
    supportedCurrencies: {
            CELO: {
              code: "CELO",
              walletAddress: "0x33....", // enter wallet addresss here
              amount: 1,
            },
            CUSD: {
              code: "cUSD",
              walletAddress: "0x45..",
              amount: 1,
            },
          },
    amountToCharge: 1,
    }).setup()

    // triggers modal launch
    offlinePayWithCryptoUtilInstance.launch();

    });
</script>
```

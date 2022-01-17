---
id: widget-setup
title: Utility/Mobile Developer Setup

---
import PageRef from '../src/components/PageRef'

## Offline-Pay-With-Celo Util

A simple utility script that handles embedding the `@chimoney/offline-pay-with-crypto-util` easily in your application.

## Setup

Manually add the `@chimoney/offline-pay-with-crypto-util` script tag to your html file. This adds the script to the browser's window as an instance `OfflinePayWithCryptoUtil`

```html

<!-- add in site's  <head> -->
<script src="https://unpkg.com/@chimoney/offline-pay-with-crypto-util/umd/index.js" async></script>

```

## Usage
Include the script in a `script` tag or an external `.js` file.

```js
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
    }).setup()

    // triggers modal launch
    offlinePayWithCryptoUtilInstance.launch();

    });

</script>
```

## JS Frameworks

Click the links below for detailed examples on how to use  `@chimoney/offline-pay-with-crypto-util` with your favourite framework;

### React
<PageRef url="/docs/react-widget" pageName="Setup With React" />

### Angular
-  *WIP* 🔜🔜🔜

### Vue
-  *WIP* 🔜🔜🔜




 ## Contribution

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.
If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!


```shell
•	Fork the Project
•	Create your Feature Branch
•	Commit your Changes
•	Push to the Branch
•	Open a Pull Request

```
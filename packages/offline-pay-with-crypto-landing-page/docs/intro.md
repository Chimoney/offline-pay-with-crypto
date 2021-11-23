---
sidebar_position: 1
---

# Documentation
Welcome to the Offline Pay with crypto Documentation. Learn how to build amazing crypto payment experiences with our Crypto Service. Offline Pay with crypto is an open source project which helps you build, test, and manage your Crypto payment integration right from the terminal.

How **Offline Pay with crypto works**.

## Getting Started

Get started by **Installing the dependencies**.

The Offline Pay with crypto can either be integrated using Npm/Yarn Package or integrated as a Util using script mode.

**Get started using Npm/Yarn Package**.
```shell
npm i @chimoney/offline-pay-with-crypto-widget
or
yarn I @chimoney/offline-pay-with-crypto-widget
```


## Usage with Npm

1.	Wrap the root of your application with the ModalProvider provided by @chimoney/offline-pay-with-crypto-widget

```shell
import { ModalProvider } from '@chimoney/offline-pay-with-crypto-widget';

ReactDOM.render(
  <React.StrictMode>
  <ModalProvider>
    <App />
    <ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

2.	To make use of the components
```shell
import { ModalOverlay, Modal, ModalContainer, useModal } from '@chimoney/offline-pay-with-crypto-widget';

export default function DemoModal() {
    const { isOpen, toggleModal } = useModal();

   const config = {
    name: 'Chimoney app',
    store_img: 'https://lh3.googleusercontent.com/-crMj-_7sKco/AAAAAAAAAAI/AAAAAAAAAAA/8wRiFKrmpe8/s88-p-k-no-ns-nd/photo.jpg',
    paymentDescription: 'Send a payment to chimoney.io',
    supportedCurrencies: {
      'CELO': {
        code: 'CELO',
        walletAddress: '0x3........', // change to celo wallet address here
        amount: 1,
      },
      'CUSD': {
        code: 'cUSD',
        walletAddress: '0x3........',
        amount: 1,
      },
    },
  }

    return (
        <>
            <button onClick={toggleModal}>Open Modal</button>
            <ModalContainer>
                {
                    isOpen &&
                    <ModalOverlay onClick={toggleModal}>
                        <Modal config={config} />
                    </ModalOverlay>
                }
            </ModalContainer>
        </>
    )
}
```


## Usage as Utility Script

A simple utility script for offline-pay-with-crypto-widget that handles embedding the @chimoney/offline-pay-with-crypto-widget easily in your application.

Manually add the below @chimoney/offline-pay-with-crypto-util script tag in between the opening and closing head of your html file.

```shell
<script src="https://unpkg.com/@chimoney/offline-pay-with-crypto-util/umd/index.js" async></script>
```

Followed by

```shell
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

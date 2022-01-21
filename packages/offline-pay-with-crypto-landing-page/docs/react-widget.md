---
id: react-widget
title: Web Developer Setup
---

## Setup With React

## Installation

Get started by **Installing the dependencies**.

The Offline Pay with Celo can either be integrated using Npm/Yarn Package or integrated as a Util using script mode.

**Get started using Npm/Yarn Package**.

```shell
npm i @chimoney/offline-pay-with-crypto-widget
or
yarn add @chimoney/offline-pay-with-crypto-widget
```

## Usage with Npm

1. Wrap the root of your application with the ModalProvider provided by `@chimoney/offline-pay-with-crypto-widget`

```js
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

2. To make use of the components

```js
import {
  ModalOverlay,
  Modal,
  ModalContainer,
  useModal,
} from '@chimoney/offline-pay-with-crypto-widget'

export default function DemoModal() {
  const { isOpen, toggleModal } = useModal()

  const config = {
    name: 'Chimoney app',
    store_img:
      'https://lh3.googleusercontent.com/-crMj-_7sKco/AAAAAAAAAAI/AAAAAAAAAAA/8wRiFKrmpe8/s88-p-k-no-ns-nd/photo.jpg',
    paymentDescription: 'Send a payment to chimoney.io',
    supportedCurrencies: {
      CELO: {
        code: 'CELO',
        walletAddress: '0x3........', // change to celo wallet address here
        amount: 1,
      },
      cUSD: {
        code: 'cUSD',
        walletAddress: '0x3........',
        amount: 1,
      },
    },
    amountToCharge: 1,
  }

  return (
    <>
      <button onClick={toggleModal}>Open Modal</button>
      <ModalContainer>
        {isOpen && (
          <ModalOverlay onClick={toggleModal}>
            <Modal config={config} />
          </ModalOverlay>
        )}
      </ModalContainer>
    </>
  )
}
```

---
sidebar_position: 1
---

# Documentation
Welcome to the Offline Pay with crypto Documentation. Learn how to build amazing crypto payment experiences with our Crypto Service. Offline Pay with crypto is an open source project which helps you build, test, and manage your Crypto payment integration right from the terminal.

How **Offline Pay with crypto works**.

## Getting Started

Get started by **Installing the dependencies**.
```shell
npm i @chimoney/offline-pay-with-crypto-widget
or
yarn I @chimoney/offline-pay-with-crypto-widget
```


## Usage

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
        name: "Chimoney Store",
        order_type: "Airtime",
        amount: 3500,
        currency: "usd", // defaults to usd
        address: "",
        store_img: ""
    };

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

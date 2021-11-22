# `offline-pay-with-crypto-widget`

> TODO: description

## Usage

1. Wrap the root of your application with the `ModalProvider` provided by `@chimoney/offline-pay-with-crypto-widget`

```jsx
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

```jsx
import { ModalOverlay, Modal, ModalContainer, useModal } from '@chimoney/offline-pay-with-crypto-widget';

export default function DemoModal() {
    const { isOpen, toggleModal } = useModal();

    const config = {
    name: 'Chimoney app',
    store_img:
      'https://lh3.googleusercontent.com/-crMj-_7sKco/AAAAAAAAAAI/AAAAAAAAAAA/8wRiFKrmpe8/s88-p-k-no-ns-nd/photo.jpg',

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


<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- Uchi Uchibeke - [@uchiuchibeke](https://twitter.com/uchiuchibeke) - uchi.uchibeke@gmail.com
- Bayo
- Lawal

Project Link: [https://github.com/Chimoney/offline-pay-with-crypto](https://github.com/Chimoney/offline-pay-with-crypto)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [GitHub Pages](https://pages.github.com)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

<a href="https://github.com/Chimoney/offline-pay-with-crypto"><img alt="MIT" src="https://img.shields.io/badge/license-MIT-blue.svg" /></a>
<a href="https://github.com/Chimoney/offline-pay-with-crypto"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" /></a>


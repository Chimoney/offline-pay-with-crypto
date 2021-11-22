import React from 'react'
import './App.css'
import { Modal } from './components'

function App() {
  const config = {
    name: 'Chimoney app',
    store_img:
      'https://lh3.googleusercontent.com/-crMj-_7sKco/AAAAAAAAAAI/AAAAAAAAAAA/8wRiFKrmpe8/s88-p-k-no-ns-nd/photo.jpg',

    paymentDescription: 'Send a payment to chimoney.io',
    supportedCurrencies: [
      {
        code: 'CELO',
        walletAddress: '0x363f932743599EBc88C85A35C201615dA4f2Bc5E',
        amount: 1,
      },
      {
        code: 'cUSD',
        walletAddress: '0x363f932743599EBc88C85A35C201615dA4f2Bc5E',
        amount: 1,
      },
    ],
  }
  return <Modal {...config} />
}

export default App

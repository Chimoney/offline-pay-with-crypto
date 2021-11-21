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
      { code: 'CELO', walletAddress: 'kdkdldldldldlldldldldlld', amount: 10 },
      { code: 'cUSD', walletAddress: 'pppp.slskofifiifi', amount: 100 },
    ],
  }
  return <Modal {...config} />
}

export default App

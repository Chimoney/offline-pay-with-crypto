import React from 'react'
import './App.css'
import { Modal } from './components'

function App() {

  const url = new URL(window.location.href);
  const name = url.searchParams.get('name');
  const store_img = url.searchParams.get('storeImg');
  const paymentDescription = url.searchParams.get('paymentDescription');
  const supportedCurrenciesFromParams = url.searchParams.get('supportedCurrencies');
  const supportedCurrencies = JSON.parse(decodeURIComponent(supportedCurrenciesFromParams)) || {};

  const config = {
    name,
    store_img,
    paymentDescription,
    supportedCurrencies
  }
  return <Modal {...config} />
}

export default App

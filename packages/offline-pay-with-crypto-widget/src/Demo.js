import React from 'react'
import { ModalOverlay, Modal, ModalContainer, useModal } from './components'
import { Button } from '@mui/material'

export default function Demo() {
  const { isOpen, toggleModal } = useModal()


  const config = {
    name: 'Chimoney app',
    store_img:
      'https://lh3.googleusercontent.com/-crMj-_7sKco/AAAAAAAAAAI/AAAAAAAAAAA/8wRiFKrmpe8/s88-p-k-no-ns-nd/photo.jpg',

    paymentDescription: 'Send a payment to chimoney.io',
    supportedCurrencies: {
      'CELO': {
        code: 'CELO',
        walletAddress: '0x363f932743599EBc88C85A35C201615dA4f2Bc5E',
        amount: 1,
      },
      'CUSD': {
        code: 'cUSD',
        walletAddress: '0x363f932743599EBc88C85A35C201615dA4f2Bc5E',
        amount: 1,
      },
    },
  }

  return (
    <div>
      <Button onClick={toggleModal}>Open Modal </Button>
      <ModalContainer>
        {isOpen && (
          <ModalOverlay onClick={toggleModal}>
            <Modal config={config} />
          </ModalOverlay>
        )}
      </ModalContainer>
    </div>
  )
}

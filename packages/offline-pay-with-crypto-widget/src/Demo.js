import React from 'react'
import { ModalOverlay, Modal, ModalContainer, useModal } from './components'
import { Button } from '@mui/material'

export default function Demo() {
  const { isOpen, toggleModal } = useModal()

  const config = {
    name: 'Bayo Store',
    order_type: 'Airtime',
    amount: 3500,
    currency: 'usd', // defaults to usd
    address: '',
    store_img: '',
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

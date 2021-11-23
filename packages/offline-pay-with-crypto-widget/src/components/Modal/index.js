import * as React from 'react'
import { useState, useEffect } from 'react'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import { Container, TextField, MenuItem, Button, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import './modal.css'
import Paper from '@mui/material/Paper'
import QRCode from 'react-qr-code'
import { motion } from 'framer-motion'
import cryptoIcon from 'base64-cryptocurrency-icons'
import { ContractKitProvider } from '@celo-tools/use-contractkit'
import '@celo-tools/use-contractkit/lib/styles.css'
import { useContractKit } from '@celo-tools/use-contractkit'
import ModalConfig from '../ModalConfig'

const dropIn = {
  hidden: {
    y: '250vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.3,
      type: 'spring',
      damping: 25,
      stiffness: 160,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

const ModalComponent = ({
  name = '',
  paymentDescription = '',
  store_img = '',
  supportedCurrencies,
}) => {
  const [state, setState] = useState('address')
  const [email, setEmail] = useState('')
  const [notValid, setNotValid] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState(supportedCurrencies?.['CELO'])
  const { getConnectedKit, performActions, address } = useContractKit()

  const invalid = () => {
    if (
      !name ||
      !paymentDescription ||
      !supportedCurrencies ||
      Object.entries(supportedCurrencies).length < 1
    ) {
      return true
    }

    for (const name in supportedCurrencies) {
       const { walletAddress, amount, code} = supportedCurrencies[name];

      if (! walletAddress || !amount || !code) {
        return true
      }
    }
  }

  useEffect(() => {
    setNotValid(invalid())
  }, [setNotValid])

  useEffect(() => {
    setSelectedCrypto(supportedCurrencies?.['CELO'])
  }, [])

  if (notValid) {
    return (
      <ModalConfig />
    )
  }
  async function transfer() {
    const code = selectedCrypto.code?.toUpperCase()
    try {
      const kit = await getConnectedKit()

      const toVal = (amount) => {
        return amount * 1
      }

      if (code === 'CUSD') {
        const cUSD = await kit.contracts.getStableToken()
        const action = await performActions(async (kit) => {
          const cUSD = await kit.contracts.getStableToken()
          const result = await cUSD
            .transfer(selectedCrypto.walletAddress, selectedCrypto.amount)
            .sendAndWaitForReceipt()
          console.log({ result })
        })
      } else if (code === 'CELO') {
        const action = await performActions(async (kit) => {
          const celo = await kit.contracts.getGoldToken()
          const result = await celo
            .transfer(selectedCrypto.walletAddress, selectedCrypto.amount)
            .sendAndWaitForReceipt()
          console.log({ result })
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
  const isCelo =
    selectedCrypto?.walletAddress &&
    (selectedCrypto.code?.toUpperCase() === 'CELO' ||
      selectedCrypto.code?.toUpperCase() === 'CUSD')

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Container id="modal-container" sx={{ bgcolor: 'white' }} maxWidth="md">
        <Typography color="red" align="center" variant="body2">
          This is actively being developed. Do not send real transaction
        </Typography>
        <Box sx={{ bgcolor: 'transparent', height: '96vh', marginTop: '3%' }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                src={store_img}
              >
                {name?.substring(0, 2)}
              </Avatar>
            }
            action={
              <>
                <Typography variant="body2" color="text.secondary">
                  TOTAL
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {`${selectedCrypto?.amount} ${selectedCrypto?.code}`}
                </Typography>
              </>
            }
            title={`${name}`}
          />
          <Typography variant="subtitle2" align="center" color="text.primary">
            {paymentDescription}
          </Typography>
          <br />
          <br />
          <br />
          <Typography variant="h6" align="center" color="text.primary">
            Select crypto to pay with
          </Typography>
          <br />
          <Paper
            align="center"
            elevation={0}
            sx={{ background: 'transparent' }}
          >
            <TextField
              id="code"
              value={selectedCrypto && selectedCrypto}
              onChange={(e) => {
                setSelectedCrypto(e.target.value)
              }}
              fullWidth
              label="Pay with"
              select
              variant="outlined"
            >
              {Object.keys(supportedCurrencies).map((currency) => {
                currency = supportedCurrencies[currency];
                const upperCode = currency.code.toUpperCase()
                const crypto = cryptoIcon[upperCode]
                return (
                  <MenuItem key={currency.code} value={currency}>
                    <span className="label">
                      <img src={crypto?.icon} alt="" /> {currency.code} (
                      {crypto?.name})
                    </span>
                  </MenuItem>
                )
              })}
            </TextField>
          </Paper>
          <br />
          <br />
          <Typography variant="body2" align="center" color="text.primary">
            To Pay
          </Typography>
          <br />
          <Paper
            align="center"
            elevation={0}
            sx={{ background: 'transparent' }}
          >
            <Typography
              display="inline"
              variant="h5"
              align="center"
              color="text.primary"
            >
              {selectedCrypto?.amount} {selectedCrypto?.code} =
            </Typography>
            <Typography
              display="inline"
              variant="h6"
              align="center"
              color="text.primary"
            >
              {' '}
              {selectedCrypto?.amount} {selectedCrypto?.code}
            </Typography>
          </Paper>
          <br />
          <div className="section-component">
            <div>
              <span
                className={state === 'address' ? 'active' : 'inactive'}
                onClick={() => setState('address')}
              >
                Send to address
              </span>
              <span
                className={state === 'agent' ? 'active' : 'inactive'}
                onClick={() => setState('agent')}
              >
                Pay through agent
              </span>
            </div>
          </div>

          {state === 'address' ? (
            <Grid container>
              <div className="qr-container">
                <div className="qr-div">
                  <QRCode
                    value={selectedCrypto.walletAddress}
                    size={150}
                    className="qr-code"
                  />
                </div>
                <div className="qr-text">
                  <h1>Scan QR Code</h1>
                  <p>
                    Scan code to send from your mobile wallet or copy address
                    below.
                  </p>
                  <span className="address">To address: </span>
                  <div className="qr-url">
                    <span className="code">
                      {selectedCrypto?.walletAddress}{' '}
                    </span>
                    <img
                      id="qr-code"
                      src="https:img.icons8.com/material-outlined/14/2138A8/copy.png"
                      alt=""
                    />
                  </div>
                  <Typography variant="caption">
                    Only send {selectedCrypto?.code} to the address
                  </Typography>
                </div>
              </div>
              <Grid xs={12} align="center" item>
                {isCelo && (
                  <div className="agent-btn">
                    <Button
                      onClick={transfer}
                      variant="contained"
                      color="primary"
                    >
                      Pay from Wallet
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          ) : (
            <div className="agent-section">
              <h1>Enter email to send the payment details to</h1>
              <TextField
                id="agent-email"
                value={email}
                label="Email"
                variant="outlined"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                style={{ maxWidth: '400px' }}
                fullWidth
              />
              <div className="agent-btn">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => alert("We're working on the Agent feature")}
                >
                  Send
                </Button>
              </div>
            </div>
          )}
          <br />
          <br />
          <br />
          <hr className="hr" />
          <Typography variant="h6" align="center" color="text.primary">
            Secured by cryptography
          </Typography>
        </Box>
      </Container>
    </motion.div>
  )
}

export function Modal(props) {
  const { name, paymentDescription } = props
  return (
    <ContractKitProvider
      dapp={{
        name,
        description: paymentDescription,
        url: window.location.href,
      }}
    >
      <ModalComponent {...props} />
    </ContractKitProvider>
  )
}

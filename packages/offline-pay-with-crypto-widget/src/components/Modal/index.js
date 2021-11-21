import * as React from 'react'
import { useState, useEffect } from 'react'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import { Container, TextField, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import './modal.css'
import Paper from '@mui/material/Paper'
import QRCode from 'react-qr-code'
import { motion } from 'framer-motion'
import cryptoIcon from 'base64-cryptocurrency-icons'

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

export function Modal({
  name = '',
  paymentDescription = '',
  store_img = '',
  supportedCurrencies = [{ code: 'CELO', walletAddress: 'm', amount: 0 }],
}) {
  // const [expanded, setExpanded] = React.useState(false);

  const [state, setState] = useState('address')
  const [email, setEmail] = useState('')
  const [notValid, setNotValid] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState(supportedCurrencies[0])

  const invalid = () => {
    if (
      !name ||
      !paymentDescription ||
      !supportedCurrencies ||
      supportedCurrencies.length < 1
    ) {
      return true
    }

    for (const { walletAddress, amount, code } of supportedCurrencies) {
      if (!walletAddress || !amount || !code) {
        return true
      }
    }
  }

  useEffect(() => {
    setNotValid(invalid())
  }, [setNotValid])

  if (notValid) {
    return (
      <div style={{ margin: '100px' }}>
        ERROR: Please pass the following options
        <pre>
          {`
          {
            name,
            paymentDescription,
            amount,
            currency,
            store_img,
            supportedCurrencies: [{ code: 'CELO', walletAddress: 'address', amount: 100 }]
          }
          `}
        </pre>
        each item in supportedCurrencies should include code, walletAddress and
        amount
      </div>
    )
  }

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Container id="modal-container" sx={{ bgcolor: 'white' }} maxWidth="md">
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
                  {`${selectedCrypto.amount} ${selectedCrypto.code}`}
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
              value={selectedCrypto}
              onChange={(e) => {
                setSelectedCrypto(e.target.value)
              }}
              fullWidth
              label="Pay with"
              select
              variant="outlined"
            >
              {supportedCurrencies.map((currency) => {
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
              {selectedCrypto.amount} {selectedCrypto.code} =
            </Typography>
            <Typography
              display="inline"
              variant="h6"
              align="center"
              color="text.primary"
            >
              {' '}
              {selectedCrypto.amount} {selectedCrypto.code}
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
                  Scan code to see request details from your mobile wallet for
                  payment to receiving address below.
                </p>
                <div className="qr-url">
                  <span className="address">To address: </span>
                  <span className="code"> {selectedCrypto.walletAddress} </span>
                  <img
                    id="qr-code"
                    src="https:img.icons8.com/material-outlined/14/2138A8/copy.png"
                    alt=""
                  />
                </div>
                <Typography variant="caption">
                  Only send {selectedCrypto.code} to the address
                </Typography>
              </div>
            </div>
          ) : (
            <div className="agent-section">
              <h1>
                Enter your e-mail to receive payment details to give your agent
              </h1>
              <TextField
                id="agent-email"
                value={email}
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
              />
              <div className="agent-btn">
                <button>Send</button>
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

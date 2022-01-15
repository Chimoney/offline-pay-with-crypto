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
import QRCode from 'qrcode.react'
import { motion } from 'framer-motion'
import { icons as cryptoIcon } from '../icons'
import { ContractKitProvider } from '@celo-tools/use-contractkit'
import { useWalletConnectConnector } from '@celo-tools/use-contractkit/lib/connectors/useWalletConnectConnector'
import '@celo-tools/use-contractkit/lib/styles.css'
import { useContractKit } from '@celo-tools/use-contractkit'
import ModalConfig from '../ModalConfig'
import Alert from '../Alert'
import LockIcon from '@mui/icons-material/Lock'
// import { BigNumber } from 'bignumber.js'

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
  name,
  paymentDescription,
  store_img,
  supportedCurrencies,
  amountToCharge = 0,
}) => {
  const [state, setState] = useState('address')
  const [email, setEmail] = useState('')
  const [senderName, setSenderName] = useState('')
  const [notValid, setNotValid] = useState(false)
  const [alertDetails, setAlertDetails] = useState({ message: '' })

  supportedCurrencies =
    Object.keys(supportedCurrencies).length < 1
      ? { CELO: { code: 'CELO', walletAddress: 'm', amount: 0 } }
      : supportedCurrencies

  const [selectedCrypto, setSelectedCrypto] = useState(
    supportedCurrencies?.['CELO']
  )
  const { performActions } = useContractKit()

  const invalid = () => {
    if (
      !name ||
      !paymentDescription ||
      Object.keys(supportedCurrencies).length < 1
    ) {
      return true
    }

    for (const name in supportedCurrencies) {
      const { walletAddress, amount, code } = supportedCurrencies?.[name]

      if (!walletAddress || !amount || !code) {
        return true
      }
    }
  }

  const getDeepLink = (uri) => {
    return `celo://wallet/wc?uri=${uri}`
  }

  useEffect(() => {
    setNotValid(invalid())
    setSelectedCrypto(supportedCurrencies?.['CELO'])
  }, [setNotValid, alertDetails.message])

  // URI for Valora/Metamask QRCode Connection
  // https://github.com/celo-org/use-contractkit/blob/1bc9de31c4bc071bbc2519569cecaa2ec2a69684/packages/use-contractkit/src/screens/valora.tsx#L18
  const uri = useWalletConnectConnector(
    () => {},
    true,
    getDeepLink,
    selectedCrypto?.walletAddress
  )

  async function transfer() {
    const code = selectedCrypto?.code?.toUpperCase()
    try {
      let amount = selectedCrypto?.amount
      const successConfirmation = {
        title: 'Payment sent',
        message: `Payment sent to ${senderName}. Please check your wallet balance.`,
      }

      const failureConfirmation = {
        title: 'Payment failed',
        message: `Payment to ${senderName} failed. Please contact  ${senderName}.`,
      }
      if (code === 'CUSD') {
        await performActions(async (kit) => {
          const cUSD = await kit.contracts.getStableToken('cUSD')
          amount = kit.web3.utils.toWei(String(amount), 'ether')
          await cUSD
            .transferWithComment(
              selectedCrypto?.walletAddress,
              amount,
              paymentDescription
            )
            .sendAndWaitForReceipt()
            .then((transaction = {}) => {
              const { status, transactionHash, blockNumber } = transaction
              if (status && transactionHash.length && blockNumber > 1) {
                setAlertDetails(successConfirmation)
              } else {
                setAlertDetails(failureConfirmation)
              }
            })
        })
      } else if (code === 'CELO') {
        await performActions(async (kit) => {
          const celo = await kit.contracts.getGoldToken()
          amount = kit.web3.utils.toWei(String(amount), 'ether')
          await celo
            .transferWithComment(
              selectedCrypto?.walletAddress,
              amount,
              paymentDescription
            )
            .sendAndWaitForReceipt()
            .then((transaction) => {
              const { status, transactionHash, blockNumber } = transaction
              if (status && transactionHash.length && blockNumber > 1) {
                setAlertDetails(successConfirmation)
              } else {
                setAlertDetails(failureConfirmation)
              }
            })
        })
      } else {
        alert(`Payment with ${code || 'token'} is not supported at this time`)
      }
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  const isCelo =
    selectedCrypto?.walletAddress &&
    (selectedCrypto.code?.toUpperCase() === 'CELO' ||
      selectedCrypto.code?.toUpperCase() === 'CUSD')

  if (notValid) {
    return <ModalConfig />
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
        <Typography color="red" align="center" variant="body2">
          This is actively being developed. Do not send real transaction
        </Typography>
        <Box
          sx={{
            bgcolor: 'transparent',
            minHeight: '96vh',
            marginTop: '3%',
            marginBottom: '2%',
          }}
        >
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
                  Total:
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {`${selectedCrypto?.amount} ${selectedCrypto?.code}`}
                </Typography>
              </>
            }
            title={name}
          />
          <Typography
            variant="subtitle2"
            align="center"
            color="text.primary"
            style={{ overflow: 'auto' }}
          >
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
            {Object.keys(supportedCurrencies).length > 0 && (
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
                  currency = supportedCurrencies[currency]
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
            )}
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
              ${amountToCharge} USD
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
                  {selectedCrypto?.walletAddress && (
                    <QRCode value={uri} size={150} className="qr-code" />
                  )}
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
                    {/* <img
                      id="qr-code"
                      src="https:img.icons8.com/material-outlined/14/35D07F/copy.png"
                      alt=""
                    /> */}
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
                      Pay with Web3 Wallet
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid container style={{ minHeight: '200px' }}>
              <Grid xs={12} align="center" item>
                <div className="agent-section">
                  <Typography variant="body1">
                    Share details with an Agent
                  </Typography>
                  <TextField
                    id="agent-email"
                    value={email}
                    label="Agent or Payer email"
                    variant="outlined"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    style={{ maxWidth: '400px', marginBottom: '20px' }}
                    fullWidth
                  />
                  <TextField
                    id="sender-name"
                    value={senderName}
                    label="Your name"
                    variant="outlined"
                    type="name"
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Nkechi Ayodel"
                    style={{ maxWidth: '400px' }}
                    fullWidth
                  />
                  <div className="agent-btn">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        alert("We're working on the Agent feature")
                      }
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          )}
          <br />
          <br />
          <br />
          <hr className="hr" />
          <Grid
            container
            alignItems="center"
            style={{
              justifyContent: 'center',
            }}
          >
            <LockIcon
              sx={{ width: '0.7em', marginRight: '3px' }}
              color="success"
            />
            <Typography variant="subtitle1" align="center">
              Secured by Cryptography
            </Typography>
          </Grid>
        </Box>
      </Container>
      {alertDetails?.message && <Alert {...alertDetails} />}
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

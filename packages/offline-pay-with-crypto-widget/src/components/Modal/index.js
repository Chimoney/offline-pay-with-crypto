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
import '@celo-tools/use-contractkit/lib/styles.css'
import { useContractKit } from '@celo-tools/use-contractkit'
import ModalConfig from '../ModalConfig'
import Alert from '../Alert'
import LockIcon from '@mui/icons-material/Lock'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useMediaQuery, useTheme } from '@mui/material'

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
  amountToCharge,
  redirectURL,
}) => {
  const [state, setState] = useState('address')
  const [email, setEmail] = useState('')
  const [senderName, setSenderName] = useState('')
  const [notValid, setNotValid] = useState(false)
  const [alertDetails, setAlertDetails] = useState({ message: '' })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    noSsr: true,
  })

  supportedCurrencies =
    Object.keys(supportedCurrencies).length < 1
      ? { CELO: { code: 'CELO', walletAddress: '', amount: 0 } }
      : supportedCurrencies

  const [selectedCrypto, setSelectedCrypto] = useState(
    supportedCurrencies?.['cUSD'] || supportedCurrencies?.['CELO']
  )

  const { performActions, destroy, connect, address, network } =
    useContractKit()

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

  useEffect(() => {
    setNotValid(invalid())
    setSelectedCrypto(
      supportedCurrencies?.['cUSD'] || supportedCurrencies?.['CELO']
    )
  }, [setNotValid, alertDetails.message])

  if (selectedCrypto?.code === 'cUSD') selectedCrypto.code = 'cUSD'

  const valoraLink = `celo://wallet/pay?address=${selectedCrypto?.walletAddress}&displayName=${name}&amount=${selectedCrypto?.amount}&comment=${paymentDescription}&token=${selectedCrypto?.code}&currencyCode=USD`

  const finalizeCeloPayment = (transaction) => {
    const successConfirmation = {
      title: 'Payment sent',
      message: `Payment sent to ${name}. Please check your wallet balance.`,
    }

    const failureConfirmation = {
      title: 'Payment failed',
      message: `Payment to ${name} failed. Please contact  ${name}.`,
    }
    const { status, transactionHash, blockNumber } = transaction
    if (status && transactionHash.length && blockNumber > 1) {
      if (redirectURL && redirectURL.startsWith('http')) {
        const baseURL = new URL(redirectURL)
        const urlParams = new URLSearchParams({
          ...(baseURL.search || {}),
          txid: transactionHash,
          transactionHash,
        }).toString()
        const url = `https://${baseURL.hostname}${baseURL.pathname}?${urlParams}`
        window.location.assign(url)
      } else {
        setAlertDetails(successConfirmation)
      }
    } else {
      setAlertDetails(failureConfirmation)
    }
  }

  async function payWithCelo() {
    const code = selectedCrypto?.code?.toUpperCase()
    try {
      if (!address) await resetConnection()
      setAlertDetails({})
      let amount = selectedCrypto?.amount
      if (code === 'cUSD') {
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
              finalizeCeloPayment(transaction)
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
            .then((transaction = {}) => {
              finalizeCeloPayment(transaction)
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

  async function payWithValora() {
    try {
      window.location.assign(valoraLink)
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  const resetConnection = async () => {
    try {
      await destroy()
      await connect()
    } catch (error) {
      console.log(error)
    }
  }

  const isCelo =
    selectedCrypto?.walletAddress &&
    (selectedCrypto?.code?.toUpperCase() === 'CELO' ||
      selectedCrypto?.code?.toUpperCase() === 'cUSD')

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
          This is actively being developed. Only send small amounts
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
              {amountToCharge
                ? `${amountToCharge} USD`
                : `${selectedCrypto?.amount} ${selectedCrypto?.code}`}
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
                    <QRCode value={valoraLink} size={150} className="qr-code" />
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
                {isCelo && isMobile ? (
                  <div className="agent-btn">
                    <Button
                      onClick={payWithValora}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Pay with Valora
                    </Button>
                  </div>
                ) : (
                  <div className="agent-btn">
                    <Button
                      onClick={payWithCelo}
                      variant="contained"
                      color="primary"
                      size="large"
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
                      size="large"
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

          {address && (
            <div
              style={{
                position: 'fixed',
                right: '0px',
                bottom: '40px',
                textAlign: 'right',
              }}
            >
              <Accordion elevation={0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ float: 'right' }}
                >
                  <Typography>{network.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2">
                    {network.name} {network.rpcUrl} ({network.chainId})
                  </Typography>
                  <Typography variant="caption">Address: {address}</Typography>
                  <br />
                  <Button
                    onClick={resetConnection}
                    variant="text"
                    color="error"
                    size="small"
                  >
                    Reset connecttion
                  </Button>
                </AccordionDetails>
              </Accordion>
            </div>
          )}
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
              Secured with Cryptography
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

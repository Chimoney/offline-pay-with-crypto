<<<<<<< HEAD
import * as React from 'react';
import { useState, useEffect } from 'react';
import Select from "react-select"
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import "./modal.css"
import Paper from '@mui/material/Paper';
import QRCode from "react-qr-code"
import { motion }  from "framer-motion";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import Icon from "react-crypto-icons";


const web3 = new Web3("https://alfajores-forno.celo-testnet.org")
const kit = newKitFromWeb3(web3);


=======
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
>>>>>>> d0b77439c9d30cb6bf7a079100ce9e81af0f72d3

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
      supportedCurrencies.length < 1
    ) {
      return true
    }

<<<<<<< HEAD
export function Modal({ config }) {

    // eslint-disable-next-line no-unused-vars
    const { name, order_type, amount, currency, address, store_img } = config;


  // const [expanded, setExpanded] = React.useState(false);
=======
    for (const name in supportedCurrencies) {
       const { walletAddress, amount, code} = supportedCurrencies[name];
>>>>>>> d0b77439c9d30cb6bf7a079100ce9e81af0f72d3

      if (! walletAddress || !amount || !code) {
        return true
      }
    }
  }

<<<<<<< HEAD
  const [selectedCoin, setSelectedCoin] = useState(null)

const paymentInfo = async () => {
        let goldtoken = await kit.contracts.getGoldToken()
        const oneGold = kit.web3.utils.toWei('1', 'ether')

    let anAddress = '0x998f2193ae2d887249c27d2ab2ceb9e60be75f7b'
    let myAddress = '0xD86518b29BB52a5DAC5991eACf09481CE4B0710d'

    let celoBalance = await goldtoken.balanceOf(myAddress )
    let amount = 1000;

   // let celotx = await goldtoken.transfer(anAddress, amount).send({from: myAddress})
    
   // let celoReceipt = await celotx.waitReceipt()

    // const tx = kit.sendTransaction({
    //   from: myAddress,
    //   to: anAddress,
    //   value: oneGold,
    // })
    // const hash = (await tx).getHash
    // const receipt = (await tx).waitReceipt

    const data = {
      from: myAddress,
      to: anAddress,
      amount,
      balance: celoBalance.toString(),
      //celoReceipt
    }

    console.log({data})

      }

  useEffect(() => {
    if(selectedCoin === "Celo") {
       paymentInfo()
    }
   
  }, [selectedCoin])

  console.log({selectedCoin})



  const options = [
    {
      value: "Celo",
      label: <span className="label"> <Icon name="celo" size={25} /> Celo Dollar (cUSD)</span>
    },
    {
      value: "Ethereum",
      label: <span className="label"><Icon name="eth" size={25} /> Ethereum</span>,

    },
    {
      value: "Dodge",
      label: <span className="label"><Icon name="doge" size={25} /> Dodge</span>,
    },
    {
      value: "Stellar",
      label: <span className="label"><Icon name="xlm" size={25} /> Stellar</span>,
    },
  ];
=======
  useEffect(() => {
    setNotValid(invalid())
  }, [setNotValid])

  useEffect(() => {
    setSelectedCrypto(supportedCurrencies?.['CELO'])
  }, [])
>>>>>>> d0b77439c9d30cb6bf7a079100ce9e81af0f72d3

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
            supportedCurrencies: { 'CELO' :{ code: 'CELO', walletAddress: 'address', amount: 100 }}
          }
          `}
        </pre>
        each item in supportedCurrencies should include code, walletAddress and
        amount
      </div>
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
<<<<<<< HEAD
    onClick={(e) => e.stopPropagation()}
    variants={dropIn}
    initial="hidden"
    animate="visible"
    exit="exit">
    <Container sx={{ bgcolor: "white"}} maxWidth="md" >
      <Box sx={{ bgcolor: 'transparent', height: '96vh', marginTop: '3%'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            CS
          </Avatar>
        }
        action={
         <>
  <Typography variant="body2" color="text.secondary">TOTAL</Typography>
  <Typography variant="body2" color="text.primary">USD 3500.00</Typography>

         </>
        }
        title={`${ (name && name) || "Chimoney Store"}`}
        subheader={`Order Details: ${order_type}`}
      />
<br/>
<br/>
<br/>
<Typography variant="h6" align="center"  color="text.primary">Select crypto to pay with</Typography>
<br/>
<Paper align="center" elevation={0} sx={{background: 'transparent'}} >
<Select options={options} className="select-box" onChange={(e) => setSelectedCoin(e.value)} />
</Paper>
<br/>
<br/>
<Typography variant="body2" align="center"  color="text.primary">To Pay</Typography>
<br/>
<Paper align="center" elevation={0} sx={{background: 'transparent'}} >
<Typography display="inline" variant="h5" align="center"  color="text.primary">0.00019 cUSD =</Typography>
<Typography display="inline" variant="h6" align="center"  color="text.primary"> USD 3500.00</Typography>

</Paper>
<br/>
        <div className="section-component">
        <div>
          <span
            className={state === "address" ? "active" : "inactive"}
            onClick={() => setState("address")}
=======
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
>>>>>>> d0b77439c9d30cb6bf7a079100ce9e81af0f72d3
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

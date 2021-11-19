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



const dropIn = {
  hidden: {
    y: "250vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 25,
      stiffness: 160,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};



export function Modal({ config }) {

    // eslint-disable-next-line no-unused-vars
    const { name, order_type, amount, currency, address, store_img } = config;


  // const [expanded, setExpanded] = React.useState(false);

  const [state, setState] = useState("address");

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




  return (
    <motion.div
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
          >
            Send to address
          </span>
          <span
            className={state === "agent" ? "active" : "inactive"}
            onClick={() => setState("agent")}
          >
            Pay through agent
          </span>
        </div>
      </div>

      {
         state === "address" ?
           (
             <div className="qr-container">
               <div className="qr-div">
                 <QRCode value="Hello" size={100} className="qr-code" />
               </div>
               <div className="qr-text">
                 <h1>Scan QR Code</h1>
                 <p>
                   Scan code to see request details from your mobile wallet for payment
                   to receiving address below.
                 </p>
                 <div className="qr-url">
                   <span className="address">To address:</span>
                   <span className="code"> xcvb876567nbvccvbnm </span>
                   <img src="https:img.icons8.com/material-outlined/14/2138A8/copy.png" alt="" />
                 </div>
               </div>
             </div>
           )
           :
           (
             <div className="agent-section">
               <h1>Enter your e-mail  to receive payment details to give your agent</h1>
               <div className="agent-section-div">
                 <label>Email</label>
                 <br />
                 <input type="text" placeholder="example@gmail.com" />
               </div>
               <div className="agent-btn">
                 <button>Send</button>
               </div>
             </div>
           )
       }
       <br/>
       <br/>
       <br/>
       <hr className="hr"/>
       <Typography variant="h6" align="center"  color="text.primary">Secured by cryptography</Typography>
      </Box>
    </Container>
    </motion.div>
  );
}
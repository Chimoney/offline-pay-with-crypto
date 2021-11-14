import * as React from 'react';
import { useState } from 'react';
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
  // const [expanded, setExpanded] = React.useState(false);

  const [state, setState] = useState("address");

  // eslint-disable-next-line no-unused-vars
  const { name, order_type, amount, currency, address, store_img } = config;

  const options = [
    {
      value: "Celo Dollar (cUSD)",
      label: <span className="label"><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1635965533/7236_1_vsttxa.png" alt="" /> Celo Dollar (cUSD)</span>
    },
    {
      value: "Ethereum",
      label: <span className="label"><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1635964474/Cryptocurrency_r8kedk.png" alt="" /> Ethereum</span>,

    },
    {
      value: "Dodge",
      label: <span className="label"><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1635965533/Cryptocurrency2_fniyvz.png" alt="" /> Dodge</span>,
    },
    {
      value: "Stellar",
      label: <span className="label"><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1635965533/Cryptocurrency4_dfew2o.png" alt="" /> Stellar</span>,
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
<Select options={options} className="select-box" />
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
import * as React from "react";
import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import cryptoIcon from 'base64-cryptocurrency-icons'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { CopyToClipboard } from "react-copy-to-clipboard";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const currencies = [
    {
        code: 'CELO'
    },
    {
        code: 'cUSD'
    }
    //TODO: add other supported currencies
];


function ModalConfig() {

    const [paymentLink, setPaymentLink] = useState('');
    const [isGenerated, setIsGenerated] = useState(false)
    const [copiedText, setCopiedText] = useState();

    const [name, setName] = useState('');
    const [storeImg, setStoreImg] = useState('');
    const [paymentDescription, setPaymentDescription] = useState('');
    const [supportedCurrencies, setSupportedCurrencies] = useState({});
    const [selectedCoin, setSelectedCoin] = useState('CELO');

    const url = new URL(window.location.href);

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        setName(url.searchParams.get('name'));
        setStoreImg(url.searchParams.get('storeImg'));
        setPaymentDescription(url.searchParams.get('paymentDescription'));
        const supportedCurrenciesFromParams = JSON.parse(decodeURIComponent(url.searchParams.get('supportedCurrencies')));

        setSupportedCurrencies(supportedCurrenciesFromParams);
    }, [])


    const handleSupportedCurrChange = (name, option) => (e) => {
        setSupportedCurrencies({
            ...supportedCurrencies,
            [name]: {
                ...supportedCurrencies[name],
                [option]: e.target.value
            }
        })
    }

    const addSupportedCurrency = () => {
        if (!supportedCurrencies?.[selectedCoin.toUpperCase()]) {
            setSupportedCurrencies({
                ...supportedCurrencies,
                [selectedCoin]: {
                    amount: 0,
                    walletAddress: '',
                    code: selectedCoin
                }
            })
        }
    }

    const generatePaymentLink = () => {
        const encodedSupportedCurrencies = encodeURIComponent(JSON.stringify(supportedCurrencies));

        var source = new URL('https://offline-pay-with-crypto.onrender.com');
        source.searchParams.set('name', name);
        source.searchParams.set('storeImg', storeImg);
        source.searchParams.set('paymentDescription', paymentDescription);
        source.searchParams.set('supportedCurrencies', encodedSupportedCurrencies);

        setPaymentLink(source.href)
        setIsGenerated(true)
    }

    return (
        <>
            <Box sx={{ my: 4 }}>
                <Container sx={{ boxShadow: 2, p: 3 }} maxWidth="md">
                    <Typography variant="h5" gutterBottom>
                        Generate Payment Link
                    </Typography>
                    <TextField margin="normal" value={name} onChange={(e) => setName(e.target.value)} fullWidth label="Name" variant="outlined" />
                    <TextField margin="normal" value={paymentDescription} onChange={(e) => setPaymentDescription(e.target.value)} fullWidth label="Description" multiline
                        rows={6} variant="outlined" />
                    <TextField margin="normal" placeholder="https://" value={storeImg} onChange={(e) => setStoreImg(e.target.value)} fullWidth label="Store Image URL" variant="outlined" />
                    <Box sx={{ my: 2 }}>Supported Currencies</Box>

                    {supportedCurrencies && Object.entries(supportedCurrencies).map((crypto) => {
                        const [, curr] = crypto;

                        return (
                            <>
                                <Stack direction="row" mt={3} spacing={2}>

                                    <FormControl sx={{ width: '100%' }}>
                                        <TextField margin="normal" value={curr?.walletAddress} onChange={handleSupportedCurrChange(curr?.code, 'walletAddress')} fullWidth label="Wallet Address" variant="outlined" />
                                    </FormControl>
                                    <FormControl sx={{ width: '100%' }}>
                                        <TextField margin="normal" fullWidth value={curr?.amount} onChange={handleSupportedCurrChange(curr?.code, 'amount')} label="Amount to charge" variant="outlined" />
                                    </FormControl>
                                </Stack>
                                <FormControl sx={{ width: '100%' }}>
                                    <TextField
                                        id="code"
                                        defaultValue={curr?.code}
                                        value={curr?.code}
                                        fullWidth
                                        margin="normal"
                                        label="Pay with"
                                        select
                                        variant="outlined"
                                        disabled
                                    >
                                        {currencies.map((currency) => {
                                            const upperCode = currency?.code?.toUpperCase()
                                            const cIcon = cryptoIcon[upperCode];

                                            return (
                                                <MenuItem key={currency.code} value={currency.code}>
                                                    <span className="label">
                                                        <img style={{ width: "30px" }} src={cIcon?.icon} alt="" /> {currency.code} (
                                                        {cIcon?.name})
                                                    </span>
                                                </MenuItem>
                                            )
                                        })}
                                    </TextField>
                                </FormControl>
                            </>
                        )
                    })


                    }
                    <Stack direction="row" mt={6} spacing={2}>
                        <Box sx={{ width: '100%' }} >
                            <TextField
                                id="selectedCoin"
                                defaultValue={selectedCoin}
                                value={selectedCoin}
                                onChange={(e) => setSelectedCoin(e.target.value)}
                                fullWidth
                                margin="normal"
                                label="Add currency"
                                select
                                variant="outlined"

                            >
                                {currencies.map((currency) => {
                                    const upperCode = currency?.code?.toUpperCase()
                                    const cIcon = cryptoIcon[upperCode];

                                    return (
                                        <MenuItem key={currency.code} value={currency.code}>
                                            <span className="label">
                                                <img style={{ width: "30px" }} src={cIcon?.icon} alt="" /> {currency.code} (
                                                {cIcon?.name})
                                            </span>
                                        </MenuItem>
                                    )
                                })}
                            </TextField>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
                            <Button onClick={addSupportedCurrency} variant="contained">ADD SUPPORTED CURRENCY</Button>
                        </Box>
                    </Stack>



                    {
                        isGenerated ?
                            (
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    xs={12}
                                    component={Box}
                                    paddingLeft="15px"
                                    paddingRight="15px"
                                >
                                    <CopyToClipboard
                                        text={paymentLink}
                                        onCopy={() => {
                                            setCopiedText(paymentLink)
                                            handleClick()
                                            setIsGenerated(false)
                                        }}
                                    >
                                        <Tooltip
                                            title={
                                                copiedText === paymentLink
                                                    ? "Copied!"
                                                    : "Copy To Clipboard"
                                            }
                                            placement="top"
                                        >

                                            <Box

                                                component="button"
                                                fontFamily="inherit"
                                                fontSize="16px"
                                                fontWeight="400"
                                                lineHeight="1.25"
                                                display="flex"
                                                flexWrap="wrap"
                                                width="100%"
                                                margin=".5rem 0"
                                                padding="24px"
                                                maxHeight="300px"
                                                textAlign="left"
                                                border="0"
                                                borderRadius="4px"
                                                type="button"
                                                variant="contained"
                                            >
                                                <Typography>
                                                    <code>
                                                        {paymentLink}
                                                    </code>
                                                </Typography>

                                            </Box>
                                        </Tooltip>
                                    </CopyToClipboard>



                                </Grid>
                            )
                            : ""

                    }

                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ m: 2 }}>
                        <Button onClick={generatePaymentLink} variant="contained">Generate Payment Link </Button>
                    </Box>

                </Container>
            </Box>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Link Copied!
                </Alert>
            </Snackbar>
        </>
    );
}

export default ModalConfig;

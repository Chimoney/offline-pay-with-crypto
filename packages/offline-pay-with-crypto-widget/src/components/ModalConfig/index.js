import * as React from 'react'
import * as Yup from 'yup'
import { useState, useEffect, useCallback } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { icons as cryptoIcon } from '../icons';
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CopyAllIcon from '@mui/icons-material/CopyAll';
import InputAdornment from '@mui/material/InputAdornment';
import { Formik, FieldArray, getIn } from 'formik';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const currencies = [
  {
    code: 'CELO'
  },
  {
    code: 'CUSD'
  }
  //TODO: add other supported currencies
];

function ModalConfig() {
  const [paymentLink, setPaymentLink] = useState('')
  const [isGenerated, setIsGenerated] = useState(false)
  const [copiedText, setCopiedText] = useState()

  const [config, setConfig] = useState({
    name: '',
    storeImg: '',
    amountToCharge: 0,
    paymentDescription: '',
    supportedCurrencies: []
  })

  const [selectedCoin, setSelectedCoin] = useState('CELO')

  const url = new URL(window.location.href)

  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    const name = url.searchParams.get('name') || ''
    const storeImg = url.searchParams.get('storeImg') || ''
    const paymentDescription = url.searchParams.get('paymentDescription') || ''
    const amountToCharge = url.searchParams.get('amountToCharge') || 0
    const supportedCurrenciesFromParams = JSON.parse(
      decodeURIComponent(url.searchParams.get('supportedCurrencies'))
    )

    let arrayFromSupportedCurrencies = []
    for (const [, value] of Object.entries(supportedCurrenciesFromParams)) {
      arrayFromSupportedCurrencies.push(value)
    }

    setConfig({ name, amountToCharge, storeImg, paymentDescription, supportedCurrencies: arrayFromSupportedCurrencies })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAmountInput = useCallback((e) => {
    const keyCode = e.keyCode;
    if (keyCode !== 8 && !e.code.includes("Digit") && keyCode !== 37 && keyCode !== 39) {
      e.preventDefault();
    }
  }, []);

  return (
    <>
      <Formik
        enableReinitialize
        validateOnBlur
        validateOnChange={false}
        initialValues={{
          ...config,

        }}
        validationSchema={
          Yup.object().shape({
            name: Yup.string().required('Name is required'),
            storeImg: Yup.string().required('Store Image URL is required'),
            amountToCharge: Yup.number('Amount to charge must be a number').required().positive().integer(),
            paymentDescription: Yup.string().required('Payment Description is required'),
            supportedCurrencies: Yup.array().of(Yup.object().shape({
              walletAddress: Yup.string().required('Wallet Address is required').min(30, 'Wallet address must be atleast 30 characters'),
              code: Yup.string().required('Currency code is required'),
              amount: Yup.number().required('Amount to charge is required'),
            })
            )
          })}
        onSubmit={async (
          values,
          { setErrors, setStatus, setSubmitting }
        ) => {
          console.log({ values })
          //   const encodedSupportedCurrencies = encodeURIComponent(
          //     JSON.stringify(supportedCurrencies)
          //   )
          //   var source = new URL(`${window.location.origin}`)
          //   source.searchParams.set('name', name)
          //   source.searchParams.set('storeImg', storeImg)
          //   source.searchParams.set('paymentDescription', paymentDescription)
          //   source.searchParams.set('supportedCurrencies', encodedSupportedCurrencies)
          //   setPaymentLink(source.href)
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          setFieldValue,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ bgcolor: 'white', my: 4 }}>
              <Container sx={{ boxShadow: 2, p: 3 }} maxWidth="md">
                <Typography variant="h5" gutterBottom>
                  Generate Payment Link
                </Typography>
                <TextField
                  margin="normal"
                  value={values?.name}
                  name="name"
                  onChange={handleChange}
                  error={Boolean(
                    getIn(
                      touched,
                      "name"
                    ) &&
                    getIn(errors, "name")
                  )}

                  helperText={
                    getIn(
                      touched,
                      "name"
                    ) &&
                    getIn(errors, "name")
                  }
                  fullWidth
                  label="Name"
                  variant="outlined"
                />
                <TextField
                  margin="normal"
                  value={values?.paymentDescription}
                  onChange={handleChange}
                  fullWidth
                  label="Description"
                  multiline
                  error={Boolean(
                    getIn(
                      touched,
                      "paymentDescription"
                    ) &&
                    getIn(errors, "paymentDescription")
                  )}

                  helperText={
                    getIn(
                      touched,
                      "paymentDescription"
                    ) &&
                    getIn(errors, "paymentDescription")
                  }
                  name="paymentDescription"
                  rows={6}
                  variant="outlined"
                />
                <TextField
                  margin="normal"
                  placeholder="https://"
                  value={values?.storeImg}
                  onChange={handleChange}
                  error={Boolean(
                    getIn(
                      touched,
                      "storeImg"
                    ) &&
                    getIn(errors, "storeImg")
                  )}

                  helperText={
                    getIn(
                      touched,
                      "storeImg"
                    ) &&
                    getIn(errors, "storeImg")
                  }
                  name="storeImg"
                  fullWidth
                  label="Store Image URL"
                  variant="outlined"
                />
                <TextField
                  margin="normal"
                  placeholder="Amount to charge in USD"
                  value={values?.amountToCharge}
                  onKeyDown={handleAmountInput}
                  onChange={handleChange}
                  error={Boolean(
                    getIn(
                      touched,
                      "amountToCharge"
                    ) &&
                    getIn(errors, "amountToCharge")
                  )}

                  helperText={
                    getIn(
                      touched,
                      "amountToCharge"
                    ) &&
                    getIn(errors, "amountToCharge")
                  }
                  name="amountToCharge"
                  fullWidth
                  label="Amount to Charge in USD"
                  variant="outlined"
                />
                <Box sx={{ my: 2 }}>Supported Currencies</Box>
                <FieldArray
                  name="supportedCurrencies"
                  render={arrayHelpers => {
                    const { supportedCurrencies } = values;
                    return (
                      <>
                        {supportedCurrencies.length > 0 &&
                          supportedCurrencies.map((curr, idx) => {
                            return (
                              <div key={idx}>
                                <Stack direction="row" mt={3} spacing={2}>
                                  <FormControl sx={{ width: '100%' }}>
                                    <TextField
                                      margin="normal"
                                      value={curr?.walletAddress}
                                      name={`supportedCurrencies.${idx}.walletAddress`}
                                      error={Boolean(
                                        getIn(
                                          touched,
                                          `supportedCurrencies.${idx}.walletAddress`
                                        ) &&
                                        getIn(errors, `supportedCurrencies.${idx}.walletAddress`)
                                      )}

                                      helperText={
                                        getIn(
                                          touched,
                                          `supportedCurrencies.${idx}.walletAddress`
                                        ) &&
                                        getIn(errors, `supportedCurrencies.${idx}.walletAddress`)
                                      }
                                      onChange={handleChange}
                                      fullWidth
                                      label="Wallet Address"
                                      variant="outlined"
                                    />
                                  </FormControl>
                                  <FormControl sx={{ width: '100%' }}>
                                    <TextField
                                      margin="normal"
                                      fullWidth
                                      value={curr?.amount}
                                      name={`supportedCurrencies.${idx}.amount`}
                                      error={Boolean(
                                        getIn(
                                          touched,
                                          `supportedCurrencies.${idx}.amount`
                                        ) &&
                                        getIn(errors, `supportedCurrencies.${idx}.amount`)
                                      )}

                                      helperText={
                                        getIn(
                                          touched,
                                          `supportedCurrencies.${idx}.amount`
                                        ) &&
                                        getIn(errors, `supportedCurrencies.${idx}.amount`)
                                      }
                                      onChange={handleChange}
                                      label="Amount to charge"
                                      variant="outlined"
                                    />
                                  </FormControl>
                                </Stack>
                                <Stack direction="row" mt={3} spacing={2}>

                                  <FormControl sx={{ width: '100%' }}>
                                    <TextField
                                      id="code"
                                      defaultValue={curr?.code}
                                      value={curr?.code}
                                      name={`supportedCurrencies.${idx}.code`}
                                      error={Boolean(
                                        getIn(
                                          touched,
                                          `supportedCurrencies.${idx}.code`
                                        ) &&
                                        getIn(errors, `supportedCurrencies.${idx}.code`)
                                      )}

                                      helperText={
                                        getIn(
                                          touched,
                                          `supportedCurrencies.${idx}.code`
                                        ) &&
                                        getIn(errors, `supportedCurrencies.${idx}.code`)
                                      }
                                      fullWidth
                                      margin="normal"
                                      label="Pay with"
                                      select
                                      variant="outlined"
                                      disabled
                                    >
                                      {currencies.map((currency) => {
                                        const upperCode = currency?.code?.toUpperCase()
                                        const cIcon = cryptoIcon[upperCode]

                                        return (
                                          <MenuItem key={currency.code} value={currency.code}>
                                            <span className="label">
                                              <img
                                                style={{ width: '30px' }}
                                                src={cIcon?.icon}
                                                alt=""
                                              />{' '}
                                              {currency.code} ({cIcon?.name})
                                            </span>
                                          </MenuItem>
                                        )
                                      })}
                                    </TextField>
                                  </FormControl>
                                </Stack>
                              </div>
                            )
                          })}

                        <Stack direction="row" mt={6} spacing={2}>
                          <Box sx={{ width: '100%' }}>
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
                                const cIcon = cryptoIcon[upperCode]

                                return (
                                  <MenuItem key={currency.code} value={currency.code}>
                                    <span className="label">
                                      <img
                                        style={{ width: '30px' }}
                                        src={cIcon?.icon}
                                        alt=""
                                      />{' '}
                                      {currency.code} ({cIcon?.name})
                                    </span>
                                  </MenuItem>
                                )
                              })}
                            </TextField>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ width: '100%' }}
                          >
                            <Button type="button" onClick={() => {
                              if (supportedCurrencies.findIndex(cur => cur?.code?.toUpperCase() === selectedCoin?.toUpperCase()) === -1) {
                                arrayHelpers.push({
                                  amount: 0,
                                  walletAddress: '',
                                  code: selectedCoin
                                })
                              }
                            }} variant="contained">
                              ADD SUPPORTED CURRENCY
                            </Button>
                          </Box>
                        </Stack>
                      </>
                    )
                  }} />




                {isGenerated ? (
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
                          copiedText === paymentLink ? 'Copied!' : 'Copy To Clipboard'
                        }
                        placement="top"
                      >
                        <TextField
                          margin="normal"
                          value={paymentLink}
                          label="Copy Payment Link "
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <CopyAllIcon />
                              </InputAdornment>
                            ),
                          }}
                          rows={6}
                          disabled
                          variant="outlined"
                        />
                      </Tooltip>
                    </CopyToClipboard>
                  </Grid>
                ) : (
                  ''
                )}

                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ m: 2 }}
                >
                  <Button type="submit" variant="contained">
                    Generate Payment Link{' '}
                  </Button>
                </Box>
              </Container>
            </Box>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Link Copied!
              </Alert>
            </Snackbar>
          </form>
        )}
      </Formik>
    </>
  )
}

export default ModalConfig

import axios from 'axios'
const apiKey = process.env.REACT_APP_COIN_API_KEY
console.log({ apiKey })

const axiosApiInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-CoinAPI-Key': apiKey,
  },
})

axiosApiInstance.defaults.baseURL = 'https://rest.coinapi.io'

export const coinApi = {
  getExchange: async (code) => {
    try {
      let data = {}
      const response = await axiosApiInstance.get(
        `/v1/exchangerate/${code}/USD`
      )

      data[code] = {
        rate: response?.data?.rate,
        error: false,
      }

      return data
    } catch (err) {
      return {
        rate: null,
        error: true,
        err,
      }
    }
  },
}

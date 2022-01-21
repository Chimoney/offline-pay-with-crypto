var axios = require('axios');
require('dotenv').config()
const apiKey = process.env.COIN_MARKET_API_KEY;
const testApiKey = process.env.COIN_MARKET_TEST_API_KEY;

const isDev = process.env.NODE_ENV === 'development';

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}

if (isDev) {
    headers['X-CMC_PRO_API_KEY'] = testApiKey;
} else {
    headers['X-CMC_PRO_API_KEY'] = apiKey
}
const baseURL = isDev ? 'https://sandbox-api.coinmarketcap.com' : 'https://pro-api.coinmarketcap.com';
const axiosApiInstance = axios.create({
    headers
})

axiosApiInstance.defaults.baseURL = baseURL;

const CoinMarketAPI = {
    getExchange: async (code) => {
        try {

            const result = await axiosApiInstance.get(`/v1/tools/price-conversion?amount=1&symbol=${code}`);
            let data = {};

            const rate = isDev ? result?.data?.data[`${code}`].quote['USD'].price : result?.data?.data?.quote['USD'].price;

            if (result.status === 200) {
                data[`${code}`] = {
                    rate,
                    error: false
                }
            }

            return data;
        } catch (err) {
             let data = {};
             data[`${code}`] = {
                rate: null,
                error: true,
                err: err.message,
            }

            return data;
        }


    }
}

module.exports = CoinMarketAPI;
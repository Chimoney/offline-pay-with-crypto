import axios from 'axios';
const apiKey = process.env.REACT_APP_COIN_MARKET_API_KEY;

const axiosApiInstance = axios.create({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-CMC_SANDBOX_API_KEY': apiKey
    }
})

axiosApiInstance.defaults.baseURL = 'https://pro-api.coinmarketcap.com';

export const CoinMarketAPI = {
    getExchange: async (code) => {
        try {
            let data = {};

            const response = await axiosApiInstance.get(`/v1/tools/price-conversion?amount=1&symbol=${code}`);

            if(response.status === 200){
                data[code] = {
                    rate: response?.data?.quote?.['USD']?.price,
                    error: false
                }
            }

            return data
        } catch (err) {
            return {
                rate: null,
                error: true,
                err
            }
        }
    }
}
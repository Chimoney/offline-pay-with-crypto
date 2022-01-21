var axios = require('axios');

const apiKey = process.env.COIN_API_KEY

const axiosApiInstance = axios.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-CoinAPI-Key': apiKey,
    },
})

axiosApiInstance.defaults.baseURL = 'https://rest.coinapi.io'

const coinApi = {
    getExchange: async (code) => {
        try {

            let data = {}
            const result = await axiosApiInstance.get(
                `/v1/exchangerate/${code}/USD`
            )

            data[code] = {
                rate: result?.data?.rate,
                error: false,
            }

            return data
        } catch (err){
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

module.exports = coinApi;
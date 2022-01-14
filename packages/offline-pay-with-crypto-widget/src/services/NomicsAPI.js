import axios from 'axios';
const apiKey = '';

const axiosApiInstance = axios.create({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})

axiosApiInstance.defaults.baseURL = 'https://api.nomics.com/v1/';

export const NomicsAPI =  {
    getExchange: async (code) => {
        try {
            const response = await axiosApiInstance.get(`exchange-rates?key=${apiKey}`);
            console.log({response})
        } catch (error) {
            console.error(error.response)
            return {
                rate: null,
                error: true
            }
        }
    }
}
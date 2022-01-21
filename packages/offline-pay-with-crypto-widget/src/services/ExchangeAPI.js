import axios from 'axios';

const axiosApiInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

axiosApiInstance.defaults.baseURL = process.env.REACT_APP_API_URL;

export const ExchangeAPI = {
  getExchange: async (code) => {
    try {
      const response = await axiosApiInstance.get(
        `/rate?code=${code}`
      )

      return response?.data?.data
    } catch (err) {
      return {
        rate: null,
        error: true,
        err,
      }
    }
  },
}

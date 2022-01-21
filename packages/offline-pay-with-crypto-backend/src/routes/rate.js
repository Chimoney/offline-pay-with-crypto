var express = require('express');
const coinApi = require('../services/coin-api');
const CoinMarketAPI = require('../services/coinmarket');
var router = express.Router();

router.get('/', async (req, res, next) => {

    const { code } = req.query;

    if (!code) {
        return res.status(400).json({
            message: 'code is required',
            rate: null,
            error: true
        })
    }

    let result = [];

    const data = await CoinMarketAPI.getExchange(code);

    if (data?.[code]?.error === false) {
        result.push(data);
    } else {
        // fallback support api
        const coinAPIData = await coinApi.getExchange(code);

        result.push(coinAPIData);
    }
    return res.status(200).json({
        data: result[0]
    })

});

module.exports = router;

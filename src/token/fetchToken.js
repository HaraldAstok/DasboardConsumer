const axios = require("axios");
const { API_URL } = require('../util/constants')

let token;

async function fetchApiToken() {
    const { data } = await axios.get(
        API_URL + 'subscribe'
    );
    console.log('token: ', data.token)
    token = data.token
}

async function getToken() {
    return token;
}

module.exports = { fetchApiToken, getToken }
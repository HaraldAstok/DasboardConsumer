const axios = require("axios");
const { API_URL } = require('../util/constants')

let token;

async function fetchApiToken() {
    try {
        const {status, data} = await axios.get(
            API_URL + 'subscribe'
        );

        if (status === 200) {
            token = data.token
        }
    } catch (error) {
        console.log(error);
    }

}

async function getToken() {
    return token;
}

module.exports = { fetchApiToken, getToken }
const axios = require("axios");
const { API_URL } = require('../util/constants')

let token;

async function fetchApiToken() {
    try {
        const response = await axios.get(
            API_URL + 'subscribe'
        );

        if (response.code === 200) {
            token = response.data.token
        }
    } catch (error) {
        console.log(error);
    }

}

async function getToken() {
    return token;
}

module.exports = { fetchApiToken, getToken }
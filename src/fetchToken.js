const axios = require("axios");


async function fetchApiToken() {
    const { data: token } = await axios.get(
        'http://test-task.lingvist.io:3000/api/subscribe'
    );
    console.log('token: ', token)
    return token.token;
}

module.exports = { fetchApiToken }
const axios = require("axios");
const { getToken } = require("../token/fetchToken");

const { API_URL } = require('../util/constants')

async function fetchAnswers() {
    const token = await getToken();
    if (token !== undefined) {
        console.log('fucking token :', token)

        const {data} = await axios.get(
            API_URL + 'answers/' + token
        )
        console.log('answers: ', data.answers.length)
    }

}

module.exports = { fetchAnswers }
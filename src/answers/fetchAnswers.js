const axios = require('axios');
const { setCacheValue } = require('../cache/redisCache');

const { getToken } = require('../token/fetchToken');
const { API_URL } = require('../util/constants')

async function fetchAnswers() {
    const token = await getToken();
    if (token !== undefined) {
        const { data } = await axios.get(
            API_URL + 'answers/' + token
        )
        for (const answer of data.answers) {
            try {
                const key = answer.user_uuid + answer.client_timestamp;
                await setCacheValue(key, answer);
            } catch (error) {
                console.log(error)
            }

        }
    }

}

module.exports = { fetchAnswers }
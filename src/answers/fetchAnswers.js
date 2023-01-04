const axios = require('axios');
const { setCacheValue } = require('../cache/redisCache');

const { getToken, fetchApiToken } = require('../token/fetchToken');
const { API_URL } = require('../util/constants')

async function fetchAnswers() {
    const token = await getToken();
    if (token !== undefined) {
        try {
            const {data, status} = await axios.get(
                API_URL + 'answers/' + token
            )
            
            
            if (status === 200) {
                for (const answer of data.answers) {
                    try {
                        const key = answer.user_uuid + answer.client_timestamp;
                        await setCacheValue(key, answer);
                    } catch (error) {
                        console.log(error)
                    }

                }
            }
            if (status === 400) { // in case token experies or is invalid, get new token
                await fetchApiToken();
            }
        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = { fetchAnswers }
const axios = require('axios');
const { setCacheValue } = require('../cache/redisCache');

const { getToken } = require('../token/fetchToken');
const { API_URL } = require('../util/constants')

async function fetchAnswers() {
    const token = await getToken();
    if (token !== undefined) {
        try {
            const response = await axios.get(
                API_URL + 'answers/' + token
            )

            if (response.code === 200) {
                for (const answer of response.data.answers) {
                    try {
                        const key = answer.user_uuid + answer.client_timestamp;
                        await setCacheValue(key, answer);
                    } catch (error) {
                        console.log(error)
                    }

                }
            }
        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = { fetchAnswers }
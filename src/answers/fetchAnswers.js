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
        
        await setCacheValue(data.answers);
    }

}

module.exports = { fetchAnswers }
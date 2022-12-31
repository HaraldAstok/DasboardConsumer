const axios = require('axios');
const mathjs = require('mathjs');
const { getAllCacheValues } = require("../cache/redisCache");
const { API_URL } = require('../util/constants');


async function postAnswers() {
    const allValues = await getAllCacheValues();
    if (allValues.length) {
        try {
            const timestamp = new Date().toISOString();

            const number_of_users = [...new Set(allValues.map(value => value.user_uuid))].length;
            const number_of_answers = allValues.length;
            const correctnessAnswers = allValues.map(value => value.correctness)
            const avCorrectness = correctnessAnswers.reduce((acc, cur) => acc + cur, 0) / number_of_answers;
            const correctness_stddev = Math.round(mathjs.std(correctnessAnswers) * 100) / 100;

            const result = {
                timestamp,
                per_minute: {
                    number_of_users,
                    number_of_answers,
                    average_correctness: Math.round(avCorrectness * 100) / 100,
                    correctness_stddev,
                }
            }
            await axios.post(API_URL + 'dashboard', result);
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = { postAnswers }

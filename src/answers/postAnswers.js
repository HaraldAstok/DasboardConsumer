const axios = require('axios');
const { getAllCacheValues } = require("../cache/redisCache");


async function postAnswers() {
    const allValues = await getAllCacheValues();
    if (allValues.length) {
        try {
            const timestamp = new Date().toISOString();

            const uniqueCount = [...new Set(allValues.map(value => value.user_uuid))].length;
            const answersCount = allValues.length;
            const correctnessAnswers = allValues.map(value => value.correctness)
            const avCorrectness = correctnessAnswers.reduce((acc, cur) => acc + cur, 0) / answersCount;

            const result = {
                timestamp,
                per_minute: {
                    number_of_users: uniqueCount,
                    number_of_answers: answersCount,
                    average_correctness: Math.round(avCorrectness * 100) / 100,
                }
            }
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }



}

module.exports = { postAnswers }

const cron = require('node-cron');
const { fetchAnswers } = require('./answers/fetchAnswers');
const { postAnswers } = require('./answers/postAnswers');
const { fetchApiToken } = require('./token/fetchToken');


async function scheduleCronJobs() {
    await fetchTokenCronJob();
    await fetchAnswersCronJob();
    await postStats();
}

async function fetchTokenCronJob() {
    //cron.schedule('*/30 * * * * *', async function () {
    cron.schedule('*/20 * * * * *', async function () {
        await fetchApiToken();
    })
}

async function fetchAnswersCronJob() {
    // cron.schedule('*/1 * * * * *', async function () {
    cron.schedule('*/10 * * * * *', async function () {
        await fetchAnswers();
    })
}

async function postStats() {
    //cron.schedule('*/1 * * * * *', async function () {
    cron.schedule('*/10 * * * * *', async function () {
        await postAnswers();
    })
}
module.exports = { scheduleCronJobs }
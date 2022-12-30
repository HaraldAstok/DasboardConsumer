const cron = require('node-cron');
const { fetchAnswers } = require('./answers/fetchAnswers');
const { fetchApiToken } = require('./token/fetchToken');


async function scheduleCronJobs() {
    await fetchTokenCronJob();
    await fetchAnswersCronJob();

}

async function fetchTokenCronJob() {
    //cron.schedule('*/30 * * * * *', async function () {
    cron.schedule('*/20 * * * * *', async function () {
        await fetchApiToken();
    })
}

async function fetchAnswersCronJob() {
    // cron.schedule('*/1 * * * * *', async function () {
    cron.schedule('*/5 * * * * *', async function () {
        await fetchAnswers();
    })
}

module.exports = { scheduleCronJobs }
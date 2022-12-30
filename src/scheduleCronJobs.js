const cron = require("node-cron");
const { fetchApiToken } = require('./fetchToken');


async function scheduleCronJobs() {
    await fetchTokenCronJob();
}

async function fetchTokenCronJob() {
    cron.schedule('*/30 * * * * *', async function () {
        const token = await fetchApiToken();

    })
}

module.exports = { scheduleCronJobs }
const express = require("express");
const { cacheSetUp, getAllCacheValues } = require("./cache/redisCache");
const { scheduleCronJobs } = require("./scheduleCronJobs");

const app = express();
const port = process.env.PORT || 3001;

init();

async function init() {
  try {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
    await cacheSetUp();
    await scheduleCronJobs();
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

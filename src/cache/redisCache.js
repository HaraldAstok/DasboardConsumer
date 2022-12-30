const redis = require('redis');
const client = redis.createClient();

async function setCacheValue(results) {
    const key = new Date().toISOString();
    await client.set(key, results.length);
    await client.expire(key, 60);
}

async function cacheSetUp() {

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

}
module.exports = { cacheSetUp, setCacheValue }
const redis = require('redis');
const client = redis.createClient();

async function getAllCacheValues() {
    const keys = await client.keys('*')
    let values = [];
    if (keys) {
        for (const key of keys) {
            const value = await client.get(key);
            if (value) {
                try {
                    values.push(JSON.parse(value));

                } catch (error) {
                    console.log(error)
                }
            }
        }
        return values;
    }
    return [];

}

async function setCacheValue(key, result) {
    await client.set(key, JSON.stringify(result), {
        EX: 60,
        NX: true
    })
}

async function cacheSetUp() {

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

}


module.exports = { cacheSetUp, setCacheValue, getAllCacheValues }
import { createClient } from 'redis';
const client = createClient({url: process.env.REDIS_URL});
const redis_key = process.env.REDIS_KEY

async function redis_set(key, value) {
    return new Promise(async (resolve, reject) => {
        try {
            const keyredis = key?`${redis_key}${key}`:redis_key
            const data = await client.set(keyredis, value,{EX: 60});
            resolve(data)
        } catch (error) {
            reject(error)
        }
    });
}

async function redis_get(key) {
    return new Promise(async (resolve, reject) => {
        try {
            const keyredis = key?`${redis_key}${key}`:redis_key
            const data = await client.get(keyredis);
            resolve(data)
        } catch (error) {
            reject(error)
        }
    });
}

async function redis_del(key) {
    return new Promise(async (resolve, reject) => {
        try {
            const keyredis = key?`${redis_key}${key}`:redis_key
            const data = await client.del(keyredis);
            resolve(data)
        } catch (error) {
            reject(error)
        }
    });
}

export {redis_set,redis_get,redis_del,client}
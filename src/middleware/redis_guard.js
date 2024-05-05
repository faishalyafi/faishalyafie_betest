import {redis_get} from '../helper/redis.js'

async function get_redis(req, res, next) {
    try {
        const data = await redis_get()
        if(data){
            return res.status(200).json({ status: 200, message: "sukses",data: JSON.parse(data) });
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "error" });
    }
}

async function get_redis_by_id(req, res, next) {
    try {
        const key = req.params.id?`:${req.params.id}`:req.params.identityNumber?`:${req.params.identityNumber}`:req.params.accountNumber?`:${req.params.accountNumber}`:null
        const data = await redis_get(key)
        if(data){
            return res.status(200).json({ status: 200, message: "sukses",data: JSON.parse(data)});
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "error" });
    }
}


export {get_redis,get_redis_by_id}
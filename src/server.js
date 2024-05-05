import app from "./app.js";
import { createServer } from 'http'
import ('./config/connection.js')
import {client} from './helper/redis.js'
import 'dotenv/config'

const server = createServer(app);
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();


const port = process.env.PORT || 3000
server.listen(port, () => {
	console.log(`connected to http://localhost:${port}`)
});
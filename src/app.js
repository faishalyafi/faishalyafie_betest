import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routing from './index.js'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json({ extended: false}))
app.use(express.urlencoded({ extended: false }))

app.use('/', routing);

app.use((req, res, next) => {
	res.status(404).json({ status: '404', message: "URL Not Found" });
})

export default app



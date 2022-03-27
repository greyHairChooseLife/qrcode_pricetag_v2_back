import express from 'express'

const app = express();

app.get('/', (req, res, next) => {
	res.send('Hello, world');
})

app.listen(3002, () => {
	console.log('Server running in 3002');
})

const express = require('express');

const morgan = require('morgan');

const bodyParser = require('body-parser');


const mongoose = require('mongoose');

const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');


mongoose.connect('mongodb://rogong:'+ process.env.MONGO_ATLAS_PW +'@cluster0-shard-00-00-w5ipg.mongodb.net:27017,cluster0-shard-00-01-w5ipg.mongodb.net:27017,cluster0-shard-00-02-w5ipg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

//mongoose.connect('mongodb://127.0.0.1:27017/shopapi');
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Access, Authorization"
		);

	if(req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'PUT,GET,POST, PATCH, DELETE');
		return res.status(200).json({});
	}
      next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	
	error.status = error.status || 500;
	res.json({
         error:{
         	message: error.message
         }
	});
});

module.exports = app;
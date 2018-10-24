const  express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//import product model
const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Order.find()
    .select('product quantity _id')
    .populate('product', 'name')
    .exec()
    .then(docs => {
    	res.status(200).json({

    		count: docs.length,

    		order: docs.map(docs => {
    			return{

    				_id: doc._id,
    				product: doc.product,
    				quantity: doc.quantity,

    				request: {
    			            type: 'GET',
    			            url: 'http://localhost:3500/orders' + doc._id
    		                 }
    			      }
    		})

    	});
    })
    .catch(err =>{
    	res.status(500).json({
    		error: err
    	});
    });
}); //route.get

router.post('/', (req, res, next) => {
              Product.findById(req.body.productId)
              .then(product => {
              	if(!product){
              		return res.status(404).json({
              			message: "Product not found"
              		});
              	}
                  const order = new Order({
              	
           	_id: mongoose.Types.ObjectId(),
     	    product: req.body.productId,
     	    quantity: req.body.quantity 
     });
                  return order.save();
              })
           .then(result => {
               console.log(result);
               res.status(201).json({
               	message: 'Order stored',
               	createdOrder: {
               		_id: result._id,
               		product: result.product,
               		quantity: result.quantity
               	},
               	request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
               	}
               });
	      })
           .catch(err => {
           	console.log(err);
           	res.status(500).json({
           		error: err
           	});
           	
           });

});

router.get('/:ordertId', (req, res, next) => {
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
    	if(!oder){
    		return res.status(404).json({
    			message: "Product not found"
    		});
    	}
    	res.status(200).json({
    		order: order,
    		request: {
    			type: 'GET',
    			url: 'http://localhost:3000/orders'
    		}
    	});
    })
     .catch(err => {
           	console.log(err);
           	res.status(500).json({
           		error: err
           	});

           		});
    
});


router.patch('/:orderId', (req, res, next) => {

	res.status(200).json({
		message: 'Update oder'
	});
});

router.delete('/:orderId', (req, res, next) => {	
	Order.remove({_id: req.params.orderId})
	.exec()
	.then(result => {
		res.status(200).json({
      message: 'Order deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/orders',
        body: { productId: 'ID', quantity: 'Number'}
      }
    });
	})
	.catch(err => {
      	console.log(err);
      	res.status(500).json({
      		error: err
      	});
      }); //catch
	


});


module.exports = router;
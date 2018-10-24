const  express = require('express');

var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb){
//     cb(null, './uploads');
//   },
//   filename: function(req, file, cb){
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) =>{
//   //reject a file
//   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
//   {
//     cb(null, false);
//   }else{
//     cb(null, true);
//   }
  
  
//};
// const upload = multer({
//   storage: storage, 
//   limits:{
//   fileSize: 1024 * 1024 * 5
// },
// fileFilter: fileFilter
// });

const router = express.Router();

//import product model

const upload = multer({dest: 'uploads/'});
const Product = require('../models/product');

router.get('/', (req, res, next) => {

	Product.find()
	.select("name price _id description category color productImage")
	.exec()
	.then(docs => {
		const response = {

			count: docs.length,
			products: docs.map(doc => {
        return {
          name: doc.name,
          price: doc.price,
          description: doc.description,
          category: doc.category,
          color: doc.color,
          productImage: doc.productImage,
          _id: doc._id,
          request:{
            type:'GET',
            url: 'http://localhost:3500/products/' + doc._id
            
          } 
        }
      })
		}
		
			res.status(200).json(response);
		
	})
	.catch(err => {
      	console.log(err);
      	res.status(500).json({
      		error: err
      	});
});
});


router.post('/', upload.single('productImage'),(req, res, next) => {
  console.log(req.file);
    //create product model object
     const product = new Product({
           _id: new mongoose.Types.ObjectId(),
           name: req.body.name,
           price: req.body.price,
          description: req.body.description,
          category: req.body.category,
          color: req.body.color,
           productImage: req.file.path
     });

     product
     .save()
     .then(result =>{
     	console.log(result);
     	res.status(201).json({
		message: 'Created product successfully',
		createdproduct: {
      name: result.name,
      price: result.price,
      description: result.description,
      category: result.category,
      color: result.color,
      productImage: result.productImage,
      _id: result._id,
      request: {
        type: 'GET',
        url: 'http://localhost:3500/products/' + result._id
      }

    }

     })	
      .catch(err => {
      	console.log(err);
      	res.status(500).json({
      		error: err
      	}); //log end

      });   //catch end
	
    	});  //then
	
});
		
	
	


//GET Product by Id
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
   Product.findById(id)
      .select('name price _id productImage')
      .exec()
      .then(doc => {
      	console.log("From database", doc);
      	if(doc){
      		res.status(200).json({
            product: doc,
            request: {
              type: 'GET',
              url: 'http://localhost:3500/products'
              
            }
          });
      	}else {
      		res.status(404).json({message: 'No valid entry found for provider ID'});
      	}
      	
      })
      .catch(err => {
      	console.log(err);
      	res.status(500).json({
      		error: err
      	});
      }); //catch
	
});


router.patch('/:productId', (req, res, next) => {

	const id = req.params.productId;
	const updateOps = {};
	for (const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	Product.update({_id: id}, { $set: updateOps })
	.exec()
	.then(result => {
		res.status(200).json({
      message: 'Product updated',
      request: {
        type: 'GET',
        url: 'http://localhost:3500/products/' + id
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

router.delete('/:productId', (req, res, next) => {

    const id = req.params.productId;
	Product.remove({_id: id})
	.exec()
	.then(result => {
		res.status(200).json({
      message: 'Product deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3500/products',
        body: { name: 'String', price: 'Number'}
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
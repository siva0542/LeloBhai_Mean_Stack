const router = require('express').Router();
const async = require('async');
const stripe = require('stripe')('sk_test_51Jgr8hSHRe0ktKTtqCXad3VWvN35FXrKhcwpz7p8Z1S5GlwyW7kzc8Y0HLJ066YzUTIiUfsVa9iYeiQvDA4iNsws00i9MvQZOo');
const Category = require('../models/category');
const Product = require('../models/product');
const Order = require('../models/order');

const checkJWT = require('../middlewares/check-jwt');

  router.route('/categories')
  .get((req, res, next) => {
    Category.find({}, (err, categories) => {
      res.json({
        success: true,
        message: "Success",
        categories: categories
      })
    })
  })
  .post((req, res, next) => {
    let category = new Category();
    category.name = req.body.category;
    category.save();
    res.json({
      success: true,
      message: "Successful"
    });
  });

  router.get('/products', (req, res, next) => {
        Product.find({})
          .populate('category')
          .populate('owner')
          .exec((err, products) => {
            if (products) {
              res.json({
                success: true,
                message: "Products",
                products: products
              });
            }
          });
  });

  router.get('/product/:id', (req, res, next) => {
    Product.findById({ _id: req.params.id })
      .populate('category')
      .populate('owner')
      .exec((err, product) => {
        if (err) {
          res.json({
            success: false,
            message: 'Product is not found'
          });
        } else {
          if (product) {
            res.json({
              success: true,
              product: product
            });
          }
        }
      });
  });


  router.get('/categories/:id', (req, res, next) => {
    const perPage = 10;
    const page = req.query.page;
    async.parallel([
      function(callback) {
        Product.count({ category: req.params.id }, (err, count) => {
          var totalProducts = count;
          callback(err, totalProducts);
        });
      },
      function(callback) {
        Product.find({ category: req.params.id })
          .skip(perPage * page)
          .limit(perPage)
          .populate('category')
          .populate('owner')
          .exec((err, products) => {
            if(err) return next(err);
            callback(err, products);
          });
      },
      function(callback) {
        Category.findOne({ _id: req.params.id }, (err, category) => {
         callback(err, category)
        });
      }
    ], function(err, results) {
      var totalProducts = results[0];
      var products = results[1];
      var category = results[2];
      res.json({
        success: true,
        message: 'category',
        products: products,
        categoryName: category.name,
        totalProducts: totalProducts,
        pages: Math.ceil(totalProducts / perPage)
      });
    });
    
  });


  router.get('/product/:id', (req, res, next) => {
    Product.findById({ _id: req.params.id })
      .populate('category')
      .populate('owner')
      .exec((err, product) => {
        if (err) {
          res.json({
            success: false,
            message: 'Product is not found'
          });
        } else {
          if (product) {
            res.json({
              success: true,
              product: product
            });
          }
        }
      });
  });

//https://stripe.com/docs/testing

  router.post('/payment', checkJWT, (req, res, next) => {
    const stripeToken = req.body.stripeToken;
    const currentCharges = Math.round(req.body.totalPrice * 100);
  
    stripe.customers
      .create({
        source: stripeToken.id
      })
      .then(function(customer) {
        return stripe.charges.create({
          amount: currentCharges,
          currency: 'INR',
          customer: customer.id
        });
      })
      .then(function(charge) {
        const products = req.body.products;
  
        let order = new Order();
        order.owner = req.decoded.user._id;
        order.totalPrice = currentCharges;
        
        products.map(product => {
          order.products.push({
            product: product.product,
            quantity: product.quantity
          });
        });
  
        order.save();
        res.json({
          success: true,
          message: "Successfully made a payment"
        });
      });
  });



  module.exports = router;

  
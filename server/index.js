'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = 4000;

// Import all the data
const items = require('./data/items.json');
const companies = require('./data/companies.json');

express()
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints?
  .get('/bacon', (req, res) => res.status(200).json('🥓'))

  // GET Returns all the products
  .get('/products', (req, res) => {
    res.status(200).send(items);
  })

  // GET Returns all the companies
  .get('/companies', (req, res) => {
    res.status(200).send(companies);
  })

  .get('/products/:productId', (req, res) => {
    const currentProduct = items.find(
      (item) => item.id === parseInt(req.params.productId)
    );
    if (currentProduct) res.status(200).send(currentProduct);
    else {
      res
        .status(404)
        .send({ type: 'Error', message: "The product doesn't exist!" });
    }
  })

  // GET a company by its id number
  .get('/company/id/:id', (req, res) => {
    // Checks if the company exists
    const currentCompany = companies.find(
      (company) => company.id === parseInt(req.params.id)
    );

    if (currentCompany) res.status(200).send(currentCompany);
    else {
      res
        .status(404)
        .send({ type: 'Error', message: "The company doesn't exist!" });
    }
  })

  // GET Get a company by its name
  .get('/company/name/:name', (req, res) => {
    // Checks if the company exists
    const currentCompany = companies.find(
      (company) => company.name.toLowerCase() === req.params.name.toLowerCase()
    );

    if (currentCompany) res.status(200).send(currentCompany);
    else {
      res
        .status(404)
        .send({ type: 'Error', message: "The company doesn't exist!" });
    }
  })

  // GET Get all products from company id
  .get('/products/company/id/:id', (req, res) => {
    // Check if company exists
    const currentCompany = companies.find(
      (company) => company.id === parseInt(req.params.id)
    );

    if (currentCompany) {
      const allProducts = items.filter(
        (item) => item.companyId === parseInt(req.params.id)
      );

      if (allProducts) res.status(200).send(allProducts);
      else
        res.status(404).send({ type: 'Error', message: "There's no products" });
    } else {
      res
        .status(404)
        .send({ type: 'Error', message: "The company doesn't exist" });
    }
  })

  // PUT Modifies the inventory
  .put('/products/purchase-item', (req, res) => {
    const currentCart = [];
    // Add the items in the array
    req.body.forEach((item) => {
      if (item.quantity !== 'undefined') currentCart.push(item);
      else
        res
          .status(404)
          .send({ type: 'Error', message: 'The quantity is not specified' });
    });

    items.forEach((item) => {
      currentCart.forEach((itemCart) => {
        // Checks if there's enough item in the inventory and that the quantity is bigger or equal to 0
        if (
          itemCart.id === item.id &&
          item.numInStock >= itemCart.quantity &&
          itemCart.quantity >= 0
        )
          // If the condition is respected, remove the items from the inventory
          item.numInStock -= itemCart.quantity;
      });
    });

    res.status(200).send({ success: true });
  })

  // GET Get all the categories
  .get('/categories', (req, res) => {
    let categories = [];

    // Pushes all categories inside the array
    items.forEach((item) => {
      if (!categories.includes(item.category)) categories.push(item.category);
    });

    res.status(200).send(categories);
  })

  // GET Get all the products by category
  .get('/products/category/:categoryName', (req, res) => {
    let categories = [];
    // Pushes all categories inside the array
    items.forEach((item) => {
      if (!categories.includes(item.category))
        categories.push(item.category.toLowerCase());
    });

    if (categories.includes(req.params.categoryName.toLowerCase())) {
      const products = items.filter(
        (item) =>
          item.category.toLowerCase() === req.params.categoryName.toLowerCase()
      );
      res.status(200).send(products);
    } else {
      res
        .status(404)
        .send({ type: 'Error', message: "The category doesn't exist" });
    }
  })

  .get('/search', (req, res) => {
    if (req.query.brand !== 'null' && req.query.category !== 'null') {
      let copy = items.filter((product) => {
        return (
          product.category.toLowerCase() === req.query.category.toLowerCase() &&
          parseInt(req.query.brand) === product.companyId
        );
      });
      if (copy.length > 0) res.send(copy);
      else res.status(202).send({ type: 'error', message: 'No items!' });
    } else if (req.query.brand !== 'null') {
      let copy = items.filter((product) => {
        return parseInt(req.query.brand) === product.companyId;
      });
      if (copy.length > 0) res.send(copy);
      else res.status(202).send({ type: 'error', message: 'No items!' });
    } else if (req.query.category !== 'null') {
      let copy = items.filter((product) => {
        return (
          product.category.toLowerCase() === req.query.category.toLowerCase()
        );
      });
      if (copy.length > 0) res.send(copy);
      else res.status(202).send({ type: 'error', message: 'No items!' });
    }
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

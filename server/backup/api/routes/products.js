const express = require('express');
const mongoose = require('mongoose');
const ProductModel = require('../models/productModel');
const router = express.Router();

router.get('/', (req, res, next) => {
    ProductModel.find()
    .select('name price _id')
    .exec()
    .then((docs) => {
        console.log("\n\n docs: ", docs, "\n\n");
        if(docs) {
            const response = {
                count: docs.length,
                products: docs
            }
            res.status(200).json(response);
        } else {
            res.status(404).json({
                message: 'No Valid entry found for current product'
            });
        }
    })
    .catch((err) => {
        console.log("\n\n err: ", err, "\n\n");
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    
    const productModel = new ProductModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    productModel.save()
    .then((result) => {
        console.log("\n\n result:   ", result, "\n\n");
        res.status(201).json({
            message: "products post api response",
            createdProduct: productModel
        });
    })
    .catch((err) => {
        console.log("\n\n err: ", err, "\n\n");
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    
    ProductModel.findById(id)
    .exec()
    .then((doc) => {
        console.log("\n\n doc: ", doc, "\n\n");
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: 'No Valid entry found for current product'
            });
        }
    })
    .catch((err) => {
        console.log("\n\n err: ", err, "\n\n");
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;

    console.log("\n\n updateOps: ", req.body, "\n\n");

    ProductModel.updateOne({
        _id: id
    }, {
        $set: {...req.body}
    })
    .exec()
    .then((result) => {    
        console.log("\n\n result: ", result, "\n\n");
        res.status(200).json(result);
    })
    .catch((err) => {
        console.log("\n\n err: ", err, "\n\n");
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    ProductModel.remove({
        _id: id
    })
    .exec()
    .then((result) => {    
        console.log("\n\n result: ", result, "\n\n");
        res.status(200).json(result);
    })
    .catch((err) => {
        console.log("\n\n err: ", err, "\n\n");
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
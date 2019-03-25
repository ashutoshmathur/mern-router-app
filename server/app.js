const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/user');

const DB_URI = 'mongodb+srv://'+ process.env.MONGODB_ATLAS_USER_NAME + ':'+ process.env.MONGODB_ATLAS_PWD+'@web-cluster-1-ixj9e.mongodb.net/test?retryWrites=true';

const app = express();

mongoose.connect(DB_URI);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    // Origin, X-Requested-With, Content-Type, Accept, Authorization
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        
    // if(req.method === 'OPTIONS') {
    //     res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    //     return res.status(200).json({});
    // }
    next();
});
    
app.use('/api', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;

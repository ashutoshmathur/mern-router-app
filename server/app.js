const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT_NO = 5000;

app.get('/api', (req, res) => {
    res.json({
        message: "get api response"
    });
});

app.post('/api/post', (req, res) => {
    res.json({
        message: "post api response"
    });
});

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        userName: 'ashu',
        email: 'test@test.test'
    }

    jwt.sign({user}, 'secretKey', (err, token) => {
        res.json({
            token
        })
    })
});

app.listen(PORT_NO, () => {
    console.log("Server sarted on port no ", PORT_NO)
})
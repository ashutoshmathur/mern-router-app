const jwt = require('jsonwebtoken');
const TokenHelper = require('../utils/token');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        try {
            const refreshToken = req.headers['x-refresh-token'].split(" ")[1];
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
            const new_access_token = TokenHelper.createToken('access_token',decoded);
            res.json({
                user: {
                    acces_token: new_access_token
                }
            });
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    }
};
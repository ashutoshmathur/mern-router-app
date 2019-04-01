const jwt = require("jsonwebtoken");

const AUTH_TOKEN_EXPIRATION_DURATION = '30s';
const REFRESH_TOKEN_EXPIRATION_DURATION = '60s';

exports.createToken = (tokenType, user) => {
    const tokenKey =  tokenType === "refresh_token" ? process.env.JWT_REFRESH_KEY : process.env.JWT_KEY;
    const tokenExpDuration =  tokenType === "refresh_token" ? REFRESH_TOKEN_EXPIRATION_DURATION : AUTH_TOKEN_EXPIRATION_DURATION;
    
    return jwt.sign(
        {
          email: user.email,
          userId: user.userId
        },
        tokenKey,
        {
          expiresIn: tokenExpDuration
        }
      );
}
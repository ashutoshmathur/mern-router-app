const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const AUTH_TOKEN_EXPIRATION_DURATION = '30s';
const REFRESH_TOKEN_EXPIRATION_DURATION = '60s';

const TokenHelper = require('../utils/token');

exports.user_registration = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "e-mail already in use!"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              first_name: req.body.first_name,
              last_name: req.body.last_name
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "User created",
                  user: {
                    _id: result._id,
                    email: result.email,
                    first_name: result.first_name,
                    last_name: result.last_name
                  }
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const access_token = TokenHelper.createToken('access_token',user);
          const refresh_token = TokenHelper.createToken('refresh_token', user);

          return res.status(200).json({
            message: "Auth successful",
            access_token: access_token,
            refresh_token: refresh_token,
            email: user.email,
            userId: user._id,
            first_name: user.first_name,
            last_name: user.last_name
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.user_profile = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json({
          user: {
            userId: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
          }
        });
      } else {
        res.status(404).json({
          message: "Invalid User"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

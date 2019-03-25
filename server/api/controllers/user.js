const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const AUTH_TOKEN_EXPIRATION_DURATION = '30s';

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
                console.log(result);
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
                console.log(err);
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
      console.log("\n\nuser_login, user:  ", user, "\n\n");
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
          const access_token = jwt.sign(
            {
              email: user.email,
              userId: user._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: AUTH_TOKEN_EXPIRATION_DURATION
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            access_token: access_token,
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
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_profile = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      console.log("\n\nuser_profile, user:  ", user, "\n\n");
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
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

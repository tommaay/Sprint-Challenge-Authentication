const axios = require('axios');
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../_secrets/keys');

const { authenticate } = require('./middlewares');

module.exports = server => {
   server.post('/api/register', register);
   server.post('/api/login', login);
   server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
   const payload = {
      username: user.username,
      password: user.password,
   };

   const secret = jwtKey;

   const options = {
      expiresIn: '1m',
   };

   return jwt.sign(payload, secret, options);
}

function register(req, res) {
   // implement user registration
   const creds = req.body;
   const hash = bcrypt.hashSync(creds.password, 13);

   creds.password = hash;

   db('users')
      .insert(creds)
      .then(id => res.status(201).json(id))
      .catch(err => res.status(500).json(err));
}

function login(req, res) {
   // implement user login
   const creds = req.body;

   db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
         if (user && bcrypt.compareSync(creds.password, user.password)) {
            const token = generateToken(user);

            res.status(200).json({
               message: `Welcome back ${user.username}!`,
               token,
            });
         } else {
            res.status(401).json({
               message: 'You are not authorized!',
            });
         }
      })
      .catch(err =>
         res.status(500).json({
            message: 'You shall not pass!!',
         })
      );
}

function getJokes(req, res) {
   axios
      .get('https://safe-falls-22549.herokuapp.com/random_ten')
      .then(response => {
         res.status(200).json(response.data);
      })
      .catch(err => {
         res.status(500).json({ message: 'Error Fetching Jokes', error: err });
      });
}

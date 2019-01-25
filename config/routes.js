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
      expires: '1m',
   };
}

function register(req, res) {
   // implement user registration
   const cred = req.body;
   const hash = bcrypt.hashSync(cred.password, 13);

   cred.password = hash;

   db('users')
      .insert(cred)
      .then(id => res.status(201).json(id))
      .catch(err => res.status(500).json(err));
}

function login(req, res) {
   // implement user login
   const cred = req.body;

   db('users')
      .where({ username: cred.username })
      .first()
      .then(user => {
         if (user && bcyrpt.compareSync(cred.password, user.password)) {
            const token = generateToken(cred);
            res.status(200).json({
               message: `Welcome back ${user.username}`,
               token,
            });
         }
      })
      .catch(err => res.status(500).json(err));
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

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(process.env.SECRET_KEY);
});

// app.use('/auth', require('./auth'));

// app.use('/users', require('./users'));

// app.use('/projects', require('./projects'));

// app.use('/tasks', require('./tasks'));

// the catch all route
app.all('*', (req, res) => {
  res.status(404).send({ msg: 'not found' });
});

module.exports = app;

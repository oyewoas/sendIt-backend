const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

require('dotenv').config();

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// enable cors in dev
app.use(cors());

app.get('/', (req, res) => {
  res.send(process.env.SECRET_KEY);
});

// mount server
app.listen( port, () => {
  console.log(`app running on port ${port}`);

});

const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

// enable cors in dev
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// mount server
app.listen(config.port, config.host, () => {
  console.log(`app running on http://${config.host}:${config.port}`);

});

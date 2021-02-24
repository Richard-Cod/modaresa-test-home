const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors());
// middleware
app.use(express.json());
app.use(express.urlencoded());

const port = 4000;

app.use('/api/brands', require('./routes/brands'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

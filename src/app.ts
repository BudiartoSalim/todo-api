if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
import express = require('express');
const app: express.Application = express();
const PORT: number = 4000;
const router: express.Router = require('./routes/index-router');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(4000, () => {
  console.log(`app is running at http://localhost:${PORT}`)
})
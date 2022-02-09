import express from "express";
import cors from 'cors'

const app = express();
const port = 3000;
const db = require('./queries')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.post('/createdata', db.createdata)
app.post('/checkdata', db.checkdata)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

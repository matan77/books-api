const bodyParser = require("body-parser");
const express = require("express");
const authorsRouter = require("./routes/authors");


const app = express();
app.use(bodyParser.json());
app.use('/api/authors', authorsRouter);

module.exports = app;



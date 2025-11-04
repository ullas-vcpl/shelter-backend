const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes.js');

app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(require('cookie-parser')());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);


module.exports = app;

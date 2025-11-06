const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes.js');

app.use(cors({origin: "https://shelter-frontend-rho.vercel.app", credentials: true}));
app.use(express.json());
app.use(require('cookie-parser')());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);


module.exports = app;

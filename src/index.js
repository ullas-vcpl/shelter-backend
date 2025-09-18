//configure env variables
const dotenv = require('dotenv');
dotenv.config();

//connect to the database
const connectDB = require('./db/index.js');
connectDB();

//start the server

const app = require('./app.js');
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
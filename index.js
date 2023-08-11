const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandling');
const connectDb = require('./config/dbConnection');
const cors = require('cors');

connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000' 
  }));
app.use(express.json());
app.use("/", require("./routes/docRoutes"));
app.use("/api/schools/", require("./routes/schoolRoutes"));
app.use("/api/auth/", require("./routes/loginregisRoutes"));
app.use("/api/students/", require("./routes/studentRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
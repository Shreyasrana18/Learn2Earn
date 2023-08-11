const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandling');
const connectDb = require('./config/dbConnection');

connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/schools/", require("./routes/schoolRoutes")); 
app.use("/api/auth/", require("./routes/loginregisRoutes"));
app.use("/api/students/", require("./routes/studentRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
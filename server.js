const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const taskRoutes = require('./routes/task.routes');
const userRoutes = require('./routes/user.routes');


const app = express();

app.use(cors());
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT|| 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  app.use('/tasks', taskRoutes);
  app.use('/users', userRoutes);


  app.listen(PORT, () => {
    console.log(`Server listening on port  ${PORT}`);
  });
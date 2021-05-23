const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const router = require("./Routes/Router");

const { mongoURI } = require("./config/db");

const PORT = 3001;
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use("/", router);

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.Promise = global.Promise;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("You was connect with the database.");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

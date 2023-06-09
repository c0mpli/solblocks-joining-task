const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors({ exposedHeaders: "token" }));

app.use(require("./middlewares/auth"));

// mongoose.connect("mongodb://localhost:27017/docDb",{useNewUrlParser:true},()=>{
//     console.log("Connected to Database");
// });
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to database!"))
  .catch((error) => console.log("Failed to connect to database!", error));

app.use("/user", require("./routes/user"));

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started");
});

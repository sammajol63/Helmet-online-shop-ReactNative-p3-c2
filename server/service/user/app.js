const cors = require("cors");
const express = require("express");
const { mongoConnect } = require("./config/mongoConnection");
const router = require("./routers/user");
const app = express();
const errorHandler = require("./middleware/errorHandler");

const port = process.env.PORT || 4001;
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", router);
app.use(errorHandler);

(async () => {
  try {
    await mongoConnect();
    app.listen(port, (_) => console.log(`Apps is listening at port ${port}`));
  } catch (err) {
    console.log(`Failed to connect to mongodb`);
  }
})();

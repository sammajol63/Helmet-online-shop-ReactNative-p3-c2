const cors = require("cors");
const express = require("express");
const router = require("./router/user");
const routerProduct = require("./router/product");
const app = express();

const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", router);
app.use("/", routerProduct);

app.listen(port, () => {
  console.log(`this is ${port}`);
});

const Redis = require("ioredis");
const axios = require("axios");

const redis = new Redis({
  password: "1nd7R2rKoj1sPAJNlep8yCpzoZjUU6Ot",
  host: "redis-18625.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 18625,
  username: "default",
});

class controller {
  static async addProduct(req, res, next) {
    try {
      const { name, description, price, mainImg, categoryId } = req.body;

      const { data } = await axios({
        method: "post",
        url: `http://localhost:4002/addProduct`,
        data: {
          name,
          description,
          price,
          mainImg,
          categoryId,
          idmongodb: "63f9f0bdf34ed45bf9fa5cb2",
        },
      });
      await redis.del("product:add");
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async findAllProduct(req, res) {
    try {
      const { data: data2 } = await axios({
        method: "get",
        url: `http://localhost:4001/user`,
      });
      let tempDataMongoUser;
      for (let i = 0; i < data2.length; i++) {
        (tempDataMongoUser = data2[i]), `INI DARI User`;
      }

      const { data: product } = await axios({
        method: "get",
        url: `http://localhost:4002/readProduct`,
      });
      for (let i = 0; i < product.length; i++) {
        console.log(product[i].idmongodb, `<<<<<<<<`);
      }
      // let dataProduct = []
      let input;
      let tempDataMongoProduct = [];
      for (let i = 0; i < product.length; i++) {
        if (product[i].idmongodb === tempDataMongoUser._id) {
          input = {
            id: tempDataMongoUser._id,
            name: tempDataMongoUser.username,
            email: tempDataMongoUser.email,
          };
          product[i].userMongo = {
            input,
          };
          tempDataMongoProduct.push(product[i]);
        }
      }
      await redis.set("users:data", JSON.stringify(tempDataMongoProduct));
      res.status(200).json(tempDataMongoProduct);
    } catch (error) {
      console.log(error, `<<<< INI DARI SERVICE APP`);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async findDetailProduct(req, res) {
    const { slug } = req.params;
    try {
      const { data: data2 } = await axios({
        method: "get",
        url: `http://localhost:4001/user`,
      });

      const { data } = await axios({
        method: "get",
        url: `http://localhost:4002/detailProduct/${slug}`,
      });
      let temp;
      for (let i = 0; i < data2.length; i++) {
        // console.log(data2[0]);
        if (data.idmongodb === data2[0]._id) {
          // console.log(data, `<<<`);
          temp = data;
        }
      }
      // console.log(data.idmongodb);

      await redis.set("product:data", JSON.stringify(temp));
      res.status(200).json({
        statusCode: 200,
        temp,
      });
    } catch (error) {
      console.log(error, `<<<<`);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const { data } = await axios({
        method: "delete",
        url: `http://localhost:4002/destroyProduct/${id}`,
      });
      await redis.del("users:delete");
      res.status(200).json({ message: "success delete" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async editProduct(req, res) {
    let { id } = req.params;
    let { name, description, price, mainImg, categoryId } = req.body;
    try {
      const { data } = await axios({
        method: "patch",
        url: `http://localhost:4002/editProduct/${id}`,
        data: {
          name,
          description,
          price,
          mainImg,
          categoryId,
        },
      });
      await redis.del("product:edit");
      res.status(200).json({ throw: "Success update" });
    } catch (error) {
      console.log(error, `<<<<<<`);
    }
  }
}

module.exports = controller;

const Redis = require("ioredis");
const axios = require("axios");

const redis = new Redis({
  password: "1nd7R2rKoj1sPAJNlep8yCpzoZjUU6Ot",
  host: "redis-18625.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 18625,
  username: "default",
});

class controller {
  static async addUsers(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const { data } = await axios({
        method: "post",
        url: `http://localhost:4001/user`,
        data: {
          username,
          email,
          password,
          phoneNumber,
          address,
        },
      });
      await redis.del("users:add");
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async findAllUsers(req, res) {
    try {
      const { data } = await axios({
        method: "get",
        url: `http://localhost:4001/user`,
      });
      await redis.set("users:data", JSON.stringify(data));
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async findUserById(req, res) {
    const { id } = req.params;
    try {
      const { data } = await axios({
        method: "get",
        url: `http://localhost:4001/user/${id}`,
      });
      await redis.set("users:data", JSON.stringify(data));
      res.status(200).json({
        statusCode: 200,
        data,
      });
    } catch (error) {
      // console.log(error, `<<<<`);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const { data } = await axios({
        method: "delete",
        url: `http://localhost:4001/user/${id}`,
      });
      await redis.del("users:delete");
      res.status(200).json({ message: "success delete" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = controller;

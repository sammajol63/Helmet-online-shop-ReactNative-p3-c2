const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis({
  password: "1nd7R2rKoj1sPAJNlep8yCpzoZjUU6Ot",
  host: "redis-18625.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 18625,
  username: "default",
});

// let userServer = "http://localhost:4001";
let userServer = "http://user-service:4001";

const typeDefs = `#graphql
type Users {
    _id: String
    username: String
    email: String
    phoneNumber: String
    address: String
}

type Query {
    getUsers: [Users]
}

`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const { data } = await axios.get(`${userServer}/user/`);
        await redis.set("users:data", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };

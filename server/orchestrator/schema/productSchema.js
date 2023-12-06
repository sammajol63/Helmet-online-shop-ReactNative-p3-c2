const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis({
  password: "1nd7R2rKoj1sPAJNlep8yCpzoZjUU6Ot",
  host: "redis-18625.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 18625,
  username: "default",
});

// let productServer = "http://localhost:4002";
// let userServer = "http://localhost:4001";
let productServer = "http://app-service:4002";
let userServer = "http://user-service:4001";

const typeDefs = `#graphql
type Products {
    id: Int
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    categoryId: Int
    idmongodb: String
    userMongo: UserMongo
}

type User {
  id: String
  name: String
  email: String
}

type UserMongo {
  _id: String
  username: String
  email: String
}


type Query {
    getProducts: [Products]
    getOneProduct(slug:String): Products
}

`;

const resolvers = {
  Query: {
    getProducts: async () => {
      try {
        const { data: product } = await axios.get(
          `${productServer}/readProduct`
        );
        const { data: dataUser } = await axios.get(`${userServer}/user`);

        let tempDataMongoUser;
        for (let i = 0; i < dataUser.length; i++) {
          (tempDataMongoUser = dataUser[i]), `INI DARI User`;
        }
        console.log(tempDataMongoUser);
        let input;
        let tempDataMongoProduct = [];
        for (let i = 0; i < product.length; i++) {
          if (product[i].idmongodb === tempDataMongoUser._id) {
            input = {
              id: tempDataMongoUser._id,
              name: tempDataMongoUser.username,
              email: tempDataMongoUser.email,
            };
            (product[i].userMongo = input),
              tempDataMongoProduct.push(product[i]);
          }
        }
        await redis.set("product:data", JSON.stringify(tempDataMongoProduct));
        return tempDataMongoProduct;
      } catch (error) {
        console.log(error);
      }
    },

    getOneProduct: async (_, args) => {
      try {
        const slug = args.slug;
        const { data: dataProduct } = await axios.get(
          `${productServer}/detailProduct/${slug}`
        );
        // const id = args.id;
        const { data: dataUser } = await axios.get(
          `${userServer}/user/${dataProduct.idmongodb}`
        );
        dataProduct.userMongo = dataUser.data;
        console.log(dataUser), `INI DATA USER DARI Schema`;
        await redis.set("product:data", JSON.stringify(dataProduct));
        return dataProduct;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };

const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const { hashPassword } = require("../helper/bcrypt");

class User {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("users");
    return users;
  }

  static async findAll() {
    return this.getCollections().find().toArray();
  }

  static async createUser(user) {
    return this.getCollections().insertOne({
      username: user.username,
      email: user.email,
      password: hashPassword(user.password),
      phoneNumber: user.phoneNumber,
      address: user.address,
    });
  }

  static async findById(objectId) {
    return this.getCollections().findOne({
      _id: new ObjectId(objectId),
    });
  }

  static async deleteUser(objectId) {
    return this.getCollections().deleteOne({
      _id: new ObjectId(objectId),
    });
  }
}

module.exports = User;

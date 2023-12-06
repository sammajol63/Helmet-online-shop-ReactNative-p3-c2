const { getDatabase } = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

class controller {
  static async addUsers(req, res, next) {
    const {
      username,
      email,
      password,
      role = "admin",
      phoneNumber,
      address,
    } = req.body;
    try {
      const newUser = await User.createUser({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      res.status(201).json({
        statusCode: 201,
        id: newUser.insertedId,
        username,
        email,
        role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findAllUsers(req, res) {
    try {
      const data = await User.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error, `<<<<<<<<< INI DARI USER`);
    }
  }

  static async findUserById(req, res) {
    const { id } = req.params;
    try {
      const foundUser = await User.findById(id);
      res.status(200).json({
        statusCode: 200,
        data: foundUser,
      });
    } catch (error) {}
  }

  static async deleteUser(req, res) {
    console.log(`MASUK`);
    const { id } = req.params;
    console.log(req.params, `<<<<<<<<<<`);
    try {
      const foundUser = await User.deleteUser(id);
      res.status(200).json({ message: "success delete" });
    } catch (error) {
      console.log(error, `<<<<<`);
    }
  }
}

module.exports = controller;

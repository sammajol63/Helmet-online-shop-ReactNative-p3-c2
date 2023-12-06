const { User, Product, Category, sequelize } = require("../models");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");
const { sign } = require("../helper/jwt");
const { hashPassword, compare } = require("../helper/bcrypt");

class controller {
  static async register(req, res, next) {
    const t = await sequelize.transaction();
    const {
      username,
      email,
      password,
      role = "admin",
      phoneNumber,
      address,
    } = req.body;
    try {
      if (!username) {
        throw { name: `username is required` };
      }
      if (!email) {
        throw { name: `Email is required` };
      }
      if (!password) {
        throw { name: `Password is required` };
      }
      if (password.length < 5) {
        throw { name: `Password minimum 5 character` };
      }
      if (!phoneNumber) {
        throw { name: `Phone number is required` };
      }
      if (!address) {
        throw { name: `address is required` };
      }
      const data = await User.create(
        { username, email, password, role, phoneNumber, address },
        { transaction: t }
      );
      await t.commit();
      res.status(201).json({
        id: data.id,
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async readProduct(req, res, next) {
    try {
      const data = await Product.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async readProductCustomer(req, res, next) {
    try {
      const data = await Product.findAll({
        include: { all: true },
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error, `>>>>><<<<<`);
      next(error);
    }
  }

  static async readCategory(req, res, next) {
    try {
      const data = await Category.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    const t = await sequelize.transaction();
    const { name } = req.body;
    try {
      if (!name) {
        throw { name: "name is require" };
      }
      const data = await Category.create({ name }, { transaction: t });
      await t.commit();
      res.status(201).json({ id: data.id, name: data.name });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, description, price, mainImg, categoryId } = req.body;
      if (!name) {
        throw { name: `name is required` };
      }
      if (!description) {
        throw { name: `description is required` };
      }
      if (!price) {
        throw { name: `Price number is required` };
      }
      if (!mainImg) {
        throw { name: `mainImg is required` };
      }
      if (!categoryId) {
        throw { name: `categoryId is required` };
      }

      const data = await Product.create(
        {
          name,
          description,
          price,
          mainImg,
          categoryId,
          authorId: 1,
          idmongodb: "63f9f0bdf34ed45bf9fa5cb2",
        },
        { transaction: t }
      );
      console.log(data, `<<<<<<<<<<<NINI`);
      await t.commit();
      res.status(201).json({ id: data.id, name: data.name });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: `Email is required` };
      }
      if (!password) {
        throw { name: `Password is required` };
      }
      const data = await User.findOne({ where: { email: email } });
      if (!data) {
        throw { name: `Invalid email/password` };
      }
      const isValid = compare(password, data.password);
      if (!isValid) {
        throw { name: `Invalid email/password` };
      }
      const payload = { id: data.id, email: data.email };
      const access_token = sign(payload);
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    let { id } = req.params;
    let { name, description, price, mainImg, categoryId } = req.body;
    try {
      const data = await Product.update(
        { name, description, price, mainImg, categoryId },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ throw: "Success update" });
    } catch (error) {
      console.log(error, `<<<<<<`);
      next(error);
    }
  }

  static async detailProduct(req, res, next) {
    try {
      const { slug } = req.params;
      const temp = await Product.findOne({
        where: { slug: slug },
        include: { all: true },
      });
      if (!temp) {
        throw { name: `Product not found` };
      }
      res.status(200).json(temp);
    } catch (error) {
      next(error);
    }
  }

  static async destroyProduct(req, res, next) {
    let { id } = req.params;
    try {
      let nameProduct = await Product.findByPk(id);
      if (!id) {
        throw { name: `Product not found` };
      }
      await Product.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: `Success delete ${nameProduct.name} Product` });
    } catch (error) {
      next(error);
      console.log(error, `<<<<INI ERRORNYA`);
    }
  }

  static async destroyCategory(req, res, next) {
    let { id } = req.params;
    try {
      let nameCategory = await Category.findByPk(id);
      if (!id) {
        throw { name: `Category not found` };
      }
      await Category.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: `Success delete ${nameCategory.name} Category` });
    } catch (error) {
      next(error);
      console.log(error, `<<<<INI ERRORNYA`);
    }
  }
}

module.exports = controller;

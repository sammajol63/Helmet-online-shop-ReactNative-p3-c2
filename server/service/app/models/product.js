"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      // Product.belongsTo(models.User, { foreignKey: "authorId" });
      Product.hasMany(models.Images, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 100,
      },
      mainImg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      idmongodb: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
      hooks: {
        beforeValidate: (product, options) => {
          product.slug = product.name.toLowerCase().trim().replaceAll(" ", "-");
        },
      },
    }
  );

  return Product;
};

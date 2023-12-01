// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//Posts model
class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },

    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [280],
      },
    },
    // Foreign key
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

// Exporting
module.exports = Posts;

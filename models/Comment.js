const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {};

Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdOn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id'
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
      modelName: 'comment',
    }
  );
  
  module.exports = Comment;
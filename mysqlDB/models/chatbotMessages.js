const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const ChatbotMessage = sequelize.define(
  "ChatbotMessage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM("QUESTION", "ANSWER"),
    },
    textContent: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "chatbotmessages",
    timestamps: false,
  }
);

module.exports = ChatbotMessage;

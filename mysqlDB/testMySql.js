const sequelize = require("./connection");
const ChatbotMessage = require("./models/chatbotMessages");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL");

    // Test fetching data
    const messages = await ChatbotMessage.findAll({ limit: 5 });
    console.log("Sample MySQL Data:", messages);
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  } finally {
    await sequelize.close();
  }
})();

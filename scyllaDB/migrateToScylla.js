require("dotenv").config();
const sequelize = require("../mysqlDB/connection");
const ChatbotMessage = require("../mysqlDB/models/chatbotMessages");
const { scyllaClient, connectScyllaDB } = require("./connection");
const { v4: uuidv4 } = require("uuid");

async function migrateData() {
  await connectScyllaDB();
  try {
    const messages = await ChatbotMessage.findAll();
    console.log(`Found ${messages.length} records to migrate.`);

    for (const message of messages) {
      const query = `
        INSERT INTO chatBotMessages (data_id, message_text, type, created_at)
        VALUES (?, ?, ?, ?);
      `;
      const params = [
        uuidv4(), // Generate a unique UUID for data_id
        message.textContent, // Align with column names
        message.type,
        message.createdAt,
      ];

      await scyllaClient.execute(query, params, { prepare: true });
      console.log(`Migrated message with ID: ${message.id}`);
    }
    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Migration error:", error);
  } finally {
    await scyllaClient.shutdown();
    await sequelize.close();
  }
}

migrateData();

const { scyllaClient, connectScyllaDB } = require("../connection");

module.exports = async function up() {
  await connectScyllaDB();

  // migration logic for "create_chatBotMessages_table"
  const query = `
    CREATE TABLE IF NOT EXISTS chatBotMessages (
      data_id UUID PRIMARY KEY,
      message_text TEXT,
      type TEXT,
      created_at TIMESTAMP

    );
  `;

  try {
    await scyllaClient.execute(query);
    console.log(
      'Migration "create_chatBotMessages_table" executed successfully.'
    );
  } catch (error) {
    console.error('Migration "create_chatBotMessages_table" failed:', error);
  } finally {
    await scyllaClient.shutdown();
  }
};

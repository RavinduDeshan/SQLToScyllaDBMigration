const { scyllaClient, connectScyllaDB } = require("./connection");

(async () => {
  await connectScyllaDB();
  try {
    const query = "SELECT * FROM message_data;";
    const result = await scyllaClient.execute(query);

    if (result.rows.length > 0) {
      console.log("ChatbotMessage instances in ScyllaDB:");
      result.rows.forEach((row, index) => {
        console.log(`Record ${index + 1}:`, row);
      });
    } else {
      console.log("No records found in ScyllaDB.");
    }
  } catch (error) {
    console.error("Error fetching data from ScyllaDB:", error);
  } finally {
    await scyllaClient.shutdown();
  }
})();

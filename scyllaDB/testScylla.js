const { connectScyllaDB } = require("./connection");

(async () => {
  try {
    await connectScyllaDB();
    console.log("Connected to ScyllaDB");
  } catch (error) {
    console.error("Failed to connect to ScyllaDB:", error);
  }
})();

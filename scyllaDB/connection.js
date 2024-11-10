const { Client } = require("cassandra-driver");
const config = require("./config");

const scyllaClient = new Client({
  contactPoints: config.contactPoints,
  localDataCenter: config.localDataCenter,
  keyspace: config.keyspace,
});

async function connectScyllaDB() {
  try {
    await scyllaClient.connect();
    console.log("Connected to ScyllaDB");
  } catch (error) {
    console.error("Failed to connect to ScyllaDB:", error);
  }
}

module.exports = { scyllaClient, connectScyllaDB };

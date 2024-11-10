const cassandra = require("cassandra-driver");
const client = new cassandra.Client({
  contactPoints: ["127.0.0.1"], // Replace with your container IP if needed
  localDataCenter: "datacenter1",
});

client
  .connect()
  .then(() => console.log("Connected to ScyllaDB"))
  .catch((err) => console.error("Connection failed", err));

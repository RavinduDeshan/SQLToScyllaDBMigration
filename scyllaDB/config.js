module.exports = {
  contactPoints: [process.env.SCYLLA_CONTACT_POINT || "127.0.0.1"],
  localDataCenter: process.env.SCYLLA_LOCAL_DC || "datacenter1",
  keyspace: process.env.SCYLLA_KEYSPACE || "message_data",
};

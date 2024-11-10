const fs = require("fs");
const path = require("path");

const migrationTemplate = (
  name
) => `const { scyllaClient, connectScyllaDB } = require('../connection');

module.exports = async function up() {
  await connectScyllaDB();
  
  // migration logic for "${name}" 
  const query = \`
    -- CQL query
  \`;

  try {
    await scyllaClient.execute(query);
    console.log('Migration "${name}" executed successfully.');
  } catch (error) {
    console.error('Migration "${name}" failed:', error);
  } finally {
    await scyllaClient.shutdown();
  }
};
`;

const generateMigrationFile = (name) => {
  if (!name) {
    console.error("Error: Migration name is required.");
    process.exit(1);
  }

  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const fileName = `${timestamp}_${name}.js`;
  const filePath = path.join(__dirname, "migrations", fileName);

  fs.writeFileSync(filePath, migrationTemplate(name));
  console.log(`Migration file created: ${fileName}`);
};

const migrationName = process.argv[2];
generateMigrationFile(migrationName);

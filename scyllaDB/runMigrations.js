const fs = require("fs");
const path = require("path");
const { scyllaClient, connectScyllaDB } = require("./connection");

const stateFile = path.join(__dirname, "migrationState.json");

const getExecutedMigrations = () => {
  if (fs.existsSync(stateFile)) {
    return JSON.parse(fs.readFileSync(stateFile));
  }
  return { executedMigrations: [] };
};

const saveExecutedMigration = (migrationName) => {
  const state = getExecutedMigrations();
  state.executedMigrations.push(migrationName);
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
};

(async () => {
  await connectScyllaDB();
  const migrationFiles = fs
    .readdirSync(path.join(__dirname, "migrations"))
    .filter((file) => file.endsWith(".js"))
    .sort();

  const state = getExecutedMigrations();
  const executedMigrations = state.executedMigrations;

  for (const file of migrationFiles) {
    if (!executedMigrations.includes(file)) {
      console.log(`Running migration: ${file}`);
      try {
        await require(`./migrations/${file}`)();
        saveExecutedMigration(file);
        console.log(`Migration ${file} completed.`);
      } catch (error) {
        console.error(`Migration ${file} failed:`, error);
        break;
      }
    } else {
      console.log(`Skipping already executed migration: ${file}`);
    }
  }

  await scyllaClient.shutdown();
})();

const app = require("./app")

const connection = require("./knexfile")[process.env.NODE_ENV || "development"];

const db = require("knex")(connection);
console.log(connection);
app.set("db", db);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});

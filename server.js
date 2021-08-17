const express = require("express");
const cors = require("cors");
const app = express();
const menusRouter = require("./app/routes/menu.routes");
const ordersRouter = require("./app/routes/orders.routes");

const corsOptions = {
  origin: "http://localhost:5000",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/menus", menusRouter);
app.use("/orders", ordersRouter);

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const connection = require("./knexfile")[process.env.NODE_ENV || "development"];


const db = require("knex")(connection);
console.log(connection);
app.set("db", db);

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Luis' application!!!" });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});

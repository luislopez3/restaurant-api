const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const menusRouter = require("./app/routes/menu.routes");
const ordersRouter = require("./app/routes/orders.routes");
const orderItemsRouter = require("./app/routes/order_items.routes");

const corsOptions = {
  //origin: "http://localhost:5000",
};

// Middlewares
app.use(morgan("common"));
app.use(helmet());

app.use(express.json());
app.use(cors(corsOptions));
app.use("/menu_items", menusRouter);
app.use("/orders", ordersRouter);
app.use("/order_items", orderItemsRouter);

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const connection = require("./knexfile")[process.env.NODE_ENV || "development"];

const db = require("knex")(connection);
console.log(connection);
app.set("db", db);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Luis' application!!!" });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});

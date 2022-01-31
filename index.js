require('dotenv').config();

const CONFIG = {
    db: process.env.DB,
    port: process.env.PORT,
    host: process.env.HOST,
    heroku: "0.0.0.0",
    maxSizeRequest: "1mb",
    siteUrl: "",
    localUrl: `http://${process.env.HOST}:${process.env.PORT}/`,
  };

console.log(CONFIG);

// Requires and Middlewares
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));
app.use(express.json({ limit: CONFIG.maxSizeRequest }));
app.use(cors());
app.disable("x-powered-by");

// Routes
const BOOKS_ROUTE = require("./routes/BookRoute");
const BOOK_INVENTORY_ROUTE = require("./routes/BookInventoryRoute");
const EBOOKS_ROUTE = require("./routes/EBookRoute");
const EBOOK_INVENTORY_ROUTE = require("./routes/EBookInventoryRoute");

app.use("/api/books", BOOKS_ROUTE);
app.use("/api/bookInventory", BOOK_INVENTORY_ROUTE);
app.use("/api/ebooks", EBOOKS_ROUTE);
app.use("/api/ebookInventory", EBOOK_INVENTORY_ROUTE);

// DB Start
mongoose
  .connect(CONFIG.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("* connected to DB");
  });

// API Start
app.listen(CONFIG.port, CONFIG.host, () => {
  console.log(`* app listening at IP ${CONFIG.host} and PORT ${CONFIG.port}`);
});

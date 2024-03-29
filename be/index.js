const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const {
  admin,
  auth,
  book,
  comment,
  genre,
  publisher,
  user,
} = require("./src/routes");
const { ResourceNotFoundException } = require("./src/utils/exceptions/handler");
const Scheduler = require("./src/schedules/Scheduler");
app.use(express.static("public"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static("dist"));

app.get((req, res) => {
  return res.send("index.html");
});
app.use("/api", auth);
app.use("/api/users", user);
app.use("/api/genres", genre);
app.use("/api/publishers", publisher);
app.use("/api/books", book);
app.use("/api/comments", comment);
app.use("/api/admin", admin);

app.use((req, res, next) => {
  return next(ResourceNotFoundException);
});
app.use((err, req, res, next) => {
  return res.status(err?.statusCode || 500).json({
    message: err?.message || "Internal Error from server!",
    errors: err?.errors || null,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server start with port ${port}`);
});
connectDB();
async function connectDB() {
  const uri = process.env.APP_DB_URI;
  try {
    await mongoose.connect(uri);
    console.log("Db connected");
  } catch (error) {
    console.log("Error from connect DB");
  }
}
Scheduler.deleteInvalidToken();

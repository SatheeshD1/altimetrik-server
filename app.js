var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var usersRouter = require("./routes/users/users");

var app = express();
var cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/users", usersRouter);

// app.use(function (req, res, next) {
//   next(createError(404));
// });

// app.use(function (err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//   res.status(err.status || 500);
//   res.send("error");
// });

app.listen(4000);
console.log("Altimetrik server running in port:4000")
const express = require("express");
const app = express();

// import route file
var admin = require("./admin");
var blog = require("./blog");
var books = require("./books");
var event = require("./event");
var enquiryForm = require("./enquiry_form");

// user route file
app.use("/admin", admin);
app.use("/blog", blog);
app.use("/books", books);
app.use("/event", event);
app.use("/enquiry", enquiryForm);

module.exports = app;

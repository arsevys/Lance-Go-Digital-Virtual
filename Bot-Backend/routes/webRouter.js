const express = require("express");
const Router = new express.Router();

Router.get("/", (req, res)=>{
  res.send("ok");
});

module.exports = Router;

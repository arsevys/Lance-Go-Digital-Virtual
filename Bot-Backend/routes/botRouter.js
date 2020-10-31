const express = require("express");
const Router = new express.Router({});

const whatsappBotController = require("../controllers/whatsappBotController");

Router.post("/webhook/whatsapp/gupshup", whatsappBotController);

module.exports = Router;

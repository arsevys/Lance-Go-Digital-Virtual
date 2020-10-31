require("./config/config");
const express = require("express");
const app = express();
const bot = require("./routes/botRouter");
const web = require("./routes/webRouter");

app.use(express.json());

app.use("/bot", bot);
app.use(web);

app.listen(3000);

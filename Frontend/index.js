require("dotenv").config()
const express = require("express");
const app = express();


app.set("view engine","ejs")
app.set("views",__dirname+"/views")
app.use("/assets",express.static(__dirname+"/public"))
app.get("/login",(req,res)=>{
    res.render("login.ejs",{})
})
app.get("/menu",(req,res)=>{
    res.render("menu.ejs",{ apikey:process.env.APIKEY_ADOBE_EMBED})
})
app.get("/users",(req,res)=>{
    res.render("user.ejs",{})
})

app.get("/register",(req,res)=>{
    res.render("register.ejs",{})
})
app.get("/question/lists",(req,res)=>{
    res.render("list_questions.ejs",{})
})
app.get("/pdf",(req,res)=>{
    res.render("view_pdf.ejs",{})
})

app.listen(process.env.PORT ||3500,()=>{
    console.log("Server Running ")
})
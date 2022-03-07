const express=require("express");
const mongoose=require("mongoose");
const User=require("./model/users");
const bodyparser=require("body-parser");
const methodOverride = require('method-override');

const app=express();
mongoose.connect('mongodb://localhost:27017/assignment_4')
app.set('views',"./views");
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
// app.use('/public', express.static('public'));
// app.use(express.static('public'));
app.use(methodOverride('_method'));
app.get("/",async(req,res)=>{
    const users = await User.find()
    res.render("index.ejs",{users})
})
app.get("/form",(req,res)=>{
    res.render("form.ejs")
})

app.post("/users/add",async(req,res)=>{
    console.log(req.body);
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        isPromoted: req.body.isPromoted
    })
    console.log(user);
    res.redirect("/")
})

app.put("/users/:id",async(req,res)=>{
    await User.updateOne({_id:req.params.id},[
        { $set: { isPromoted: { $not: "$isPromoted" } } }
    ])
    console.log("updated");
    res.redirect("/")
})

app.delete("/users/:id",async(req,res)=>{
    await User.deleteOne({_id:req.params.id})
    console.log("deleted");
    res.redirect("/")
})
app.listen(3000,()=>console.log("server listening on port 3000"))
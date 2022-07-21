const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
//const path = require("path");
//const hbs = require("hbs");
const app = express();
//require("./db/conn");

const port = process.env.PORT || 1234

const url = 'mongodb+srv://Shreyasa_Lankala:Shreyasa9@newcluster.jb0yv.mongodb.net/Signup'

//const static_path =path.join(__dirname,"../public");
//const template_path =path.join(__dirname,"../templates/views");
//const partials_path =path.join(__dirname,"../templates/partials");

//app.use(express.static(static_path));
//app.set("view engine","hbs");
//app.set("views",template_path);
//hbs.registerPartials(partials_path);
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    // useCreateIndex:true,
})

const db = mongoose.connection;
db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


app.post("/sign_up",(req,res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password":password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')
})

app.get("/",(req,res) => {
    // res.set({
    //     "Allow-access-Allow-Origin":'*'
    // })
    return res.status(200).json({
        status:true,
        msg:"successful!"
    });
});

app.listen(port, () => {
    console.log(`server running at port ${port}`);
}) 


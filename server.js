const express =require("express");
const mysql= require("mysql");
const hbs = require("express-hbs");
const path =require("path");
const { error } = require("console");
const app=express();
const port= 3000;
var connection = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"isetcer"
    }
)
connection.connect();

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',
     layoutsDir: __dirname + '/views/layouts'
  }));
  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/views');

  app.get("/login", function(req, res) {
    res.render("login", {
        layout: "main"
    });
});


app.post("/login",function(req,res){
    var userCin = req.body.cin;
    var userpassword = req.body.password;
    var sql="select * from utilisateur where cin = ? and mot_de_passe = ?";
    connection.query(sql,[userCin,userpassword],function(error,results){
        if(results.length > 0){
            console.log("L'utilisateur est connecté");
            
        }else{
            console.log("Erreur de connection");
            
        }
    })

    
})

app.listen(port);
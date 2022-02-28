const express = require('express')
const mysql = require('mysql');
const users = require('./Models/Users/Users')
const bodyParser = require('body-parser');


const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'react-node'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/", (req, res) => {
    res.send("Home Page")
})

// get all users
app.get("/users", (req, res) => {
    users.selectAllUsers(con, res)
})

// get an user user
app.get("/user", (req, res) => {
    users.selectAnUserById(con, req.query.id, res)
})

// get multiple users by there ids
app.get("/usersbyids", (req, res) => { 
    users.selectMultipleUsersByIds(con, req, res)
})

// add new user
app.post("/users", (req, res) => {  
    users.insertNewUser(con, req, res) 
})


// update user info
app.put("/users", (req, res) => {
    users.updateUserById(con, req, res)
})


// delete an users
app.delete("/user", (req, res) => {
    let id = req.query.id
    users.deleteUserById(con, id, res)
})


app.listen(5000, console.log("listening port with 5000 port"))
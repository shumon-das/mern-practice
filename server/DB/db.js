const mysql = require('mysql');

const db = {}

db.mysqConnection = () => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: 'react-node'
    });
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        return con
    });
}



module.exports = db;
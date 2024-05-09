const express = require('express');
const mysql = require('mysql')

const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'gator4232.hostgator.com',
    user: 'christs0_christine',
    password: 'Gu(OA}1HXWL(',
    database: "christs0_blog"
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    /** 
    var sql = "SELECT * FROM Users";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    */
  });

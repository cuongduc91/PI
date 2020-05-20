const express = require("express");
const app = express();
const mongoose = require('mongoose');
app.set('view engine','ejs');

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
    res.render('index');
  });

// app.listen(process.env.PORT);

app.listen(3000);


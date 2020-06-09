const express = require("express");
const app = express();
//fuer MONGODB, aber diese App hat kein DBS => brauchst nicht
//const mongoose = require('mongoose');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
  res.render('index');
});

//Heroku 
app.listen(process.env.PORT);

//localhost:3000
app.listen(3000);
//Mongo DB DataBase--------------
var mongoose = require('mongoose');
//Connect to module mongoose(Mongo DB Database)------------
mongoose.connect('mongodb://localhost/movies3', function (err) {
  if (!err) {
    console.log('connected to MongoDB');
  } else {
    throw err;
  }
});
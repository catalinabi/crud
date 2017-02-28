var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST



//Creamos el Schema de la base de datos------------

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Movie = new Schema({
  title: String,
  description: String,
  rating: Number,
  releasedDate: { type: Date, default: Date.now }
});
var Movie = mongoose.model('Movie', Movie);

//Creamos el Schema de la base de datos------------


router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

// Read from http://127.0.0.1:3000/movies 
router.route('/')
    //GET all movies
    .get(function(req, res, next) {
        //retrieve all movies from Mongo
        Movie.find({}, null, {sort: {title: 1}},  function (err, movies) {
             
              if (err) {
                  return console.error(err);
              } else {
                   
                  //for each movie in Movies-> get date and convert it to DD/MM/YYYY format
                  /*movies.forEach(function(movie) {
                      var fecha = movie.releasedDate.toISOString();
                      console.log("Acaba de llegar la...."+fecha);
                      var fullDate=convertFecha(fecha);
                      fechas.push(fullDate);
                  });*/
    
                 
                 var moment = require('moment');

                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade 
                      //variables-> title, movies(array) & fechas as Array
                    html: function(){
                        res.render('movies/index', {

                              title: 'All my movies',
                              "movies" : movies,
                              moment: moment
                             
                          });
                    },
                    //JSON response will show all movies in JSON format
                    json: function(){
                        res.json(movies);
                    }
                });
              }     
        });
    })
     //POST a new Movie
    .post(function(req, res) {
        // Get values from POST request. These rely on the "name" attributes for forms
        var title = req.body.title;
        var description= req.body.description;
        var rating = req.body.rating;
        var fecha = req.body.releasedDate;
        console.log('La fecha devuelta por usuario es.....'+fecha);
        var isoDate=convertFechaISO(fecha);
         console.log('La fecha ISO es.....'+isoDate);
   
       //CREATE->
        Movie.create({
            title : title,
            description : description,
            rating : rating,
            releasedDate : isoDate
        }, function (err, movie) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
                  console.log(err);
              } else {
                  //Movie has been created
                  console.log('POST creating new ' + movie);
                  res.format({
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("movie");
                        // And forward to success page
                        res.redirect("/movies");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(movie);
                    }
                });
              }
        })
    });
    
router.delete('/:id/edit', function(req, res){
 //find movie by ID
    Movie.findById(req.params.id, function (err, movie) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
           movie.remove(function (err, movie) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETE removing ID: ' + movie._id);
                    res.format({
                        //HTML returns us back to the main page
                          html: function(){
                               res.redirect("/movies");
                         },
                         //JSON returns the item with the message that is has been deleted
                        json: function(){
                               res.json({message : 'deleted',
                                   item : movie
                               });
                         }
                      });
                }
            });
        }
    });
});

    /* GET New Movie page. */
router.get('/new', function(req, res) {
    res.render('movies/new', { title: 'Add New Movie' });
});



//PAGE EDIT MOVIE----------------------------------------------------------
//GET the individual movie by Mongo ID
router.get('/:id/edit', function(req, res) {
    //search for MOVIE
    Movie.findById(req.params.id, function (err, movie) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //Return the movie
            console.log('GET Retrieving ID: ' + movie._id);      
            var fecha = movie.releasedDate.toISOString();
            var fullDate=convertFecha(fecha);
            res.format({
                //HTML response will render the 'edit.jade' template
                html: function(){
                       res.render('movies/edit', {
                          title: 'Movie' + movie._id,
                          "fullDate": fullDate,
                          "movie" : movie
                      });
                 },
                 //JSON response will return the JSON output
                json: function(){
                       res.json(movie);
                 }
            });
        }
    });
});
//PUT to update a movie by ID
router.put('/:id/edit', function(req, res) {
   
    // Get our REST or form values. These rely on the "name" attributes
    var id=req.body.id;
    console.log("Retrieving id ..."+req.id);
    var title = req.body.title;
    var description= req.body.description;
    var rating = req.body.rating;
    var date=req.body.releasedDate;
    console.log('El usuario ha metido......'+date);
    var isoDate=convertFechaISO(date);
    //find the document by ID
        Movie.findById(req.params.id, function (err, movie) {
            //update it
            movie.update({
                title : title,
                description : description,
                rating : rating,
                releasedDate : isoDate
            }, function (err, movieId) {
              if (err) {
                  res.send("There was a problem updating the information to the database: " + err);
              } 
              else {
                      //HTML responds by going back to the page movies/
                      res.format({
                          html: function(){
                               res.redirect("/movies");
                         },
                         //JSON responds showing the updated values
                        json: function(){
                               res.json(movieId);
                         }
                      });
               }
            })
        });

   
});
function convertFecha(fecha){
            var date = fecha.substring(0, fecha.indexOf('T'));
            console.log('Fecha de esta pelicula es '+date);
            var year=date.substring(0,4);
            var month=date.substring(5,7);
            var day=date.substring(8,10);
            var fullDate=day+"/"+month+"/"+year;
            return fullDate;
 }

 function convertFechaISO(fecha){
            var date=fecha;
            var day=parseInt(date.substring(0,2))+1;
            var month=date.substring(3,5);
            var year=date.substring(6,10);
            console.log('dia '+day);
            console.log('month '+month);
            console.log('year'+year);
            var newday=new Date(year+"/"+month+"/"+day);
            console.log(newday.toString());
            var isoDate= newday.toISOString();
            console.log('convertimos la fecha a ISO....'+isoDate);
            return isoDate;
 }
module.exports = router;
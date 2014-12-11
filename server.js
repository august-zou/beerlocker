var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');


mongoose.connect('mongodb://localhost:27017/beerlocker');
var app = express();
// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

var port = process.env.PORT || 3000;

var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on beer!' });
});

// Create a new route with the prefix /beers
router.route('/beers')
 .post(beerController.postBeers)
 .get(beerController.getBeers);

// Create a new route with the /beers/:beer_id prefix
router.route('/beers/:beer_id')
  .get(beerController.getBeer)
  .put(beerController.putBeer)
  .delete(beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert beer on port ' + port);

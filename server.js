var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var fs = require('fs');
var flightObj;
fs.readFile('data.json', 'utf8', function(err, data) {
    if (err)
        throw err;
    flightObj = JSON.parse(data);
});

var searchParams = {};

app.use(express.static(__dirname + '/client'));     // set the static files 
app.use(morgan('dev'));                     // HTTP request logger middleware for node.js
app.use(bodyParser.urlencoded({extended: false}))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())    // parse application/json
app.use(methodOverride());    // simulate DELETE and PUT

app.get('/api/cities', function(req, res) {
    res.json(flightObj.cities); // return all cities in JSON format
});

app.post('/api/flights', function(req, res) {
    searchParams = req.body;
    console.log(req.body);
    var searchResult = flightObj.flights.filter(function(obj) {
        if (obj.to_city_id == obj.from_city_id) {
            return false;
        } else if ((searchParams.tripType == 1 ) && (obj.to_city_id == searchParams.to_city_id && obj.from_city_id == searchParams.from_city_id)) {
            return true;
        } else if ((searchParams.tripType == 2 ) && ((obj.to_city_id == searchParams.to_city_id && obj.from_city_id == searchParams.from_city_id) || (obj.to_city_id == searchParams.from_city_id && obj.from_city_id == searchParams.to_city_id))) {
            return true;
        } else {
            return false;
        }
    });
    console.log(searchResult);
    res.json(searchResult); // return search result
});

app.listen(9000);
console.log('app is running on port 9000');
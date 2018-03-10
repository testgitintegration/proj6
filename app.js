const express = require('express')
const app = express()
var dotenv = require('dotenv'); //liveconf (dotenv should not be used in live)
dotenv.load({ path: '.env.temporary' }); //liveconf (dotenv should not be used in live)
var request = require('request');
var https = require('https');
var github = require('octonode');
var githubDelegator = require('./controllers/githubDelegator');
//var auth = require('./controllers/auth');
var helmet = require('helmet');
app.use(helmet());

//toooodiillloooooo

var username = process.env.GIT_USER;
var password = process.env.GIT_PASS;
var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
var ghme;

//TODO we need to utilize our new authentication mechanism even in this service

app.get('/', function(req, res){
//this should probably be changed to a bash script executing instead... maybee
res.send("nattannatanted");
});

//TODO add winston for and configure it for remote logging reporting bad behaviour with some
// kind of messaging mechanism, in addition we want to keep ordinary logs for a week back or so
// if a customer has a support plan

app.get('/initclientthroughcred', function(req, res) {
  var client = github.client({
    username: process.env.GIT_USER,
    password: process.env.GIT_PASS
  });

  client.get('/user', {}, function (err, status, body, headers) {
    ghme = client.me();
    console.log(body); //json object
    res.send("nattannatanted");
  });
  //ghme = client.me();
});

app.get('/initfirstrepo', function(req, res, next) {

  ghme.repo({
    "name": process.env.CURRENT_PROJECT_NAME,
    "description": "The thirds repo created for the specific user",
  }, callback); //repo

  function callback(){
    console.log('innuti callbacken vad jag nu ska gora har');
    githubDelegator.initRepo(req, res, next);
    //ghme.fork('pksunkara/hub', callback2); //forked repo
    //ghme.fork('https://github.com/lightraysio/basiclocalauthentication.git', callback2); //forked repo
    //https://github.com/lightraysio/basiclocalauthentication.git
  }
  function callback2(){
    console.log('the flow must go on!!!! the flow must go on!!!');
  }

});

//We want to research a bit more if its possible to send the final key both to github as well as to the user.
//is it possible to create an eliptic curve key?
app.get('/cretesshdeploykey', function(req, res) {
  ghme.keys({"title":"laptop", "key":"ssh-rsa AAA..."}, callback); //key
  res.send('ted gardestad!')
});

//this function is in progress
app.get('/createanewhook', function(req, res) {

//first we need to find find the users machine/box to be able to concatenate a correct address for a new webhook.
var hookURL = 'the address that is created through combinging the customers machine with the base address'

ghrepo.hook({
  "name": "web",
  "active": true,
  "events": ["push", "pull_request"],
  "config": {
    "url": hookURL
  }
}, callback); // hook

function callback(){
  //we want to provide some kind of messaging mechanism not only in the admin dash but also as a message
  //to the user that the hook has been set up.
  console.log('all good');
}

});

app.listen(3010, function () {
  console.log('Example app listening on port 3010!')
})

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

//important!!
//TODO not sure if the error handeling is really catching everything or if its only been a problem in async situations?
//important!!

function logErrors (err, req, res, next) {
  //console.error(err.stack)
  console.log("caught an erroor");
  console.log(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    console.log("caught an error");
    console.log(err);
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  console.log("caught an error");
  res.status(500)
  res.render('error', { error: err })
}

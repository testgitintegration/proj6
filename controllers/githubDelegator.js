var util = require('util')
var exec = require('child_process').exec

exports.initRepo = function(req, res, next){

  var child;
  var captureOut = {};

  child = exec('/home/kalle/testprojekt3/git_scripts/init_github_repo.sh', // command line argument directly in string
  function (error, stdout, stderr) {      // one easy function to capture data/errors
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    captureOut.stdout = stdout;
    captureOut.stderr = stderr;
    if (error !== null) {
      console.log('exec error: ' + error);
      captureOut.error = error;
      //if (res) { //too tired at the moment to figure this out but im probably just missing something /kristoffer
        res.json({status: 400, error: "something went wrong", logAll: captureOut});
      //}
      return next();
    } else {
      captureOut.error = null;
      captureOut.noError = 'everything is ok';
      //if (res) { //too tired at the moment to figure this out but im probably just missing something /kristoffer
        res.json({status: 200, error: null, loggAll: captureOut});
      //}
      return next();
    }
  });
}

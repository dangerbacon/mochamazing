/*
  
  A utility script to run Mocha programatically on our stub tests.
  
  Usage:
    node programattic.js
    ...or to automatically re-run...
    node programattic.js --watch 
  
*/


//Require with install
var xrequire = function(mod) { try { return require(mod); } catch(e) { require('child_process').execSync(`npm install ${mod}`); return require(mod); } }

var path = require('path');
var fs = require('fs');
var debounce = xrequire('debounce');

//Run the tests
function runtests()
{
  //Clear cache
  for (var k in require.cache) delete require.cache[k];
  
  //Init mocha
  var Mocha = require('mocha');
  var mocha = new Mocha({
    reporter: path.join(__dirname, '..'),
    reporterOptions: {
      reportDir: path.join(__dirname, "../mochamazing"),
      extraCSS: "h1 { color: purple; }",
      htmlHeader: '<h1>Custom header!</h1>',
      htmlSummary: '<h1>Custom summary!</h1>',
      htmlFooter: '<h1>Custom footer!</h1>'
    }
  });
  
  //Add tests
  fs
    .readdirSync(path.join(__dirname, '../stub-tests'))
    .filter(f => /\.js$/.test(f) )
    .forEach(f => {
      var testpath = path.join(__dirname, '../stub-tests', f);
      mocha.addFile(testpath);
    });    
    
  //Run
  mocha.run();
}
  
//Always run once
runtests();

//Watch?
if (process.argv.indexOf('--watch') !== -1)
{
  var compileTimer = null;
  var debounced = debounce(runtests, 500);
  try {
    fs.watch(path.join(__dirname,'../resources/inline.min.js'), debounced);  
    fs.watch(path.join(__dirname,'../resources/style.min.css'),  debounced);  
    fs.watch(path.join(__dirname,'../resources/templates.html'), debounced);  
    fs.watch(path.join(__dirname,'../stub-tests/stub_tests.js'), debounced);  
  } catch(e) { console.error(e); }
}
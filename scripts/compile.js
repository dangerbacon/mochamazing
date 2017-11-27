/*
  
  A utility script to compile less and JS code.
  
  Usage:
    node compile.js
    ...or to automatically re-run...
    node compile.js --watch 
  
*/

//Require with install
var xrequire = function(mod) { try { return require(mod); } catch(e) { require('child_process').execSync(`npm install ${mod}`); return require(mod); } }

//Requires
var fs = require('fs');
var path = require('path');
var UglifyJS = xrequire('uglify-js');
var less = xrequire('less');
var less_clean_css = xrequire('less-plugin-clean-css');
var debounce = xrequire('debounce');

//Compile function
function compile_less()
{  
  console.log(`Compiling LESS to CSS...`);
 
  var less_code = fs.readFileSync(path.join(__dirname, '../resources/style.less')).toString();
  less.render(less_code, {   
    paths: [".", "../resources"],
    plugins: [new less_clean_css({advanced: true})]
  }, function(e, output)
  {
    if (e)
    {
      output = {css:`body:before { display: block; border: 4px solid red; color: red; `+
      `content: '${e.message.replace(/'/g,'')}, line ${e.line}`}
      console.error(e);
    }
    fs.writeFileSync(path.join(__dirname, '../resources/style.min.css'),output.css);
  });
}


//Compile function
function compile_js()
{  
  console.log(`Compiling JS to CSS...`);
  var js_code = fs.readFileSync(path.join(__dirname, '../resources/inline.js')).toString();
  var min_code = UglifyJS.minify(js_code).code;
  fs.writeFileSync(path.join(__dirname, '../resources/inline.min.js'), min_code);
}


//Compile once
compile_less();
compile_js();

//Watch?
if (process.argv.indexOf('--watch') !== -1)
{
  var compileTimer = null;
  fs.watch(path.join(__dirname,'../resources/style.less'), debounce(compile_less, 1000));  
  fs.watch(path.join(__dirname,'../resources/inline.js'), debounce(compile_js, 1000));  
}
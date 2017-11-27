

//Requires
var path                = require('path');
var fs                  = require('fs');
var XPlates             = require('xplates');
var XPlatesStringTable  = require('xplates-string-table');
var mocha               = require('mocha');
var json_stringify_safe = require('json-stringify-safe');

//Exports
module.exports = Mochamazing;

//################################################################################
//Config
//################################################################################

//Config
var DEFAULT_CONFIG = {
  reportFilename:      "mochamazing.html",
  reportDir:           path.join(process.cwd(), "mochamazing"),
  
  additionalReporters: { 'spec': {} },
  
  hooks:               "hidden",
  skips:               true,
  filenames:           false,
  code:                true,
  
  reportTitle:         "Test Report",  
  reportPageTitle:     undefined, //Defaults to reportTitle
  reportSubtitle:      undefined,
  
  htmlHeader:          null,
  htmlSummary:         null,
  htmlFooter:          null,
  extraCSS:            null,
  
  XPlatesTemplateFile: path.join(__dirname, 'resources/templates.html')
};

//################################################################################
//LZString library
//################################################################################
//LZString Minified, modified to exclude pieces we don't need.
function makeLZString()
{
  //This software is copyrighted to Pieroxy (2013) and all versions are currently licensed under the very popular WTFPL.
  return function(){function o(o,t){if(!n[o]){n[o]={};for(var r=0;r<o.length;r++)n[o][o.charAt(r)]=r}return n[o][t]}var t=String.fromCharCode,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",n={},e={compressToEncodedURIComponent:function(o){return null==o?"":e._compress(o,6,function(o){return r.charAt(o)})},decompressFromEncodedURIComponent:function(t){return null==t?"":""==t?null:(t=t.replace(/ /g,"+"),e._decompress(t.length,32,function(n){return o(r,t.charAt(n))}))},compress:function(o){return e._compress(o,16,function(o){return t(o)})},_compress:function(o,t,r){if(null==o)return"";var n,e,i,s={},p={},a="",c="",h="",u=2,l=3,f=2,d=[],v=0,w=0;for(i=0;i<o.length;i+=1)if(a=o.charAt(i),Object.prototype.hasOwnProperty.call(s,a)||(s[a]=l++,p[a]=!0),c=h+a,Object.prototype.hasOwnProperty.call(s,c))h=c;else{if(Object.prototype.hasOwnProperty.call(p,h)){if(h.charCodeAt(0)<256){for(n=0;f>n;n++)v<<=1,w==t-1?(w=0,d.push(r(v)),v=0):w++;for(e=h.charCodeAt(0),n=0;8>n;n++)v=v<<1|1&e,w==t-1?(w=0,d.push(r(v)),v=0):w++,e>>=1}else{for(e=1,n=0;f>n;n++)v=v<<1|e,w==t-1?(w=0,d.push(r(v)),v=0):w++,e=0;for(e=h.charCodeAt(0),n=0;16>n;n++)v=v<<1|1&e,w==t-1?(w=0,d.push(r(v)),v=0):w++,e>>=1}u--,0==u&&(u=Math.pow(2,f),f++),delete p[h]}else for(e=s[h],n=0;f>n;n++)v=v<<1|1&e,w==t-1?(w=0,d.push(r(v)),v=0):w++,e>>=1;u--,0==u&&(u=Math.pow(2,f),f++),s[c]=l++,h=String(a)}if(""!==h){if(Object.prototype.hasOwnProperty.call(p,h)){if(h.charCodeAt(0)<256){for(n=0;f>n;n++)v<<=1,w==t-1?(w=0,d.push(r(v)),v=0):w++;for(e=h.charCodeAt(0),n=0;8>n;n++)v=v<<1|1&e,w==t-1?(w=0,d.push(r(v)),v=0):w++,e>>=1}else{for(e=1,n=0;f>n;n++)v=v<<1|e,w==t-1?(w=0,d.push(r(v)),v=0):w++,e=0;for(e=h.charCodeAt(0),n=0;16>n;n++)v=v<<1|1&e,w==t-1?(w=0,d.push(r(v)),v=0):w++,e>>=1}u--,0==u&&(u=Math.pow(2,f),f++),delete p[h]}else for(e=s[h],n=0;f>n;n++)v=v<<1|1&e,w==t-1?(w=0,d.push(r(v)),v=0):w++,e>>=1;u--,0==u&&(u=Math.pow(2,f),f++)}for(e=2,n=0;f>n;n++)v=v<<1|1&e,w==t-1?(w=0,d.push(r(v)),v=0):w++,e>>=1;for(;;){if(v<<=1,w==t-1){d.push(r(v));break}w++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:e._decompress(o.length,32768,function(t){return o.charCodeAt(t)})},_decompress:function(o,r,n){var e,i,s,p,a,c,h,u,l=[],f=4,d=4,v=3,w="",m=[],A={val:n(0),position:r,index:1};for(i=0;3>i;i+=1)l[i]=i;for(p=0,c=Math.pow(2,2),h=1;h!=c;)a=A.val&A.position,A.position>>=1,0==A.position&&(A.position=r,A.val=n(A.index++)),p|=(a>0?1:0)*h,h<<=1;switch(e=p){case 0:for(p=0,c=Math.pow(2,8),h=1;h!=c;)a=A.val&A.position,A.position>>=1,0==A.position&&(A.position=r,A.val=n(A.index++)),p|=(a>0?1:0)*h,h<<=1;u=t(p);break;case 1:for(p=0,c=Math.pow(2,16),h=1;h!=c;)a=A.val&A.position,A.position>>=1,0==A.position&&(A.position=r,A.val=n(A.index++)),p|=(a>0?1:0)*h,h<<=1;u=t(p);break;case 2:return""}for(l[3]=u,s=u,m.push(u);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,v),h=1;h!=c;)a=A.val&A.position,A.position>>=1,0==A.position&&(A.position=r,A.val=n(A.index++)),p|=(a>0?1:0)*h,h<<=1;switch(u=p){case 0:for(p=0,c=Math.pow(2,8),h=1;h!=c;)a=A.val&A.position,A.position>>=1,0==A.position&&(A.position=r,A.val=n(A.index++)),p|=(a>0?1:0)*h,h<<=1;l[d++]=t(p),u=d-1,f--;break;case 1:for(p=0,c=Math.pow(2,16),h=1;h!=c;)a=A.val&A.position,A.position>>=1,0==A.position&&(A.position=r,A.val=n(A.index++)),p|=(a>0?1:0)*h,h<<=1;l[d++]=t(p),u=d-1,f--;break;case 2:return m.join("")}if(0==f&&(f=Math.pow(2,v),v++),l[u])w=l[u];else{if(u!==d)return null;w=s+s.charAt(0)}m.push(w),l[d++]=s+w.charAt(0),f--,s=w,0==f&&(f=Math.pow(2,v),v++)}}};return e}();
}
var LZString = makeLZString();


//################################################################################
//Utility functions
//################################################################################

//Is this a mocha object?
function isMochaObject(obj)
{
  return (obj instanceof mocha.Test || obj instanceof mocha.Suite || obj instanceof mocha.Hook);
}

//Make directory, recursive
function mkdirRecursive(dir, levels)
{
  //Check current
  try
  {
    var stat = fs.statSync(dir);
    if (!stat.isDirectory()) throw new Error(`Mochamazing: Path ${pdir} already exists, but is not a directory!`);
  }
  catch(e)
  {
    if (e.code !== "ENOENT") throw e;
    mkdirRecursive(path.resolve(dir, ".."));
    fs.mkdirSync(dir);
  }  
}

//################################################################################
//Stats
//################################################################################

//Stats object
function MochamazingStats()
{
  this.fail = this.pass = this.skip = this.hook = this.info = this.all = 0;
}
MochamazingStats.prototype.addPass = function() { this.pass++; this.all++; }
MochamazingStats.prototype.addFail = function() { this.fail++; this.all++; }
MochamazingStats.prototype.addSkip = function() { this.skip++; this.all++; }
MochamazingStats.prototype.addHook = function() { this.hook++; this.all++; }
MochamazingStats.prototype.addInfo = function() { this.info++; this.all++; }

//Add a stats object to this stats object
MochamazingStats.prototype.addIn = function(s)
{
  this.pass += s.pass;
  this.fail += s.fail;
  this.skip += s.skip;
  this.hook += s.hook;
  this.info += s.info;
  this.all += s.all;
}


//################################################################################
//Reporter
//################################################################################

//Exported reporter
function Mochamazing(runner, options)
{
  //Config
  this.options = Object.assign(
    {},
    DEFAULT_CONFIG,
    { reportSubtitle: new Date().toISOString() },
    options.reporterOptions || {}
  );

  //Save
  this.runner = runner;
  this.additionalReporters = {};

  //Active immediately
  Mochamazing.activeReporter = this;

  //Call base reporter
  mocha.reporters.Base.call(this, runner);

  //A second reporter?
  var reporter_opts = this.options.additionalReporters||{};
  for (var reporter_name in reporter_opts)
  {    
    //Make new options object
    var opts = Object.assign({}, options, { reporter: reporter_name, reporterOptions: reporter_opts[reporter_name] });
    
    //Add reporters
    var reporter_class = mocha.reporters[reporter_name] || require(reporter_name);
    this.additionalReporters[reporter_name] = new reporter_class(runner,opts);
  }

  //Track active test
  var setActive = ()  => { Mochamazing.activeReporter = this; };
  runner.on('suite',     setActive);
  runner.on('suite end', setActive);
  runner.on('test',      setActive);
  runner.on('test end',  setActive);
  runner.on('hook',      setActive);
  runner.on('hook end',  setActive);
  runner.on('start',     setActive);
  
  //On end
  runner.on('end', () => { this._generateReport(runner); });
}

//Done function
Mochamazing.prototype.done = function()
{
  //Walk the done functions of the other reporters
  for (var k in this.additionalReporters)
  {
    var reporter = this.additionalReporters[k];
    if (typeof reporter.done === 'function')
    {
      this.additionalReporter.done.apply(this.additionalReporter, arguments);
    }
  }
}

//Produce the report
Mochamazing.prototype._generateReport = function(runner)
{
  //Do this safely - mocha can hide errors, so we'll need to report them ourself.
  try {
  
    //Load CSS + JS
    var css_code = fs.readFileSync(path.join(__dirname, 'resources/style.min.css')).toString();
    var js_code  = fs.readFileSync(path.join(__dirname, 'resources/inline.min.js')).toString();
  
    //Create template bundle
    var report_config = {};
    var bundle = new XPlates.bundle;
    XPlatesStringTable.parseFileIntoBundleSync(
      bundle,
      {
        language: 'html',
        prefix: 'xplates:',
        predefined: {
          runner: runner,
          options: this.options,
          report_config: report_config,
          mochamazing_css: css_code,
          mochamazing_js:  js_code,
          json_stringify_safe: json_stringify_safe,
          LZString: LZString,
          makeLZString_src: makeLZString.toString(),
          MochamazingStats: MochamazingStats
        }
      },
      this.options.XPlatesTemplateFile
    );
    
    //Make report
    var report_html = bundle.report(runner);

    //Make path
    mkdirRecursive(this.options.reportDir);
    
    //Save file
    var fullpath = path.join(this.options.reportDir, this.options.reportFilename);
    fs.writeFileSync(fullpath, report_html);
    console.log(`[mochamazing] Wrote file "${fullpath}"`);
   
  }
  catch(e)
  {
    console.error(e);
    throw(e);
  }
}



//Add context
Mochamazing.addNote    = function() { Mochamazing._addExtraData("__ma_notes", arguments); }
Mochamazing.addContext = function() { Mochamazing._addExtraData("__ma_contexts", arguments); }
Mochamazing._addExtraData = function(key, args)
{
  //Target object
  var props = args[0];
  var target_obj = null;
  if (isMochaObject(props)) { target_obj = props; props = args[1]; }
  else if (props && isMochaObject(props.currentTest)) { target_obj = props.currentTest; props = args[1]; }
  else if (props && isMochaObject(props.test)) { target_obj = props.test; props = args[1]; }
  else if (Mochamazing.activeReporter)
  {
    target_obj = Mochamazing.activeReporter.runner.currentRunnable;
    
    //"Before Each" and "After Each" hooks add context/notes to the test, not the hook, by default.
    if (target_obj.ctx && target_obj.ctx.currentTest) target_obj = target_obj.ctx.currentTest;
  }

  //Has a target?
  if (target_obj)
  {
    //Make sure array exists
    target_obj[key] = target_obj[key] || [];
    target_obj[key].push(props);
  }
  else
  {
    //Make a new before hook
    before(function()
    {
      this.test.__ma_ignore = true;
      Mochamazing._addExtraData(key, [this.test.parent, props]);
    });
  }
}

//Don't report
Mochamazing.doNotReport = function(target)
{
  //Target redirection
  if (target && !isMochaObject(target))
  {
    if (isMochaObject(target.test)) target = target.test;
    else if (isMochaObject(target.currentTest)) target = target.currentTest;
    else throw new Error("Mochamazing: doNotReport got an invalid target?");
  }  
  //No target?
  else if (!target)
  {
    //Can automatically figure it out?
    if (Mochamazing.activeReporter && Mochamazing.activeReporter.runner)
    {
      target = Mochamazing.activeReporter.runner.currentRunnable;      
    }
    else
    {
      //Create a before hook that calls this on the suite itself.
      before(function()
      {
        Mochamazing.doNotReport(this.test.parent);      
      });  
      return;
    }
  }
  
  //Still no target?
  if (!target) throw new Error("Mochamazing:  doNotReport outside of a test suite?");
  
  //Set ignore
  target.__ma_ignore = true;
}

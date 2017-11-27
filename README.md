# Mochamazing: A Simple, Stylish HTML Mocha Reporter

This module is a [Mocha](https://mochajs.org/) reporter that produces portable, customizable HTML reports.

## Features

* Easy to read stats
* Supports nesting
* Supports pending/skipped tests
* Inline code
* Stack traces
* Compact size
* Fully portable HTML document
* Add custom context + notes to report
* Add custom HTML + CSS to report
* Runs multiple other reporters

# How To Use

## Installing

Add Mochamazing to your project:

```
npm install --save-dev mochamazing
```

... or install Mochamazing globally:

```
npm install -g mochamazing
```

## Running

Run mocha with the reporter:

```
mocha my_test.js --reporter mochamazing
```

... or run programatically:

```javascript
var mocha = new Mocha({
  reporter: 'mochamazing',
  reporterOptions: { /* see options */ }
});
```

# Options

Options available:

```javascript
{
  //Output path
  reportDir:       "./mochamazing",     //Output file location
  reportFilename:  "mochamazing.html",  //Output file name
  
  //What to include in the report
  hooks:           "hidden",            //false=exclude, true=include, "hidden"=include but hide
  skips:           true,                //false=exclude, true=include, "hidden"=include but hide
  filenames:       false,               //false=exclude file names, true=include file names
  code:            true,                //false=exclude code, true=include code
  
  //Report content  
  reportPageTitle: "Test Report",       //Title in the browser
  reportTitle:     "Test Report",       //Title at the top of the report
  reportSubtitle:  "Subtitle",          //Subtitle in the header; defaults to ISO date+time
  
  //Custom content
  //Warning:  if you don't know what injection attacks are and how to prevent them,
  //don't use this feature.  Anything passed using these is included as-is.
  htmlHeader:      "your HTML here",    //Additional HTML to appear before the stats at the top.
  htmlSummary:     "your HTML here",    //Additional HTML to appear after the stats at the top.
  htmlFooter:      "your HTML here",    //Additional HTML to appear at the bottom of the report.
  extraCSS:        "your CSS here",     //Additional CSS to appear in the header.  
  
  //Additional reporters
  additionalReporters: { "spec": {} },  //Additional reporters, format { "name": { options } }
  
  //Complete custom HTML template:  advanced users only!  Copy "templates.html" and customize!
  XPlatesTemplateFile: "/path/to/xplates/string/table"
}
```

# Report Customization

## Context + Notes

You can add additional information to reports using the addContext and addNotes features.  Any information added using these functions shows up in the report.

Usage:

```javascript
addNote(value);          //Add note to current test/hook/suite.  Always visible.
addNote(test,value);     //Add note to passed test.              Always visible.
addNote(hook,value);     //Add note to passed hook.              Always visible.
addNote(suite,value);    //Add note to passed suite.             Always visible.

addContext(value);       //Add note to current test/hook/suite.  Visible on request.
addContext(test,value);  //Add note to passed test.              Visible on request.
addContext(hook,value);  //Add note to passed hook.              Visible on request.
addContext(suite,value); //Add note to passed suite.             Visible on request.
```

Where `value` can be:

* Any primitive.
* Anything that can be converted to JSON.
  * Circular references are converted to  `"[Circular]"`, *undefined* is converted to `"[undefined]"`.
* Any function.
* `{ title: "...", value: ... }` to include set the title of the context as well as the value.
* `{ title: "...", htmlValue: ... }` to inject raw HTML code into the report as the value.
  * Warning:  if you don't know what injection attacks are and how to prevent them, don't use this feature.  Anything passed using `htmlValue` is included as-is.

Example:

```javascript
var mochamazing = require('mochamazing');

describe('My Suite', function()
{
  mochamazing.addNote("This note is displayed at the top of the suite.")
  mochamazing.addNote({ title: "Useful Tip", value: ["objects","are","json","encoded!"] });
  
  it("My Test", function()
  {
    mochamazing.addNote("Notes are always displayed.");
    mochamazing.addContext("Context is displayed when you click the test title.");
  });
});
```

## Do Not Report

You can exclude something from the report using the doNotReport function.

Usage:

```javascript
doNotReport(test);  //Exclude a test from the report.
doNotReport(hook);  //Exclude a hook from the report.
doNotReport(suite); //Exclude an entire suite from the report.
```

Example code:

```javascript
var mochamazing = require('mochamazing');

//Exclude a test
describe('My Suite', function()
{
  it('Tests something', function()
  {
    mochamazing.doNotReport();    
  });
});

//Exclude an entire suite
describe('Excluded Suite', function()
{
  mochamazing.doNotReport();
  it('Tests something', function()
  {
    //Your code here
  })
});
```



# Credit Where Credit Is Due

This project was inspired by [Mochawesome](https://adamgruber.github.io/mochawesome/), another amazing Mocha HTML reporter.  It's a wonderful reporter, and you should check it out. Mochawesome has more features and looks nicer, while Mochamazing allows more customization and produces highly-portable results with small file sizes. 



# License

This software is published under the [WTFPL](http://www.wtfpl.net), version 2.
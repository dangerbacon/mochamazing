

//Requires
var mochamazing = require('../reporter.js');
var addContext  = require('../reporter.js').addContext;
var addNote     = require('../reporter.js').addNote;
var doNotReport = require('../reporter.js').doNotReport;


//Describe some basic tests
describe('Basics', function()
{
  before(function() { /* before hook code */ });
  after(function() { /* after hook code */ });
  beforeEach(function() { /* Before each hook */ });
  afterEach(function() { /* Before each hook */ });
  
  before(function() { throw new Error("Hook failure test"); });
  
  it("Has a pass test", function()
  {
    //Code line 1
    //Code line 2
    //Code line 3
  });
  
  it("Has a fail test", function()
  {
    //Code line 1
    //Code line 2
    //Code line 3
    throw new Error("Sample error message");    
  });
  
  it("Has a skip test", function()
  {
    //Code line 1
    //Code line 2
    //Code line 3
    this.skip();
  });
});

describe('Nesting', function()
{
  it('Before L2');
  describe('Nesting L2', function()
  {
    it('Before L3');
    describe('Nesting L3', function()
    {
      it('Before L4');
      describe('Nesting L4', function()
      {
        it('Before L5');
        describe('Nesting L5', function()
        {
          it('Before L6');
          describe('Nesting L6', function()
          {
            it('Inside L6');
          });
          it('After L6');
        });
        it('After L5');
      });
      it('After L4');
    });
    it('After L3');
  });
  it('After L2');
  
});

//Context tests
describe('Contexts', function()
{ 
  addNote(this, 'Suite level!');
  addNote({ title: 'Key 1', value: 'Short Value!' });
  addNote({ title: 'Key 2', value: 'Long\nMultiline\nValue!' });
  addNote({ title: 'Key 3', value: { a: { b: { c: { d: 123 } } } } });  
  addNote({ a: 1, b: 2, c: 3 });  
  
  addNote({ title: "Number", value: 123 });
  addNote({ title: "NaN", value: NaN });
  addNote({ title: "Single Line String", value: "test string" });
  addNote({ title: "Multi Line String", value: "test\nstring" });
  addNote({ title: "Boolean", value: false });
  addNote({ title: "Null", value: null });
  addNote({ title: "Undefined", value: undefined });
  addNote({ title: "Date", value: new Date() });
  addNote({ title: "Function", value: function() { console.log('function context'); } });

  before(function()
  {  
    addNote(this.test.parent, "Hello, world!");  
    addNote(this.test.parent, {title: "Foo", value: "Bar"});
  });
  
    
  before(function() { addContext('Before hook'); });
  after(function() { addContext('After hook'); });
  beforeEach(function() { addContext('Before each hook'); });
  afterEach(function() { addContext('After each hook'); });
  
  describe('Nested contexts', function()
  {  
    it('Context Test 1', function()
    {
      addContext('inside test 1');
    });
    it('Context Test 2', function()
    {
      addContext('inside Context Test 2');
      addNote('Note for Context Test 2');      
    });
  });  
  
  describe('Fancy contexts', function()
  {
    it('HTML notes', function()
    {
      addNote({ title: 'Sample', htmlValue: '<span style="color: #ff00ff;">Pink text!</span>' })
    });    
  });
});


//A simple suite used in the docs
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


//Empty suite - doesn't get reported.
describe('Empty suite', function()
{  
  describe('Empty nested suite', function()
  {
    it('Does not report this', function()
    {
      doNotReport();
    });
  });  
});

//Exclude an entire suite
describe('Exclude this suite', function()
{
  doNotReport();
  it('Does something', function()
  {
    var unused = "blah";
  });  
});


//Exclude an entire suite
describe('Include this suite', function()
{  
  it('This gets reported', function() { });  
  beforeEach('This gets reported', function() { });  
  before('This gets reported', function() { });  
  
  it('This does not', function() { doNotReport(); });  
  beforeEach('This does not', function() { doNotReport(); });  
  before('This does not', function() { doNotReport(); });  
  
  it('This does not', function() { doNotReport(this); });  
  beforeEach('This does not', function() { doNotReport(this); });  
  before('This does not', function() { doNotReport(this); });  
  
  before('Does report this', function() { });
  before('Does not report this', function() { doNotReport(); });
});

//Global hooks
before(function() { /* before hook code */ });
after(function() { /* after hook code */ });
beforeEach(function() { /* Before each hook */ });
afterEach(function() { /* Before each hook */ });


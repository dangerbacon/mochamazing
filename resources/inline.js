//Self-executing function
(function() {
  
  //Decompress block
  function decomp(arg_target)
  {
    var b = document.createElement("blockquote");
    b.innerHTML = LZString.decompressFromEncodedURIComponent(arg_target.textContent);
    arg_target.parentNode.insertBefore(b, arg_target);
    arg_target.parentNode.removeChild(arg_target);
  }

  //On click of ANY element, figure out if there's an event to be had here.      
  //We do this this way to save the effort of having to apply lots of bound functions to potentially thousands of test
  //elements.
  function clickUp(arg_target)
  {
    if (arg_target === document) return false;
    else if (arg_target.tagName === "H3")
    {
      var samp = arg_target.parentNode.querySelector('samp');
      if (samp) decomp(samp);
      arg_target.parentNode.classList.toggle("test_open");
      return true;
    }
    else if (arg_target.tagName === "H2")
    {
      if (document.body.classList.contains("table_of_contents"))
      {
        document.body.classList.remove("table_of_contents");
        window.scrollTo(0,arg_target.offsetTop - 4);
      }
      return true;
    }
    else if (arg_target.classList.contains('tocbutton'))
    {
      document.body.classList.toggle("table_of_contents");
      window.scrollTo(0,0);
      return true;
    }
    else if (arg_target.parentNode.classList && arg_target.parentNode.classList.contains('stats'))
    {
      arg_target
        .getAttributeNames()
        .filter(function(n) { return /^ma-/.test(n); })
        .forEach(function(n) { document.body.classList.toggle('hide-'+n); });
      return true;
    }
    else return clickUp(arg_target.parentNode);
  }

  //Single bind.  There can be thousands of tests;  we don't want to bind a click event on every one.
  window.addEventListener("click", function(e)
  {
    if (clickUp(e.target)) { e.preventDefault(); e.stopPropagation(); }
  });
})();

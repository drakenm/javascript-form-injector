/**
* @file Injects an HTML form element into the DOM
* @author Nick Drake
*/

// if jquery does not exist, link to it
if(!window.jQuery)
{
    var script = document.createElement('script');
    script.type = "text/javascript";
    // any cdn will work, google's hosted library is chosen in this instance
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
    ( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0] ).appendChild( script );
}

$(function() {
   console.log("jQuery is live!");
});
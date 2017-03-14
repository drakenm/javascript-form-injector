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
    // inject our form after we dynamically insert jquery library
    script.onload = injectForm;
    ( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0] ).appendChild( script );
} else {
    $(function() {
        injectForm();
    });
}

function injectForm(options) {
    // jquery to determine when the document is ready
    $(function() {
        var frmEl = document.createElement('form');
        frmEl.id = options.formID || "nested-form";
        frmEl.action = options.formAction || "";
        frmEl.method = "POST";
        // inject our form
        document.getElementById('injection-container').appendChild(frmEl);
    });
}
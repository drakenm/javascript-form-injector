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
        frmEl.class = options.formClass || "";
        frmEl.action = options.formAction || "";
        frmEl.method = "POST";
        var inputs = {};
        if ( options.inputCount && options.inputCount > 0 ) {
            for (var i = 0; i < inputCount; i++) {
                var inputs[i] = document.createElement('input');
                inputs[i].type = options.input1.type || "text";
            }
        }
        input1.type = options.inp1.type || "text";
        // inject our form
        document.getElementById('injection-container').appendChild(frmEl);
    });
}
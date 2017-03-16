/**
* @file Injects an HTML form element into the DOM
* @author Nick Drake
*/

function injectForm(options) {
    var frmEl = document.createElement('form');
    frmEl.id = options.formID || "nested-form";
    frmEl.class = options.formClass || "";
    frmEl.action = options.formAction || "";
    frmEl.method = options.formMethod || "POST";
    // inject our form
    document.getElementById('injection-container').appendChild(frmEl);
    var nstdFrm = document.getElementById('nested-form');
    
    var inputs = {};
    if ( options.inputCount && options.inputCount > 0 ) {
        for (var i = 0; i < inputCount; i++) {
            inputs[i] = document.createElement('input');
            inputs[i].type = options.input[i].inputType || "text";
            nstdFrm.appendChild(inputs[i]);
        }
    }
}

var myForm = {
    'formID' : 'nested-form',
    'formClass' : 'myFormClass',
    'formAction' : '',
    'formMethod' : 'POST',
    'inputCount' : '1',
    'input1' : {
        'inputType' : 'text',
        'inputPlaceholder' : 'Some Text Here...',
    }
}

// if jquery does not exist, link to it
if(!window.jQuery)
{
    var script = document.createElement('script');
    script.type = "text/javascript";
    // any cdn will work, google's hosted library is chosen in this instance
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
    // inject our form after we dynamically insert jquery library
    ( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0] ).appendChild( script );
} else {
    
}
// jquery to determine when the document is ready
$(function() {
    injectForm(myForm);
});
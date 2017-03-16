/**
* @file Injects an HTML form element into the DOM
* @author Nick Drake
*/

var onloadFlag = 0, injectedForm = '';
if ( document.addEventListener ) {
    document.addEventListener( "DOMContentLoaded", function() { onloadFlag=1; injectedForm = onloadFxn() }, false );
} else if (document.all && !window.opera){ //Crude test for IE
    //Define a "blank" external JavaScript tag
    document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');
    var contentloadtag=document.getElementById("contentloadtag");
    contentloadtag.onreadystatechange=function(){
        if (this.readyState=="complete") {
            onloadFlag = 1;
            injectedForm = onloadFxn();
        }
    }
} else if (/Safari/i.test(navigator.userAgent)) { //Test for Safari
    var _timer=setInterval(function(){
        if(/loaded|complete/.test(document.readyState)){
            clearInterval(_timer);
            onloadFlag = 1;
            injectedForm = onloadFxn();
        }}
    , 10)
}

// fallback for our onload script
window.onload = function() {
    setTimeout("if (!onloadFlag) injectedForm = onloadFxn()", 0);
}

// template form object needed to create and inject HTML form
var myForm = {
    formId : "myNested-form",
    formClass : "myFormClass",
    formAction : "",
    formMethod : "POST",
    input : {
        0 : {
                inputType : "text",
                inputName : "descr",
                inputPlaceholder : "Some text here..."
            },
        1 : {
                inputType : "text",
                inputName : "info",
                inputPlaceholder : "Some other text here..."
            },
        2 : {
                inputType : "submit",
                inputName : "sub",
                inputValue : "BUTTON"
            },
        },
}

// inject the form
function injectForm(options) {
    var frmEl = document.createElement("form");
    frmEl.id = options.formId || "nested-form";
    frmEl.className = options.formClass || "";
    frmEl.action = options.formAction || "";
    frmEl.method = options.formMethod || "POST";
    var inputs = {};
    for (var input in options.input) {
        inputs[input] = document.createElement("input");
        inputs[input].type = options.input[input].inputType || "text";
        inputs[input].name = options.input[input].inputName || "input" + input;
        inputs[input].placeholder = options.input[input].inputPlaceholder || "";
        inputs[input].value = options.input[input].inputValue || "";
        inputs[input].id = options.input[input].inputId || "";
        inputs[input].className = options.input[input].inputClass || "";
    }
    // inject our form
    document.getElementById("injection-container").appendChild(frmEl);
    return inputs;
}

// once form has been injected we can inject our input elements
function onloadFxn() {
    var inputFields = injectForm(myForm);
    var injForm = document.getElementById("injection-container").firstChild;
    for (var key in inputFields) {
        injForm.appendChild(inputFields[key]);
    }
    return injForm;
}
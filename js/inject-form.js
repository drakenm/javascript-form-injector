/**
* @file Injects an HTML form element into the DOM
* @author Nick Drake
*/

var _JFI_onloadFlag = 0, _JFI_injectedForm = document.createDocumentFragment();
// onload script
if ( document.addEventListener ) { // firefox & opera
    document.addEventListener( "DOMContentLoaded", function() { _JFI_onloadFlag=1; _JFI_injectedForm = _JFI_injectForm(_JFI_form) }, false );
} else if (document.all && !window.opera){ // crude test for internet explorer
    // define a "blank" external js tag
    document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');
    var contentloadtag=document.getElementById("contentloadtag");
    contentloadtag.onreadystatechange=function(){
        if (this.readyState=="complete") {
            _JFI_onloadFlag = 1;
            _JFI_injectedForm = _JFI_injectForm(_JFI_form);
        }
    }
} else if (/Safari/i.test(navigator.userAgent)) { // silly test for safari
    var _timer=setInterval(function(){
        if(/loaded|complete/.test(document.readyState)){
            clearInterval(_timer);
            _JFI_onloadFlag = 1;
            _JFI_injectedForm = _JFI_injectForm(_JFI_form);
        }}
    , 10)
}

// fallback for onload script
window.onload = function() {
    setTimeout("if (!_JFI_onloadFlag) _JFI_injectedForm = _JFI_injectForm(_JFI_form)", 0);
}

// template form object needed to create and inject html form
var _JFI_form = {
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

// inject an html form
/**
* @func 
* @name _JFI_injectForm
* @param {object} options - an object describing elements and attributes of an html form
* @returns {object} - Node object (html form element)
* @desc inject an html form element
*/
function _JFI_injectForm(options) {
    var frmEl = document.createElement("form"), injCon = document.getElementById("injection-container");
    frmEl.id = options.formId || "nested-form";
    frmEl.className = options.formClass || "";
    frmEl.action = options.formAction || "";
    frmEl.method = options.formMethod || "POST";
    var inputs = _JFI_parseInputOptions(options);
    // inject our form into the document fragment
    _JFI_injectedForm.appendChild(frmEl);
    // place input fields into form
    for (var key in inputs) {
        _JFI_injectedForm.getElementById(frmEl.id).appendChild(inputs[key]);
    }
    // replace the injection container with the form
    injCon.parentElement.replaceChild(_JFI_injectedForm, injCon);
    return _JFI_injectedForm;
}

/**
* @func 
* @name _JFI_parseInputOptions
* @param {object} options - an object describing elements and attributes of an html form
* @returns {array} of input elements
* @desc iterate through options object and build input dom elements
*/
function _JFI_parseInputOptions(options) {
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
    return inputs;
}

// old code
// once form has been injected we can inject our input elements
//function onloadFxn() {
//    var inputFields = _JFI_injectForm(_JFI_form);
//    var injForm = document.getElementById("injection-container").firstChild;
//    for (var key in inputFields) {
//        injForm.appendChild(inputFields[key]);
//    }
//    unwrap(injForm);
//    return injForm;
//}

// unwrap the injected form from the injection-container - places/moves the given element before its parent in the dom then removes container
//function unwrap(elem) {
//    var frag = document.createDocumentFragment();
//    var pa = elem.parentElement; // injection container
//    while (pa.firstChild) {
//        frag.appendChild(pa.firstChild);
//    }
//    pa.parentElement.replaceChild(frag, pa);
//}
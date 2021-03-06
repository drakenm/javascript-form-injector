/**
* @file Injects an HTML form element into the DOM
* @author Nick Drake
*/

// _JFI IIFE Closure
(function( _JFI, document, undefined) {
  "use strict";

  _JFI.onloadFlag = 0; // used to verify dom readiness in onload scripts
  _JFI.injectedForm = document.createDocumentFragment(); // will hold the form that is injected into the dom

  // template form object - at this time any added properties will necessitate the addition of property/attribute assignment in the injectForm and parseInputOptions fxns below
  _JFI.formObj = {
    formId : "JFI-form",
    formClass : "JFI-form",
    formName  : "JFI-form",
    formAction : "",
    formMethod : "",
    input : {
      0 : {
        inputType : "",
        inputId   : "",
        inputName : "",
        inputValue: ""
      },
      1 : {
        inputType : "",
        inputId   : "",
        inputName : "",
        inputValue: ""
      },
      2 : {
        inputType : "submit",
        inputId   : "JFI-form-button",
        inputClass  : "JFI-form-button",
        inputValue  : "Submit"
      },
    },
  };

  /**
  * @func 
  * @name injectForm
  * @param {object} options - an object describing elements and attributes of an html form
  * @returns {object} - Node object (html form element)
  * @desc public method: inject an html form element into the dom by replacing a known dom element
  */
  _JFI.injectForm = function(options) {
    var frmEl = document.createElement("form"), injCon = document.getElementById("JFI-injection-container");
    frmEl.id = options.formId || "injected-form";
    frmEl.idSel = '#' + frmEl.id;
    frmEl.className = options.formClass || "injected-form";
    frmEl.classNameSel = '.' + frmEl.className;
    frmEl.name = options.formName || "injected-form";
    frmEl.action = options.formAction || "";
    frmEl.method = options.formMethod || "GET";
    var inputs = parseInputOptions(options);
    _JFI.injectedForm.appendChild(frmEl);
    // place input fields into form
    for (var key in inputs) {
      _JFI.injectedForm.querySelector(frmEl.idSel).appendChild(inputs[key]);
    }
    injCon.parentElement.replaceChild(_JFI.injectedForm, injCon);
    return _JFI.injectedForm;
  };

  /**
  * @func 
  * @name parseInputOptions
  * @param {object} options - an object describing elements and attributes of an html form
  * @returns {array} node objects (html input elements)
  * @desc private method: iterate through options object and build input dom elements
  */
  function parseInputOptions(options) {
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
}( window._JFI = window._JFI || {}, document ));



// onload script and fallback
if ( document.addEventListener ) { // firefox & opera
  document.addEventListener( "DOMContentLoaded", function() { _JFI.onloadFlag=1; _JFI.injectedForm = _JFI.injectForm(_JFI.formObj) }, false );
} else if (document.all && !window.opera){ // crude test for internet explorer
  // define a "blank" external js tag
  document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');
  var contentloadtag=document.getElementById("contentloadtag");
  contentloadtag.onreadystatechange=function(){
    if (this.readyState=="complete") {
      _JFI.onloadFlag = 1;
      _JFI.injectedForm = _JFI.injectForm(_JFI.formObj);
    }
  }
} else if (/Safari/i.test(navigator.userAgent)) { // silly test for safari
  var _timer=setInterval(function(){
    if(/loaded|complete/.test(document.readyState)){
      clearInterval(_timer);
      _JFI.onloadFlag = 1;
      _JFI.injectedForm = _JFI.injectForm(_JFI.formObj);
    }
  }
  , 10)
}

// fallback for onload script
window.onload = function() {
  setTimeout("if (!_JFI.onloadFlag) _JFI.injectedForm = _JFI.injectForm(_JFI.formObj)", 0);
}
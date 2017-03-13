# jquery-form-injector
Simple form injection using jQuery and JavaScript

A Form within a Form... Within another Form:
Initially designed for Microsoft SharePoint ASP.NET pages to circumvent[hack] the W3C HTML5 'form element' Spec which explicitly states the HTML form element content model may contain "[f]low content, but with no form element descendants." - https://www.w3.org/TR/html5/forms.html#the-form-element

The fundamental idea is based on using HTML's simple and effective form element POST request & redirect from a secured origin domain (i.e. a company intranet; more and more commonly implemented using SharePoint) to a destination domain, assuming through a TLS connection

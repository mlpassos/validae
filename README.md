# Validae

Validae is a small Code Igniter Web Application that scans for all the pages in a website and validates then all / per page.

It uses html_simple_dom library to fetch all the links in a website and then shows validations options for the links on the 
same domain.

Validae is being developed to validate my own sites, but if you feel you want to contribute, be my guest and make a pull request.

** FIRST THING TO DO IS CACHE ALL AJAX CALLS DUE TO API ABUSE ** 

- increase time between requests?
- use promises for requests
- anything else

Current features:

- Scans for all pages in the website domain 
- Show all pages with individual options for validation
- Show Messages about each page individually
- Show Messages for all (validate all)

The validate all funcionality is being developed (TO DO):

- Smartjax jQuery Plugin tried with no success
- ajax cache to be implemented via jquery $.ajax cache

- Turn all validation ajax calls into an ajax deferred object for chaining.
- Offer a way to validate all pages in a unique ajax request.

That's all folks.

Cheers from Brazil!
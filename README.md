angularify [![Build Status](https://travis-ci.org/angularifyjs/angularify.svg?branch=master)](https://travis-ci.org/angularifyjs/angularify) [![Coverage Status](https://img.shields.io/coveralls/angularifyjs/angularify.svg)](https://coveralls.io/r/angularifyjs/angularify?branch=master)
===============

Best practices for bootstrapping scalable AngularJS app. 

# Features

- Use `angular.module` dependency injection to load physical dependency files based on configuration in `angularify.json`.
- Optimize development process which expected to be better than `ng-boilerplate`.
- Separate CSS for each module.
- Support build system which automatically combine, optimize import, minify all assets including html, css, javascript, images.

# Concept

- Step 1: create your angular module which has html template, css, javascript.
- Step 2: define your module in `angularify.json` -> key `dependencies`.
- Step 3: add main angular module into your main `index.html` with this following tag `<!-- angularify:app:css -->` & `<!-- angularify:app:js -->`.
- Step 4: run your app and enjoy. `angularify` will resolve all physical dependencies for you. 

# How to use

Checkout more examples in `dev` directory. 

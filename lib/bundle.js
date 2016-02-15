/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var COOKBOOK =  "<div class='main-img-container'>" +
	                  "<!-- IMAGE PLACEHOLDER -->" +
	                  "<img class='macbook' src='lib/images/macbook-pro.png' alt='' />" +
	                  "<div class='img-placeholder'></div>" +
	                "</div>" +
	                "<p>" +
	                  "Cookbook is an app for delicious recipes inspired by cooking.nytimes.com." +
	                  "<ul>" +
	                    "Features:" +
	                    "<li>Encourages users to sign up and save recipes to their accounts.</li>" +
	                    "<li>Implements continuously updated search queries to return results in real time.</li>" +
	                    "<li>Protects user privacy through private note options and anonymous metadata.</li>" +
	                    "<li>Dynamically displays header content to update as the user scrolls.</li>" +
	                  "</ul>" +
	                "</p>" +
	                "<div class='project-links'>" +
	                  "<a target='_blank' href='http://www.thymes-cookbook.com'>Live</a>" +
	                  "<a target='_blank' href='https://github.com/wmcmeans/cookbook'>GitHub</a>" +
	                "</div>";
	
	var SPOTS =  "<div class='main-img-container'>" +
	                "<!-- IMAGE PLACEHOLDER -->" +
	                "<img class='macbook' src='lib/images/macbook-pro.png' alt='' />" +
	                "<div class='img-placeholder'></div>" +
	              "</div>" +
	              "<p>" +
	                "Spots is a connect-the-dot browser game based on the popular mobile app." +
	                "<ul>" +
	                  "Features:" +
	                  "<li>Responds to user interaction using jQuery and CSS hoverstates.</li>" +
	                  "<li>Calculates node entry/exit points with custom algorithms to create desired interactions.</li>" +
	                  "<li>Changes game state behind the scenes with JavaScript to update visual representation.</li>" +
	                "</ul>" +
	              "</p>" +
	              "<div class='project-links'>" +
	                "<a target='_blank' href='spots/game.html'>Live</a>" +
	                "<a target='_blank' href='https://github.com/wmcmeans/spots'>GitHub</a>" +
	              "</div>";
	
	var RAILSLITE =  "<div class='main-img-container'>" +
	                    "<!-- IMAGE PLACEHOLDER -->" +
	                    "<img class='macbook' src='lib/images/macbook-pro.png' alt='' />" +
	                    "<div class='img-placeholder'></div>" +
	                  "</div>" +
	                  "<p>" +
	                    "Rails Lite is a web framework based inspired by Ruby on Rails." +
	                    "<ul>" +
	                      "Features:" +
	                      "<li>Routes requests to the appropriate controllers using the Rake router.</li>" +
	                      "<li>Executes actions and renders content through controller methods.</li>" +
	                    "</ul>" +
	                  "</p>" +
	                  "<div class='project-links'>" +
	                    "<a target='_blank' href='https://github.com/wmcmeans/rails-lite'>GitHub</a>" +
	                  "</div>";
	
	$(function () {
	  $('a.profile-link').click(toggleProfileView);
	  $('div.overlay').click(toggleProjectView);
	
	  $('li.project-link').click(function (e) {
	    var html;
	    switch (e.target.innerHtml) {
	      case "Cookbook":
	        html = COOKBOOK;
	        break;
	      case "Spots":
	        html = SPOTS;
	        break;
	      case "Rails Lite":
	        html = RAILSLITE;
	        break;
	    }
	
	    $('article.project-description').hide().html(html).fadeIn(500);
	
	  });
	
	  function toggleProfileView(e) {
	    e.preventDefault();
	
	    $('div.overlay').removeClass('inactive');
	    $('section.profile').removeClass('inactive');
	
	    $('main').animate({
	      left: '-65%'
	    }, 1000, "linear", function (e) {
	      $('section.projects').addClass('inactive');
	    });
	  }
	
	  function toggleProjectView(e) {
	    e.preventDefault();
	    $("html, body").animate({
	        scrollTop: 0
	    }, 600, shiftLeft);
	
	    function shiftLeft() {
	      $('section.projects').removeClass('inactive');
	
	      $('main').animate({
	        left: '0'
	      }, 1000, "linear", function (e) {
	        $('div.overlay').addClass('inactive');
	        $('section.profile').addClass('inactive');
	      });
	    }
	  }
	});


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
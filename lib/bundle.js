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

	var COOKBOOK = {
	  img: "",
	  description: "Cookbook is an app for discovering, searching, and saving delicious recipes, inspired by cooking.nytimes.com.",
	  features: [
	    "Recipe box encourages users to sign up and save recipes to their accounts.",
	    "Dynamic search continuously updates queries to return results in real time.",
	    "Protects user privacy through private note options and anonymous metadata.",
	    "Dynamically displays header content to update as the user scrolls."
	  ],
	  links: {
	    Live: "http://www.thymes-cookbook.com",
	    GitHub: "https://github.com/wmcmeans/cookbook"
	  }
	};
	
	var SPOTS = {
	  img: "",
	  description: "Spots is a connect-the-dot browser game based on the popular mobile app.",
	  features: [
	    "Responds to user interaction using jQuery and CSS hoverstates.",
	    "Calculates node entry/exit points with custom algorithms to create desired interactions.",
	    "Changes game state behind the scenes with JavaScript to update visual representation."
	  ],
	  links: {
	    Live: "spots/game.html",
	    GitHub: "https://github.com/wmcmeans/spots"
	  }
	};
	
	var RAILSLITE = {
	  img: "",
	  description: "Rails Lite is a web framework based inspired by Ruby on Rails.",
	  features: [
	    "Routes requests to the appropriate controllers using the Rake router.",
	    "Executes actions and renders content through controller methods."
	  ],
	  links: {
	    GitHub: "https://github.com/wmcmeans/rails-lite"
	  }
	};
	
	
	function createProjectHTML(projectName) {
	  var project;
	  switch (projectName) {
	    case "Cookbook":
	      project = COOKBOOK;
	      break;
	    case "Spots":
	      project = SPOTS;
	      break;
	    case "Rails Lite":
	      project = RAILSLITE;
	      break;
	    }
	  var html =  "<div class='main-img-container'>" +
	                "<!-- IMAGE PLACEHOLDER -->" +
	                "<img class='macbook' src='lib/images/macbook-retina.png' alt='' />" +
	                "<div class='img-placeholder'></div>" +
	              "</div>" +
	              "<section class='project-description'>" +
	                project.description +
	                "<ul>" +
	                  "Features:";
	      project.features.forEach(function (feature) {
	        html += "<li>" + feature + "</li>";
	      });
	      html +=   "</ul>" +
	              "<div class='project-links'>";
	      for (var key in project.links) {
	        html += "<a target='_blank' href='" + project.links[key] + "'>" + key + "</a>";
	      }
	      html += "</div>" +
	      "</section>";
	
	  return html;
	}
	
	$(function () {
	  $('a.profile-link').click(toggleProfileView);
	  $('div.overlay').click(toggleProjectView);
	
	  var html = createProjectHTML("Cookbook");
	  $('article.project-details').html(html);
	
	  $('li.project-link').click(function (e) {
	    $('li.project-link').removeClass('active');
	    $(e.target).addClass('active');
	
	    var html = createProjectHTML(e.target.innerHTML);
	
	    $('article.project-details').hide().html(html).fadeIn(500);
	  });
	
	  function toggleProfileView(e) {
	    e.preventDefault();
	
	    $('div.overlay').removeClass('inactive');
	    $('section.profile').removeClass('inactive');
	
	    $('main').animate({
	      left: '-65%'
	    }, 1000, "linear", function (e) {
	      $('section.projects').addClass('inactive');
	      $('div.resume-link-container').addClass('sticky');
	    });
	  }
	
	  function toggleProjectView(e) {
	    e.preventDefault();
	    $("html, body").animate({
	        scrollTop: 0
	    }, 600, shiftLeft);
	
	    function shiftLeft() {
	      $('div.resume-link-container').removeClass('sticky');
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
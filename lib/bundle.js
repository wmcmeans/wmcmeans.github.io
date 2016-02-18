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
	  img: "cookbook-screenshot-resized.jpg",
	  description: "Cookbook is an app for discovering, searching, and saving delicious recipes inspired by cooking.nytimes.com. It was built using Ruby on Rails and React/Flux.",
	  // features: [
	  //   "Recipe box encourages users to sign up and save recipes to their accounts.",
	  //   "Dynamic search continuously updates queries to return results in real time.",
	  //   "Protects user privacy through private note options and anonymous metadata.",
	  //   "Dynamically displays header content to update as the user scrolls."
	  // ],
	  links: {
	    Live: "http://www.thymes-cookbook.com",
	    GitHub: "https://github.com/wmcmeans/cookbook"
	  }
	};
	
	var SPOTS = {
	  img: "spots-screenshot.jpg",
	  description: "Spots is a connect-the-dot browser game based on the popular mobile app. It uses jQuery listeners and CSS hoverstates to respond to user interaction and manipulate game state.",
	  // features: [
	  //   "Responds to user interaction using jQuery and CSS hoverstates.",
	  //   "Calculates node entry/exit points with custom algorithms to create desired interactions.",
	  //   "Changes game state behind the scenes with JavaScript to update visual representation."
	  // ],
	  links: {
	    Live: "spots/game.html",
	    GitHub: "https://github.com/wmcmeans/spots"
	  }
	};
	
	var TRAILS = {
	  img: "trails-screenshot.jpg",
	  description: "Ruby on Trails is a MVC framework with a custom ORM system (Dynamic Archive) inspired by Ruby on Rails and Active Record. You're hiking Ruby on Trails!",
	  // features: [
	  //   "Routes requests to the appropriate controllers using the Rake router.",
	  //   "Executes actions and renders content through controller methods."
	  // ],
	  links: {
	    GitHub: "https://github.com/wmcmeans/trails"
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
	    case "Trails":
	      project = TRAILS;
	      break;
	    }
	  var html =  "<div class='main-img-container'>" +
	                "<!-- IMAGE PLACEHOLDER -->" +
	                "<img class='macbook' src='lib/images/macbook-retina.png' alt='' />" +
	                "<div class='screenshot-outer-container'>" +
	                  "<div class='screenshot-inner-container'>" +
	                    "<img class='project-screenshot' src='lib/images/" + project.img + "' />" +
	                  "</div>" +
	                "</div>" +
	              "</div>" +
	              "<section class='project-description'>" +
	                "<p>" + project.description + "</p>" +
	      //           "<ul>";
	      // project.features.forEach(function (feature) {
	      //   html += "<li>" + feature + "</li>";
	      // });
	      // html +=   "</ul>" +
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
	
	  switchProjectView('');
	  $('li.project-link').click(switchProjectView);
	
	  function switchProjectView(e) {
	    if (e.target == $('li.project-link.active')[0]) {
	      return;
	    }
	
	    var target = e.target || $('li.project-link.cookbook')[0];
	    clearTimeout(this.animateSS);
	
	    $('li.project-link').removeClass('active');
	    $(target).addClass('active');
	
	    var html = createProjectHTML(target.innerHTML);
	
	    $('img.project-screenshot').css('bottom', 0);
	    $('article.project-details').hide().html(html).fadeIn(500);
	
	    this.animateSS = setTimeout(animateScreenshot, 1500);
	  }
	});
	
	
	function toggleProfileView(e) {
	  e.preventDefault();
	
	  $('div.overlay').removeClass('inactive');
	  $('section.profile').removeClass('inactive');
	
	  $('main').animate({ left: '-65%'}, {
	    duration: 1000,
	    specialEasing: {
	      left: "easeInOutQuad"
	    },
	    always: function (e) {
	      $('section.projects').addClass('inactive');
	      $('div.resume-link-container').addClass('sticky');
	    }
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
	
	    $('main').animate({ left: 0 }, {
	      duration: 1000,
	      specialEasing: {
	        left: "easeInOutQuad"
	      },
	      always: function (e) {
	        $('div.overlay').addClass('inactive');
	        $('section.profile').addClass('inactive');
	      }
	    });
	  }
	}
	
	function animateScreenshot() {
	  var screenshot = $('img.project-screenshot');
	  var containerHeight = $('div.screenshot-inner-container').height();
	  var ssHeight = screenshot.height();
	  screenshot.animate({ top: "-" + (ssHeight - containerHeight) }, {
	    duration: 1500,
	    specialEasing: {
	      bottom: "easeInOutQuad"
	    }, complete: function () {
	      screenshot.css({"bottom": 0, "top": ""});
	    }
	  });
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
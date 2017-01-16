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
/******/ 	__webpack_require__.p = "/lib/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var queryEl = function queryEl(selector) {
	  return document.querySelector(selector);
	};
	var queryElAll = function queryElAll(selector) {
	  return document.querySelectorAll(selector);
	};
	var ACTIVE = 'active';
	var INACTIVE = 'inactive';
	var STICKY = 'sticky';
	var VISIBLE = 'visible';
	var ANIMATION_COMPLETE = 'animation-complete';
	
	var COOKBOOK = {
	  img: 'cookbook-screenshot-resized.jpg',
	  description: 'Cookbook is an app for discovering, searching, and saving delicious recipes inspired by cooking.nytimes.com. It was built using Ruby on Rails and React/Flux.',
	  links: {
	    Live: 'http://www.thymes-cookbook.com',
	    GitHub: 'https://github.com/wmcmeans/cookbook'
	  }
	};
	
	var SPOTS = {
	  img: 'spots-screenshot.jpg',
	  description: 'Spots is a connect-the-dot browser game based on the popular mobile app. It uses jQuery listeners and CSS hoverstates to respond to user interaction and manipulate game state.',
	  links: {
	    Live: 'spots/game.html',
	    GitHub: 'https://github.com/wmcmeans/spots'
	  }
	};
	
	var TRAILS = {
	  img: 'trails-screenshot.jpg',
	  description: 'Ruby on Trails is a MVC framework with a custom ORM system (Dynamic Archive) inspired by Ruby on Rails and Active Record. You\'re hiking Ruby on Trails!',
	  links: {
	    Live: 'http://www.ruby-on-trails.com/',
	    GitHub: 'https://github.com/wmcmeans/trails',
	    RubyGems: 'https://rubygems.org/gems/trails-mvc'
	  }
	};
	
	function createProjectHTML(projectName) {
	  var project = void 0;
	  switch (projectName) {
	    case 'Spots':
	      project = SPOTS;
	      break;
	    case 'Trails':
	      project = TRAILS;
	      break;
	    case 'Cookbook':
	    default:
	      project = COOKBOOK;
	      break;
	  }
	  var html = '<div class="main-img-container">\n                  <!-- IMAGE PLACEHOLDER -->\n                  <img class="macbook" src="dist/images/macbook-retina.png" alt="" />\n                  <div class="screenshot-outer-container">\n                    <div class="screenshot-inner-container">\n                      <img class="project-screenshot" src="dist/images/' + project.img + '" />\n                    </div>\n                  </div>\n                </div>\n                <section class="project-description">\n                  <p>' + project.description + '</p>\n                  <div class="external-project-links">\n                  ' + Object.entries(project.links).map(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        name = _ref2[0],
	        link = _ref2[1];
	
	    return '<a target="_blank" href="' + link + '">' + name + '</a>';
	  }).join('\n') + '\n                  </div>\n                </section>';
	  return html;
	}
	
	// TODO: Remove jQuery
	function animateScreenshot() {
	  var screenshot = queryEl('.project-screenshot');
	  screenshot.classList.remove(ANIMATION_COMPLETE);
	
	  var containerHeight = queryEl('.screenshot-inner-container').offsetHeight;
	
	  var _screenshot$getBoundi = screenshot.getBoundingClientRect(),
	      ssHeight = _screenshot$getBoundi.height;
	
	  var top = -(ssHeight - containerHeight) + 'px';
	
	  var duration = 1500;
	  screenshot.animate([{ top: 0, easing: 'ease-in' }, { top: top, easing: 'ease-out' }], duration);
	
	  setTimeout(function () {
	    return screenshot.classList.add(ANIMATION_COMPLETE);
	  }, duration);
	}
	
	function toggleProfileView(event) {
	  event.preventDefault();
	
	  queryEl('.overlay').classList.remove(INACTIVE);
	  queryEl('.profile').classList.remove(INACTIVE);
	  queryEl('main').classList.add(INACTIVE);
	
	  setTimeout(function () {
	    queryEl('.projects').classList.add(INACTIVE);
	    queryEl('.resume-link-container').classList.add(STICKY);
	  }, 1000);
	}
	
	function toggleProjectView(event) {
	  event.preventDefault();
	
	  queryEl('.resume-link-container').classList.remove(STICKY);
	  queryEl('.projects').classList.remove(INACTIVE);
	  queryEl('main').classList.remove(INACTIVE);
	  queryEl('body').scrollTop = 0;
	
	  setTimeout(function () {
	    queryEl('.overlay').classList.add(INACTIVE);
	    queryEl('.profile').classList.add(INACTIVE);
	  }, 1000);
	
	  // $('html, body').animate({
	  //   scrollTop: 0,
	  // }, 600, shiftLeft);
	}
	
	document.addEventListener('DOMContentLoaded', function () {
	  function switchProjectView(event) {
	    if (event.target === queryEl('.project-link.active')) return;
	
	    var target = event.target || queryEl('.project-link.cookbook');
	    window.clearTimeout(window.animateSS);
	
	    var projectLinks = queryElAll('.project-link');
	    projectLinks.forEach(function (el) {
	      return el.classList.remove(ACTIVE);
	    });
	    target.classList.add(ACTIVE);
	
	    var projectHtml = createProjectHTML(target.innerHTML);
	
	    var projectDetails = queryEl('.project-details');
	    projectDetails.classList.remove(VISIBLE);
	    window.setTimeout(function () {
	      projectDetails.innerHTML = projectHtml;
	      projectDetails.classList.add(VISIBLE);
	    }, 200);
	
	    window.animateSS = window.setTimeout(animateScreenshot, 2600);
	  }
	
	  queryEl('.profile-link').addEventListener('click', toggleProfileView);
	  queryEl('.overlay').addEventListener('click', toggleProjectView);
	
	  switchProjectView('');
	  queryElAll('.project-link').forEach(function (el) {
	    return el.addEventListener('click', switchProjectView);
	  });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
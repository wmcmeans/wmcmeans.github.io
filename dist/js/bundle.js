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
/******/ 	__webpack_require__.p = "/dist/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
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
	
	var main = void 0;
	var profileSection = void 0;
	var profileInner = void 0;
	var projectSection = void 0;
	var overlay = void 0;
	var projectLinks = void 0;
	var projectScreenshots = void 0;
	var projectDescriptions = void 0;
	var resumeLinkContainer = void 0;
	
	var screenshotAnimationTimer = void 0;
	var animationCompletionTimer = void 0;
	
	function animateScreenshot() {
	  if (animationCompletionTimer) {
	    window.clearTimeout(animationCompletionTimer);
	  }
	
	  var screenshot = queryEl('.project-screenshot.active');
	
	  var containerHeight = queryEl('.screenshot-inner-container').offsetHeight;
	
	  var _screenshot$getBoundi = screenshot.getBoundingClientRect(),
	      ssHeight = _screenshot$getBoundi.height;
	
	  var top = -(ssHeight - containerHeight) + 'px';
	
	  var duration = 1500;
	  screenshot.animate([{ top: 0, easing: 'ease-in' }, { top: top, easing: 'ease-out' }], duration);
	
	  animationCompletionTimer = window.setTimeout(function () {
	    return screenshot.classList.add(ANIMATION_COMPLETE);
	  }, duration);
	}
	
	function toggleProject(project) {
	  if (screenshotAnimationTimer) {
	    window.clearTimeout(screenshotAnimationTimer);
	  }
	
	  var newActiveProjectScreenshot = queryEl('#' + project + '-screenshot');
	  var newActiveProjectDescription = queryEl('#' + project + '-description');
	
	  projectScreenshots.forEach(function (el) {
	    el.classList.remove(ACTIVE);
	    el.classList.remove(ANIMATION_COMPLETE);
	    el.removeAttribute('style');
	  });
	  projectDescriptions.forEach(function (el) {
	    return el.classList.remove(ACTIVE);
	  });
	
	  newActiveProjectScreenshot.classList.add(ACTIVE);
	  newActiveProjectDescription.classList.add(ACTIVE);
	
	  screenshotAnimationTimer = window.setTimeout(animateScreenshot, 2600);
	}
	
	function toggleOverlay() {
	  var fadeIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	  if (fadeIn) {
	    overlay.classList.add(VISIBLE);
	    setTimeout(function () {
	      return overlay.classList.remove(INACTIVE);
	    }, 0);
	  } else {
	    overlay.classList.add(INACTIVE);
	    setTimeout(function () {
	      return overlay.classList.remove(VISIBLE);
	    }, 300);
	  }
	}
	
	function toggleProfileView(event) {
	  event.preventDefault();
	
	  toggleOverlay();
	  profileSection.classList.remove(INACTIVE);
	  main.classList.add(INACTIVE);
	
	  setTimeout(function () {
	    projectSection.classList.add(INACTIVE);
	    resumeLinkContainer.classList.add(STICKY);
	  }, 1000);
	}
	
	function toggleProjectView(event) {
	  event.preventDefault();
	
	  resumeLinkContainer.classList.remove(STICKY);
	  projectSection.classList.remove(INACTIVE);
	  main.classList.remove(INACTIVE);
	  toggleOverlay(false);
	
	  setTimeout(function () {
	    profileInner.scrollTop = 0;
	    profileSection.classList.add(INACTIVE);
	  }, 1000);
	}
	
	document.addEventListener('DOMContentLoaded', function () {
	  function switchProjectView(event) {
	    event.preventDefault();
	    var target = event.target;
	
	    var projectDetails = queryEl('.project-details');
	
	    if (target === queryEl('.project-link.active')) return;
	    projectDetails.classList.remove(VISIBLE);
	
	    projectLinks.forEach(function (el) {
	      return el.classList.remove(ACTIVE);
	    });
	    target.classList.add(ACTIVE);
	
	    window.setTimeout(function () {
	      toggleProject(target.id.split('-')[0]);
	      projectDetails.classList.add(VISIBLE);
	    }, 200);
	  }
	
	  main = queryEl('main');
	  profileSection = queryEl('.profile');
	  profileInner = queryEl('.profile-inner');
	  projectSection = queryEl('.projects');
	  overlay = queryEl('.overlay');
	  projectLinks = queryElAll('.project-link');
	  projectScreenshots = queryElAll('.project-screenshot');
	  projectDescriptions = queryElAll('.project-description');
	  resumeLinkContainer = queryEl('.resume-link-container');
	
	  queryEl('.profile-link').addEventListener('click', toggleProfileView);
	  overlay.addEventListener('click', toggleProjectView);
	
	  projectLinks.forEach(function (el) {
	    return el.addEventListener('click', switchProjectView);
	  });
	  screenshotAnimationTimer = window.setTimeout(animateScreenshot, 2600);
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
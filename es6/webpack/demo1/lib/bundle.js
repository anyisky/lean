/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _contentDefault = __webpack_require__(1);

	var _contentDefault2 = _interopRequireDefault(_contentDefault);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.getElementById('firstname').value = _contentDefault2.default.firstName; /*import {firstName, lastName, year, multiply} from './content.js';
	                                                                                 
	                                                                                 console.log(firstName); //Michael
	                                                                                 setTimeout(() => console.log(firstName),500); // Winchester
	                                                                                 
	                                                                                 document.getElementById('firstname').value = firstName;
	                                                                                 document.getElementById('lastname').value = lastName;
	                                                                                 document.getElementById('year').value = year;
	                                                                                 
	                                                                                 document.getElementById('multiply').innerHTML = multiply(6,7);
	                                                                                 
	                                                                                 //用来体现500毫秒的动态取值
	                                                                                 $('#btnAgain').click(function(){
	                                                                                 	$('#again').text(firstName);
	                                                                                 });*/

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var firstName = 'Michael';
	var lastName = 'Jackson';
	var year = 1958;

	function multiply(x, y) {
		return x * y;
	}

	exports.default = { firstName: firstName, lastName: lastName }; //这样相当于把两个属性当成对象抛出去了，能正常取到

/***/ }
/******/ ]);
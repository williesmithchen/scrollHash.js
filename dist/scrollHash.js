/*
scrollHash.js
2015.4.8

Design:Willie.Smith.Chen

The MIT License (MIT)
Copyright (c) 2015 williesmithchen
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
"use strict";
(function(){

	window.wsc = (function() {

		//self
		var self = this,
		options = {
			autorun: false //1.set AutoRun(boolean) to Exe scrollHash.js
		};

		//getAutoRun
		function getOption(opt){
			return options[opt];
		}
		//isWin || isWindow
		function isWin( obj ) {
			return obj != null && obj === obj.window;
		}
		//isStr || isString
		function isStr( obj ) {
			return !!typeof obj === "string";
		}
		//isNum || isNumber
		function isNum( obj ) {
			return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
		}
		//isBool || isBoolean
		function isBool( obj ) {
			return !!typeof obj === "boolean";
		}
		//isFun || isFunction
		function isFun( obj ) {
			return typeof obj === "function";
		}
		//isObj || isObject
		function isObj( obj ) {
			// 如果是非物件或特殊物件(Dom節點、window) 則視為被污染的物件
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || self.isWindow( obj ) ) {
				return false;
			}
			//如果物件子物件不乾淨或不等於"[object Object]" 則視為被污染的物件
			if ( obj.constructor && !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
			//除此之外的 我們都能先假設它是乾淨物件
			return true;
		}

		return {
			getOption: function(opt){
				return getOption(opt);
			},
			isWin: function(obj) {
				return isWin(obj);
			},
			isWindow: function(obj){
				return isWin(obj);
			},
			isStr: function(obj) {
				return isStr(obj);
			},
			isString: function(obj){
				return isStr(obj);
			},
			isNum: function(obj) {
				return isNum(obj);
			},
			isNumber: function(obj){
				return isNum(obj);
			},
			isBool: function(obj) {
				return isBool(obj);
			},
			isBoolean: function(obj){
				return isBool(obj);
			},
			isFun: function(obj) {
				return isFun(obj);
			},
			isFunction: function(obj){
				return isFun(obj);
			},
			isObj: function(obj) {
				return isObj(obj);
			},
			isObject: function(obj){
				return isObj(obj);
			}
		};

	})();

	//[Public]scrollHash
	wsc.scrollHash = function(_opt) {

		//var
		var self = this,
		_window = window,
		_document = document,
		currentHash = null,
		e_scrollHash = null,
		e_scrollHashArr = {},
		opt = _opt || {
			"scrollHash": true,
			"clickHash": true,
			"SHclassName": "scrollHash",
			"range": 50
		};

		//init
		self.init = function() {

			if (window.addEventListener) {

				window.addEventListener("pageshow", self.windowpageshow, false);

			} else if (window.attachEvent) {

				window.attachEvent("onpageshow", self.windowpageshow);

   			} else {

   				window["pageshow"] = self.windowpageshow;

   			}

		};

		//window pageshow
		self.windowpageshow = function() {

			e_scrollHash = document.getElementsByClassName(opt.SHclassName);

			if(e_scrollHash.length !== 0 && !!opt.scrollHash) {

				for(var i = 0; i < e_scrollHash.length; i++){

					e_scrollHashArr[i] = {"top": e_scrollHash[i].offsetTop, "id": e_scrollHash[i].id};

		   			//clickHash
					if(!!opt.clickHash) {

						if (e_scrollHash[i].addEventListener) {

							e_scrollHash[i].addEventListener("click", self.clickHash, false);

						} else if (e_scrollHash[i].attachEvent) {

							e_scrollHash[i].attachEvent("onclick", self.clickHash);

			   			} else {

							e_scrollHash[i]["click"] = self.clickHash;

			   			}

		   			}

				}

				//scrollHash
				if(!!opt.scrollHash) {

					if (window.addEventListener) {

						window.addEventListener("scroll", self.windowScrollHash, false);

					} else if (window.attachEvent) {

						window.attachEvent("onscroll", self.windowScrollHash);

		   			} else {

						window["scroll"] = self.windowScrollHash;

		   			}

	   			}

   			}

		};

		//self.clickHash
		self.clickHash = function() {

			window.scrollTo(window.pageXOffset, this.offsetTop);
			window.location.hash = this.id;

		};

		//window scroll
		self.windowScrollHash = function() {

			var win_top = window.pageYOffset;

			for(var obj in e_scrollHashArr) {

				var distance = win_top - e_scrollHashArr[obj].top;

				if (distance < opt.range && distance > -opt.range && opt.currentHash !== e_scrollHashArr[obj].id) {

					window.location.hash = e_scrollHashArr[obj].id;
					opt.currentHash = e_scrollHashArr[obj].id;

				}
			}

		};

		//Exe init
		self.init();

	};

	//autoRun
	try{
		if(wsc.getOption("autorun")){
			wsc.scrollHash();
		}
	}catch(err){
		if(!!console){
			console.log(err);
			console.log("Auto Exe wsc.scrollHash Failed.");
		}
	}


})();

//2.Or you can use jQuery.
$(function(){

	wsc.scrollHash();

	/*wsc.scrollHash({
		scrollHash: true,
		clickHash: true,
		SHclassName: "scrollHash",
		range: 50
	});*/

})

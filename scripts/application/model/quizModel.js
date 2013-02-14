(function() {
	"use strict";
	/* jslint nomen: true */
	/* global Backbone,_,$,define */
	define([ 'jQuery', 'underscore', 'backbone', 'localStore' ],
	/**
	 * @author harik
	 * @module Model
	 */
	function($, _, Backbone, LocalStorage) {
		var exports = {};
		/**
		 * @constructor
		 * @requires $
		 * @requires _
		 * @requires Backbone
		 * @augments module:Backbone.Model
		 */
		exports.ConfigModel = Backbone.Model.extend({
			url : function() {
				var path = location.pathname.split("/");
				if (path && path.length > 0) {
					path.pop(path.length - 1);
					path.push("model/model.json");
				}
				return path.join("/");
			}
		});
		/**
		 * @constructor
		 * @requires $
		 * @requires _
		 * @requires Backbone
		 * @requires LocalStorage
		 * @augments module:Backbone.Model
		 */
		exports.QuestionModel = Backbone.Model.extend({
			defaults : {

			}
		});
		return exports;
	});
	// End of define function...
}());
// End of IIFE

( function() {"use strict";
        /*jslint nomen: true*/
        /*jslint plusplus: true */
        /*global Backbone, $, _, define,Require*/
        define(
        /**
         * @author harik
         * @module View
         */
        function(require) {
            var homeViewTemplate, util, mixin, $, _, Backbone;
            //Load Libraries
            $ = require("jQuery");
            _ = require("underscore");
            Backbone = require("backbone");
            //Load Application classes
            util = require("util");
            mixin = require("mixin");
            // Load HTML Templates...
            homeViewTemplate = require("text!../../templates/homeView.html");
            /**
             @constructor
             @requires $
             @requires _
             @requires Backbone
             @requires Util
             @requires Mixin
             @requires HomeViewTemplate
             @augments module:Backbone.View
             */
            return Backbone.View.extend(
            /**
             @lends module:View~HomeView.prototype
             */
            {
                el : $('body'),
                events : {
                    "click #help" : "showHelp"
                },
                showHelp : function() {
                    alert("Help not available");
                },
                template : _.template(homeViewTemplate),
                initialize : function() {
                    _.extend(this.constructor.prototype, mixin.AnimationMixin);
                },
                render : function() {
                    $(this.el).html(this.template());
                    this.buttonHover(":button");
                    return this;
                }
            });
        });
        // End of define function...
    }());
// End of IIFE
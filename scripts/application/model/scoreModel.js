( function() {"use strict";
        /*jslint nomen: true*/
        /*global Backbone, Application, _, define*/
        define(['jQuery', 'underscore', 'backbone', 'localStore','util'],
        /**
         * @author harik
         * @module Model
         */
        function($, _, Backbone, LocalStore, Util) {
            /**
             @constructor
             @requires $
             @requires _
             @requires Backbone
             @requires Mixin
             @requires Util
             @augments module:Backbone.Model
             */
            return Backbone.Model.extend(
            /**
             @lends module:Model~ScoreModel.prototype
             */
            {
                sync : function(method, model, options) {
                    Util.log("info:Saved the score model");
                }
            });
        });
        // End of define function...
    }());
// End of IIFE

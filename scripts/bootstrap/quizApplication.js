( function() {"use strict";
        /*global define*/
        define(["quizRouter"],
        /**
         * @author harik
         * @module ApplicationLoader
         * @desc Defines the Router configuration
         * @param {Object} Router
         */
        function(Router) {
            var exports = {
                /**
                 * @desc Initializes the router object to navigate the views
                 * @method module:ApplicationLoader#init
                 */
                init : function() {
                    if (Router) {
                        var router = new Router();
                    }
                }
            };
            return exports;
        });
        // End for define method
    }());
// End for IIFE


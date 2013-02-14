( function() {"use strict";
        /*jslint nomen: true*/
        /*jslint plusplus: true */
        /*global Backbone, Application, _, define,Require*/
        define(['jQuery', 'underscore', 'backbone', 'util'],
        /**
         * @author harik
         * @module View
         */
        function($, _, Backbone, Util) {
            /**
             @constructor
             @requires $
             @requires _
             @requires Backbone
             @requires Util
             @requires Mixin
             @augments module:Backbone.View
             */
            return Backbone.View.extend(
            /**
             @lends module:View~TimerView.prototype
             */
            {
                duration : Util.QuizConstants.DEFAULT_DURATION,
                initialize : function(options) {
                    this.duration = options.interval;
                    this.bind('timedOut', options.timedOutCallback, options.parentView);
                },
                start : function() {
                    if (this.duration > 0) {
                        $(".time_left").html("00:" + Util.padString(this.duration, 0, 2));
                        this.duration--;
                    } else {
                        this.trigger("timedOut");
                    }
                    this.timer = setTimeout( function(context) {
                        return function() {
                            context.start();
                        }
                    }(this), Util.QuizConstants.ONE_SECOND);
                },
                isRunning : function() {
                    return Boolean(this.timer && this.timer.constructor === Number);
                },
                stop : function(restart) {
                    this.reset();
                    if (this.timer) {
                        window.clearTimeout(this.timer);
                        this.timer = null;
                    }
                    if (restart == true) {
                        this.start();
                    }
                },
                reset : function() {
                    this.duration = this.options.interval;
                },
                resetView : function() {
                    this.unbind();
                    this.undelegateEvents(); // not required....
                    this.stop();
                }
            });
        });
        // End of define function...
    }());
// End of IIFE
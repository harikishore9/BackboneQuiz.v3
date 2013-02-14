( function() {"use strict";
        /*jslint nomen: true*/
        /*jslint plusplus: true */
        /*global Backbone, Application, _, $, define*/
        define(['jQuery', 'underscore', 'backbone', 'util'],
        /**
         * @author harik
         * @module Mixin
         */
        function($, _, Backbone, Util) {
            var exports = {};
            /**
             @requires $
             @requires _
             @requires Backbone
             @requires Util
             @augments module:Backbone.Model
             */
            exports.AnimationMixin = {
                /**
                 * @desc Applies the Hover effect for the links
                 * @example
                 * AnimationMixin.linkHover()
                 * @method module:Mixin#linkHover
                 */
                linkHover : function() {
                    $("a[class!='options']").hover(function() {
                        $(this).fadeTo(350, 0.5);
                        $(this).fadeTo(350, 1.0);
                    });
                },
                /**
                 * @desc Applies the Hover effect for the buttons
                 * @example
                 * AnimationMixin.buttonHover()
                 * @method module:Mixin#buttonHover
                 */
                buttonHover : function() {
                    $("a[class='button']").mouseenter(function() {
                        $(this).fadeTo(350, 0.5);
                    }).mouseleave(function() {
                        $(this).fadeTo(350, 1.0);
                    });
                }
            };
           
            /**
             @requires $
             @requires _
             @requires Backbone
             @requires Util
             @augments module:Backbone.Model
             */
            exports.TimerMixin = {
                /**
                 * @desc Timer initialization configuration which should be invoked once
                 * @method module:Mixin#initTimer
                 * @example
                 * var myobj = new Myobj();
                 * TimerMixin.initTimer(1000,true,myobj,myobj.callback);
                 * @param {Object} interval Timer Interval
                 * @param {Object} repeat Repeat the callback action
                 * @param {Object} context Context the timer callback should use
                 * @param {Object} callback Callback method to execute
                 */
                initTimer : function(interval, repeat, context, callback) {
                    this.inerval = interval || 15000;
                    this.repeat = repeat || true;
                    this.context = context || window;
                    this.callback = callback;
                    this.timer = null;
                },
                /**
                 * @desc Returns the Timer type either repeat or once
                 * @method module:Mixin#getTimerType
                 * @example
                 * var myobj = new Myobj();
                 * TimerMixin.initTimer(1000,true,myobj,myobj.callback);
                 * TimerMixin.getTimerType('set'); // returns setTimeout / setInterval..
                 * @param {String} mode to identify either to set / clear
                 * @returns {String} type of the timer
                 */
                getTimerType : function(mode) {
                    var type = null;
                    if (mode && mode == 'set') {
                        type = this.repeat === true ? "setInterval" : "setTimeout";
                    } else {
                        type = this.repeat === true ? "clearInterval" : "clearTimeout";
                    }
                    return type;
                },
                /**
                 * @desc Starts the timer using the above configuration
                 * @method module:Mixin#startTimer
                 * @example
                 * var myobj = new Myobj();
                 * TimerMixin.initTimer(1000,true,myobj,myobj.callback);
                 * TimerMixn.startTimer();
                 */
                startTimer : function() {
                    this.timer = window[this.getTimerType()]( function(context, callback) {
                        return function() {
                            if (callback && callback.constructor === Function) {
                                callback(context);
                            }
                        };
                    }(this.context, this.callback), this.interval);
                },
                /**
                 * @desc Stops the timer using the above configuration
                 * @method module:Mixin#stopTimer
                 * @example
                 * var myobj = new Myobj();
                 * TimerMixin.initTimer(1000,true,myobj,myobj.callback);
                 * TimerMixn.startTimer();
                 * //..... Todo.. logic...
                 * TimerMixin.stopTimer();
                 */
                stopTimer : function() {
                    if (this.timer) {
                        window[this.getTimerType('clear')](this.timer);
                    }
                }
            };
            return exports;
        });
        // End of define function...
    }());
// End of IIFE
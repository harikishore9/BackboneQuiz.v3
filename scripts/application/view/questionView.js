( function() {"use strict";
        /*jslint nomen: true*/
        /*jslint plusplus: true */
        /*global Backbone, Application, _, define,Require*/
        define(['jQuery', 'underscore', 'backbone', 'util', 'mixin', 'timerView', 'text!../../templates/questionView.html'],
        /**
         * @author harik
         * @module View
         */
        function($, _, Backbone, Util, Mixin, TimerView, QuestionViewTemplate) {
            /**
             @constructor
             @requires $
             @requires _
             @requires Backbone
             @requires Util
             @requires Mixin
             @requires QuizViewTemplate
             @augments module:Backbone.View
             */
            return Backbone.View.extend({
                el : $('body'),
                template : _.template(QuestionViewTemplate),
                initialize : function(options) {
                    this.listenTo(this.model, 'change', this.createTimer);
                    this.listenTo(this, 'complete', this.showScore);
                    _.extend(this.constructor.prototype, Mixin.AnimationMixin);
                },
                createTimer : function() {
                    var radix, duration, size;
                    radix = Util.QuizConstants.DECIMAL_RADIX;
                    this.collection.update(this.model.get("questions"));
                    if (this.model.get("randomized") === true) {
                        this.collection.shuffle();
                    }
                    size = this.collection.size();
                    duration = parseInt(this.model.get("time"), radix) / size;
                    this.timer = new TimerView({
                        interval : duration,
                        parentView : this,
                        timedOutCallback : this.showNext
                    });
                    document.title = this.model.get("title");
                    this.showNext();
                },
                resetView : function() {
                    this.timer.resetView();
                    this.stopListening();
                    // Unbind all the events
                    this.undelegateEvents();
                    // Un delegate the events hash....
                    this.options.scoreModel.clear();
                    this.collection.resetCursor();
                },
                toggleButton : function(isLast) {
                    if (isLast === true) {
                        $("#next_question").removeClass("display").addClass("hidden");
                        $("#finish").removeClass("hidden").addClass("display");
                    } else {
                        $("#next_question").removeClass("hidden").addClass("display");
                        $("#finish").removeClass("display").addClass("hidden");
                    }
                    $("#next_question").attr("disabled","disabled");
                },
                render : function() {
                    var questions = this.collection;
                    if (questions && !questions.isEmpty()) {
                        var question = questions.next();
                        if (questions.getCursor() < questions.size()) {
                            question.save({
                                count : (questions.getCursor() + 1),
                                recordCount : questions.size()
                            });
                            $(this.el).html(this.template(question.toJSON()));
                        } else {
                            this.trigger("complete");
                        }
                        this.toggleButton(questions.isLast());
                        this.buttonHover();
                        this.linkHover();
                    }
                    return this;
                },
                events : {
                    "click #next_question" : "showNext",
                    "click #finish" : "showScore",
                    "click .options" : "mapAnswer",
                    "blur .fillin" : "mapAnswer",
                    "change .fillin" : "mapAnswer"
                },
                showNext : function() {
                    this.timer.reset();
                    this.render();
                    var isTimerBased = !isNaN(this.model.get("time"));
                    if (isTimerBased && !this.timer.isRunning()) {
                        this.timer.start();
                    }
                },
                showScore : function() {
                    this.timer.stop();
                    this.options.eventManager.trigger("quizcomplete", this.options.scoreModel, this.collection);
                },
                /**
                 * @desc  Selects the given element
                 * @example
                 * AnimationMixin.showAsSelected($('#el'),$('.options'))
                 * @method module:Mixin#showAsSelected
                 * @param {HTMLDOMElement} element HTML Element
                 * @param {HTMLDOMElementCollection} controlArray Selector that matches more than one element
                 */
                showAsSelected : function(element, controlArraySelector) {
                    if (controlArraySelector) {
                        $(controlArraySelector).each(function() {
                            $(this).removeClass("lowTransparency").addClass("highTransparency");
                            if ($(this).find("span")) {
                                $(this).children().eq(0).remove();
                            }
                        });
                    }
                    $(element).removeClass("highTransparency").addClass("lowTransparency", 1000, 'easeOutBounce');
                    $(element).prepend("<span class='selected_item'>&#10003;</span>");
                },
                mapAnswer : function(eventObj) {
                    var srcElement, element, keyPrefix, cursor;
                    srcElement = eventObj.target;
                    element = this.options.scoreModel.toJSON();
                    keyPrefix = "Answer_";
                    if ($(srcElement).hasClass(Util.QuizConstants.FILLIN_TYPE)) {
                        element[keyPrefix + this.collection.getCursor()] = [$(srcElement).val(), this.collection.models[this.collection.getCursor()].get("weight")];
                    } else {
                        this.showAsSelected(srcElement, $(".options"));
                        element[keyPrefix + this.collection.getCursor()] = [$(srcElement).html(), this.collection.models[this.collection.getCursor()].get("weight")];
                    }
                    this.options.scoreModel.save(element);
                    $("#next_question").removeAttr("disabled");
                }
            });
        });
        // End of define function...
    }());
// End of IIFE
( function() {"use strict";
        /*jslint nomen: true*/
        /*jslint plusplus: true */
        /*global Backbone, Application, _, $, define*/
        define(['jQuery', 'underscore', 'backbone', 'eventMgr', 'quizModel', 'questions', 'scoreModel', 'homeView', 'questionView', 'scoreView', 'util'],
        /**
         * @author harik
         * @module Router
         */
        function($, _, Backbone, EventManager, QuizModel, Questions, ScoreModel, HomeView, QuestionView, ScoreView, Util) {
            /**
             @constructor
             @requires $
             @requires _
             @requires Backbone
             @requires Model
             @requires View
             @augments module:Backbone.Router
             */
            return Backbone.Router.extend({
                routes : {
                    "" : "showHome",
                    "home" : "showHome",
                    "quiz" : "showQuiz",
                    "restart" : "restart",
                    "newgame" : "restart",
                    "skip/:idx/:answer/:weight" : "skipQuestion"
                },
                /**
                 * @desc Inits the Router navigation
                 * @method module:Router#initialize
                 */
                initialize : function() {
                    this.eventManager = EventManager;
                    Backbone.history.start();
                },
                /**
                 * @desc Navigates to the home view
                 * @method module:Router#showHome
                 */
                showHome : function() {
                    this.homeView = new HomeView();
                    this.homeView.render();
                },
                /**
                 * @desc Navigates to the Quiz view
                 * @method module:Router#showQuiz
                 */
                showQuiz : function() {
                    this.quizModel = new QuizModel.ConfigModel();
                    this.questionCollection = new Questions();
                    this.scoreModel = new ScoreModel();
                    this.scoreView = new ScoreView({
                        eventManager : this.eventManager
                    });
                    this.quizView = new QuestionView({
                        model : this.quizModel,
                        collection : this.questionCollection,
                        scoreModel : this.scoreModel,
                        eventManager : this.eventManager
                    });
                    this.quizModel.fetch({
                        success : function(model, response, options) {
                            Util.log("info:Model >> QuizModel >> " + response.questions[0].question);
                        },
                        error : function(model, xhr, options) {
                            Util.log("warn:Model >> QuizModel >> Unable to load questions");
                        }
                    });
                },
                /**
                 * @desc Restarts the quiz view
                 * @method module:Router#restart
                 */
                restart : function() {
                    this.quizView.resetView();
                    this.navigate("#quiz", {
                        trigger : true
                    });
                },
                /**
                 * @desc Navigates to the next question
                 * @method module:Router#skipQuestion
                 * @param {Number} idx     Current Question Index
                 * @param {Number} answer  Current Question Answer Value
                 * @param {Number} weight  Current Question Weightage
                 */
                skipQuestion : function(idx, answer, weight) {
                    if (this.quizView) {
                        this.quizView.showNext();
                    }
                    // Do any processing wih idx , answer ,weight for any negative marking....
                }
            });
        });
        // End of define function...
    }());
// End of IIFE

( function() {"use strict";
        /*jslint nomen: true*/
        /*global Backbone, Application, _*/
        require.config(
        /**
         * @desc Bootstrap file to load the application
         * @author Hari Kishore G
         */
        {
            paths : {
                /** Configure Libaries **/
                jQuery : "../libraries/jquery-1.8.3.min",
                underscore : "../libraries/underscore",
                backbone : "../libraries/backbone",
                localStore : "../libraries/backbone.localStorage",
                require : '../libraries/require',

                /** Configure Event Aggregator **/
                eventMgr : '../application/event/eventAggregator',
                /** Configure Application Models **/
                quizModel : "../application/model/quizModel",
                questions : "../application/model/questionCollection",
                scoreModel : "../application/model/scoreModel",

                /** Configure Application Views**/
                homeView : "../application/view/homeView",
                timerView : "../application/view/timerView",
                questionView : "../application/view/questionView",
                scoreView : "../application/view/scoreView",

                /** Configure Application Routers**/
                quizRouter : "../application/router/quizRouter",

                /** Configure Application Utilities**/
                mixin : "../application/util/mixin",
                util : "../application/util/util"
            },
            /**
             * @desc Defines the module configuration which are not AMD compatible
             */
            shim : {
                'jQuery' : {
                    exports : 'jQuery'
                },
                'backbone' : {
                    deps : ['jQuery', 'underscore'],
                    exports : "Backbone"
                },
                'underscore' : {
                    exports : "_"
                }
            }
        });
        /**
         * @desc Launches the Quiz Application by loading the required dependencies
         */
        require(["quizApplication"], function(quizApp) {
            quizApp.init();
        });
    }());
// End for IIFE

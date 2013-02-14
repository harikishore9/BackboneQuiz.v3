( function() {"use strict";
        /*jslint nomen: true*/
        /*jslint plusplus: true */
        /*global Backbone, Application, _, define,Require*/
        define(['jQuery', 'underscore', 'backbone', 'util', 'mixin', 'text!../../templates/scoreView.html'],
        /**
         * @author harik
         * @module View
         */
        function($, _, Backbone, Util, Mixin, ScoreViewTemplate) {
            /**
             @constructor
             @requires $
             @requires _
             @requires Backbone
             @requires Util
             @requires Mixin
             @requires ScoreViewTemplate
             @augments module:Backbone.View
             */
            return Backbone.View.extend(
            /**
             @lends module:View~ScoreView.prototype
             */
            {
                el : $('body'),
                template : _.template(ScoreViewTemplate),
                initialize : function(options) {
                    _.extend(this.constructor.prototype, Mixin.AnimationMixin);
                    this.listenTo(options.eventManager, 'quizcomplete', this.generateScore);
                },
                generateScore : function(model, collection) {
                    var attemptedQuestions = 0, data, totalQuestions, keyPrefix, key, keySize, totalWeight, score;
                    data = JSON.parse(JSON.stringify(model));
                    totalWeight = 0;
                    score = 0;
                    _.each(collection.models, function(model) {
                        totalWeight += model.get("weight");
                    });
                    totalQuestions = collection.size();
                    keyPrefix = "Answer_";
                    for ( key = 0; key < totalQuestions; key += 1) {
                        if (data[keyPrefix + key]) {
                            score += data[keyPrefix + key][1];
                            attemptedQuestions++;
                        }
                    };
                    model.save({
                        totalQuestions : totalQuestions,
                        totalWeight : totalWeight,
                        attempted : attemptedQuestions,
                        score : score
                    });
                    this.model = model;
                    this.render();
                },
                render : function() {
                    $(this.el).html(this.template(this.model.toJSON()));
                    this.buttonHover();
                    this.linkHover();
                    this.stopListening();
                    return this;
                }
            });
        });
        // End of define function...
    }());
// End of IIFE
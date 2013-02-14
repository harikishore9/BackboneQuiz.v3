( function() {"use strict";
        /*jslint nomen: true*/
        /*jslint plusplus: true */
        /*global define, $, _, Backbone, LocalStorage, QuizModel*/
        define(['jQuery', 'underscore', 'backbone', 'localStore', 'quizModel'],
        /**
         * @author harik
         * @module QuestionCollection
         */
        function($, _, Backbone, LocalStorage, QuizModel) {
            /**
             @constructor
             @requires $
             @requires _
             @requires Backbone
             @augments module:Backbone.Model
             */
            return Backbone.Collection.extend({
                _cursor : -1,
                model : QuizModel.QuestionModel,
                localStorage : new LocalStorage("QuizQuestion"),
                parse : function(response) {
                    return this.models;
                },
                /**
                 * @desc Resets the cursor in the collection list...
                 * @example
                 * QuestionCollection.resetCursor()
                 * @method module:QuestionCollection#resetCursor
                 */
                resetCursor : function() {
                    this.shuffle();
                    this._cursor = -1;
                },
                /**
                 * @desc Returns the current cursor position during the traversal
                 * @example
                 * QuestionCollection.getCursor()
                 * @method module:QuestionCollection#getCursor
                 * @returns {Number} cursor position
                 */
                getCursor : function() {
                    return this._cursor;
                },
                /**
                 * @desc Returns the next item in the collection from the cursor position
                 * @method module:QuestionCollection#next
                 * @example
                 * QuestionCollection.next()
                 * @returns {QuizModel.QuestionModel} Question Model
                 */
                next : function() {
                    var item = null;
                    if (!this.isEmpty() && this.getCursor() < this.size()) {
                        item = this.models[++this._cursor];
                    }
                    return item;
                },
                /**
                 * @desc Returns the previous item in the collection from the cursor position
                 * @method module:QuestionCollection#previous
                 * @example
                 * QuestionCollection.previous()
                 * @returns {QuizModel.QuestionModel} Question Model
                 */
                previous : function() {
                    var item = null;
                    if (!this.isEmpty() && this.getCursor() > this.size()) {
                        item = this.models[--this._cursor];
                    }
                    return item;
                },
                /**
                 * @desc Returns the first item in the collection
                 * @method module:QuestionCollection#first
                 * @example
                 * QuestionCollection.first()
                 * @returns {QuizModel.QuestionModel} Question Model
                 */
                first : function() {
                    var item = null;
                    if (!this.isEmpty()) {
                        item = this.models[0];
                    }
                    return item;
                },
                /**
                 * @desc Returns the first item in the collection
                 * @method module:QuestionCollection#last
                 * @example
                 * QuestionCollection.last()
                 * @returns {QuizModel.QuestionModel} Question Model
                 */
                last : function() {
                    var item = null;
                    if (!this.isEmpty()) {
                        item = this.models[this.size() - 1];
                    }
                    return item;
                },
                /**
                 * @desc Returns the boolean value to indicate the items availability in the collection
                 * @method module:QuestionCollection#isEmpty
                 * @example
                 * QuestionCollection.isEmpty()
                 * @returns {Boolean} Boolean value
                 */
                isEmpty : function() {
                    return this.models.length === 0;
                },
                /**
                 * @desc Returns the property value for the given key in the model of the collection
                 * @method module:QuestionCollection#getProperty
                 * @example
                 * QuestionCollection.getProperty("time")
                 * @param {String} key Key in the Model
                 * @returns {Boolean} Boolean value
                 */
                getProperty : function(key, index) {
                    var property = null;
                    index = index || 0;
                    if (!this.isEmpty()) {
                        property = this.models[index].get("properties")[key];
                    }
                    return property;
                },
                /**
                 * @desc Randomize the items in the collection
                 * @method module:QuestionCollection#shuffle
                 * @example
                 * QuestionCollection.shuffle()
                 */
                shuffle : function() {
                    var modelSize = this.models.length, idx, random, change, helper, decimalRadix;
                    decimalRadix = 10;
                    random = parseInt(Math.random() * modelSize, decimalRadix);
                    for ( idx = 0; idx < modelSize; idx += 1) {
                        change = idx + parseInt(Math.random() * (modelSize - idx), decimalRadix);
                        helper = this.models[idx];
                        this.models[idx] = this.models[change];
                        this.models[change] = helper;
                    }
                },
                /**
                 * @desc Returns the size of the items in the collection
                 * @method module:QuestionCollection#size
                 * @example
                 * QuestionCollection.size()
                 * @returns {Number} items size
                 */
                size : function() {
                    return this.models.length;
                },
                /**
                 * @desc Returns the boolean value to indicate the cursor is in the last item
                 * @method module:QuestionCollection#isLast
                 * @example
                 * QuestionCollection.isLast()
                 * @returns {Boolean} Boolean value
                 */
                isLast : function() {
                    return (this.getCursor() === (this.size() - 1));
                }
            });
        });
        // End of define function...
    }());
// End of IIFE
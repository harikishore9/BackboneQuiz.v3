( function() {"use strict";
        /*jslint nomen: true*/        
        /*global Backbone, _, define*/
        define(['jQuery', 'underscore', 'backbone'],
        /**
         * @author harik
         * @module Event Aggregator
         */
        function($, _, Backbone) {
            return _.extend({}, Backbone.Events);
        });
        // End of define function...
    }());
// End of IIFE
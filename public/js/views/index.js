(function() {
  define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    return Backbone.View.extend({
      el: '.index-view .backbone',
      initialize: function() {
        return this.$el.html('Hello world');
      }
    });
  });

}).call(this);

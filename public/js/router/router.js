(function() {
  define(['views/index'], function(Index) {
    return Backbone.Router.extend({
      view: null,
      routes: {
        '': 'index'
      },
      index: function() {
        return this.setPage(Index);
      },
      setPage: function(Page, options) {
        if (this.view) {
          this.view.undelegateEvents();
        }
        this.view = new Page(options);
      }
    });
  });

}).call(this);

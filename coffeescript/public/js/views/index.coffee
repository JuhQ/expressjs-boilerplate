define [
  'jquery'
  'underscore'
  'backbone'
  ], (
  $
  _
  Backbone
  ) ->
  Backbone.View.extend
    el: '.index-view .backbone'
    initialize: ->
      @$el.html('Hello world')
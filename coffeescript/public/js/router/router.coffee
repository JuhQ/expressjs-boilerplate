define [
  'views/index'
  ], (
  Index
  ) ->
  Backbone.Router.extend
    view: null
    routes:
      '': 'index'

    index: ->
      @setPage Index

    setPage: (Page, options) ->
      @view.undelegateEvents() if @view
      @view = new Page(options)
      return

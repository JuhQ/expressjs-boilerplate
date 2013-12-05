module.exports = (settings) ->
  mongoose = require('mongoose')

  modelSchema = mongoose.Schema {
    id: 'Number'
    name: 'String'
    created: { type: Date, default: Date.now }
    random: {type: [Number], index: '2d', default: -> return [Math.random(), Math.random()]}
  }

  mongoose.model 'model', modelSchema

  mongoose.connect 'localhost', settings.db
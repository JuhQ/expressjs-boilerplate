(function() {
  module.exports = function(settings) {
    var modelSchema, mongoose;
    mongoose = require('mongoose');
    modelSchema = mongoose.Schema({
      id: 'Number',
      name: 'String',
      created: {
        type: Date,
        "default": Date.now
      },
      random: {
        type: [Number],
        index: '2d',
        "default": function() {
          return [Math.random(), Math.random()];
        }
      }
    });
    mongoose.model('model', modelSchema);
    return mongoose.connect('localhost', settings.db);
  };

}).call(this);

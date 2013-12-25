(function() {
  var MongoStore, app, cluster, express, http, i, mongoStore, mongoconfig, mongoose, numCPUs, path, routes, server, settings;

  express = require('express');

  http = require('http');

  path = require('path');

  routes = require('./routes');

  mongoose = require('mongoose');

  MongoStore = require('connect-mongo')(express);

  cluster = require('cluster');

  numCPUs = require('os').cpus().length;

  settings = {
    db: 'database',
    port: 3000,
    cookie: 'cookie-secret'
  };

  mongoconfig = require('./mongoconfig')(settings);

  app = express();

  server = http.createServer(app);

  mongoStore = new MongoStore({
    db: settings.db
  });

  app.configure(function() {
    app.set('port', process.env.PORT || settings.port);
    app.set('views', "" + __dirname + "/views");
    app.set('view engine', 'ejs');
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.favicon('public/favicon.ico'));
    app.use(express.methodOverride());
    app.use(express.cookieParser(settings.cookie));
    app.use(express.session({
      secret: settings.cookie,
      cookie: {
        maxAge: 60000 * 60 * 24 * 30 * 12
      },
      store: mongoStore
    }));
    app.use(express["static"](path.join(__dirname, 'public')));
    return app.use(app.router);
  });

  app.get('/', routes.index);

  if (cluster.isMaster) {
    i = 0;
    while (i < numCPUs) {
      cluster.fork();
      i++;
    }
    cluster.on('exit', function(worker, code, signal) {
      console.log("worker " + worker.process.pid + " died");
      return cluster.fork();
    });
  } else {
    server.listen(app.get('port'), function() {
      return console.log('Express server listening on port ' + app.get('port'));
    });
  }

}).call(this);

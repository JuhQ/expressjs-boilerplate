express = require('express')
http = require('http')
path = require('path')
routes = require('./routes')
mongoose = require('mongoose')
MongoStore = require('connect-mongo')(express)
cluster = require('cluster')
numCPUs = require('os').cpus().length


settings =
  db: 'database'
  port: 3000
  cookie: 'cookie-secret'

mongoconfig = require('./mongoconfig')(settings)


app = express()
server = http.createServer(app)
mongoStore = new MongoStore db: settings.db

app.configure ->
  app.set 'port', process.env.PORT or settings.port
  app.set 'views', "#{__dirname}/views"
  app.set 'view engine', 'ejs'
  app.use express.urlencoded()
  app.use express.json()
  app.use express.favicon('public/favicon.ico')
  app.use express.methodOverride()
  app.use express.cookieParser(settings.cookie)

  app.use express.session
    secret: settings.cookie
    cookie: {maxAge: 60000 * 60 * 24 * 30 * 12} # one year
    store: mongoStore

  app.use express.static(path.join(__dirname, 'public'))
  app.use app.router

app.get '/', routes.index

if cluster.isMaster
  
  # Fork workers.
  i = 0
  while i < numCPUs
    cluster.fork()
    i++

  # Revive dead worker
  cluster.on 'exit', (worker, code, signal) ->
    console.log "worker #{worker.process.pid} died"
    cluster.fork()

else
  server.listen app.get('port'), ->
    console.log 'Express server listening on port ' + app.get('port')
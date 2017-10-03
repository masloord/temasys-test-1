const express = require('express')
const app = express()
const http = require('http')
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'))
// Start the app by listening on the default
// Heroku port
// Instruct the app
// to use the forceSSL
// middleware

const path = require('path')
// ...
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'))
})

const port = process.env.PORT || '3001'
app.set('port', port)

const server = http.createServer(app)
server.listen(port, () => console.log('running'))

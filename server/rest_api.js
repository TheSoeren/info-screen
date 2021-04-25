// Dependencies
const fs = require('fs')
const http = require('http');
const express = require('express')
const cors = require('cors')

const app = express()

// CORS setup
const whitelist = [
  'http://192.168.1.110',
  'http://localhost:8080'
]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//const PROJECT_PATH = '..'
const PROJECT_PATH = '/home/pi/infoscreen'
const CHORES_FILE_PATH = '/data/chores.json'
const EVENTS_FILE_PATH = '/data/events.json'

// REST endpoints
// CHORES
app.get('/chores', async function (req, res) {
  fs.readFile(PROJECT_PATH + CHORES_FILE_PATH, (err, data) => {
    if (err) {
      res.status(404).json({ "error": "not found", "err": err})
      return
    }
    res.json(JSON.parse(data))
  });
})

app.post('/chores', function (req, res) {
  fs.readFile(PROJECT_PATH + CHORES_FILE_PATH, (err, data) => {
    if (err) {
      res.status(404).json({ "error": "not found", "err": err})
      return
    }

    let fileContent = JSON.parse(data)
    fileContent.push(req.body)

    fs.writeFile(PROJECT_PATH + CHORES_FILE_PATH, JSON.stringify(fileContent), err => {
      if (err !== null) {
        res.status(400).json({ error: "Failed to save data", err: err})
        return
      } else {
        res.status(200).send('Successfully saved')
      }
    })
  })
})

app.delete('/chores/:id', function (req, res) {
  fs.readFile(PROJECT_PATH + CHORES_FILE_PATH, (err, data) => {
    if (err) {
      res.status(404).json({ "error": "not found", "err": err})
      return
    }

    const fileContent = JSON.parse(data)
    const writeFile = fileContent.filter(chore => chore.id !== req.params.id)

    fs.writeFile(PROJECT_PATH + CHORES_FILE_PATH, JSON.stringify(writeFile), err => {
      if (err !== null) {
        res.status(400).json({ error: "Failed to save data", err: err})
        return
      } else {
        res.status(200).send('Successfully saved')
      }
    })
  })
})

// EVENTS
app.get('/events', async function (req, res) {
  fs.readFile(PROJECT_PATH + EVENTS_FILE_PATH, (err, data) => {
    if (err) {
      res.status(404).json({ "error": "not found", "err": err})
      return
    }
    res.json(JSON.parse(data))
  });
})

app.post('/events', function (req, res) {
  fs.readFile(PROJECT_PATH + EVENTS_FILE_PATH, (err, data) => {
    if (err) {
      res.status(404).json({ "error": "not found", "err": err})
      return
    }

    let fileContent = JSON.parse(data)
    fileContent.push(req.body)

    fs.writeFile(PROJECT_PATH + EVENTS_FILE_PATH, JSON.stringify(fileContent), err => {
      if (err !== null) {
        res.status(400).json({ error: "Failed to save data", err: err})
        return
      } else {
        res.status(200).send('Successfully saved')
      }
    })
  })
})

app.delete('/events/:id', function (req, res) {
  fs.readFile(PROJECT_PATH + EVENTS_FILE_PATH, (err, data) => {
    if (err) {
      res.status(404).json({ "error": "not found", "err": err})
      return
    }

    const fileContent = JSON.parse(data)
    const writeFile = fileContent.filter(chore => chore.id !== req.params.id)

    fs.writeFile(PROJECT_PATH + EVENTS_FILE_PATH, JSON.stringify(writeFile), err => {
      if (err !== null) {
        res.status(400).json({ error: "Failed to save data", err: err})
        return
      } else {
        res.status(200).send('Successfully saved')
      }
    })
  })
})

// Starting http server
const httpServer = http.createServer(app)
httpServer.listen(8000, () => console.log('HTTP Server running on port 8000'))

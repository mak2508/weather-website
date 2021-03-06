const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
publicPath = path.join(__dirname, '../public')
viewsPath = path.join(__dirname, '../templates/views')
partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ahmad Khan'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Ahmad Khan',
    personName: 'Dona Ferdinando'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Ahmad Khan',
    help_text: 'Sucks to be you'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address query term required'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
  
    forecast(latitude, longitude, location, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        address: req.query.address,
        location,
        forecast: forecastData
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ahmad Khan',
    errorMsg: 'Help article not found'
  })
})

/// placed at the end since matching occurs in order
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ahmad Khan',
    errorMsg: 'Page not found'
  })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
  console.log(`Server is up on Port ${port}.`)
})

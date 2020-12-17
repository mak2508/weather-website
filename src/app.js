const path = require('path')
const express = require('express')

const app = express()
publicPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ahmad Khan'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    location: 'Doha',
    forecast: '30C'
  })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
  console.log('Server is up on Port 3000.')
})

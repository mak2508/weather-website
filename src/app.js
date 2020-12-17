const path = require('path')
const express = require('express')

const app = express()
publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

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

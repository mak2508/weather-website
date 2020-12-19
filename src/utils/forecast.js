const request = require('postman-request')

const forecast = (latitude, longitude, location, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f85f1c65494f7ddad90b416d7e12f35e&query=${latitude},${longitude}&units=m`

  request({url, json: true}, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to the network")
    } else if (body.error) {
      callback("Unable to fetch weather for given query")
    } else {
      callback(undefined, 
        `${body.current.weather_descriptions[0]}
        weather today in ${location}. It is
        ${body.current.temperature} degrees out, but it
        feels like ${body.current.feelslike} degrees.
        The humidity today is ${body.current.humidity}%,
        and the UV index is ${body.current.uv_index}.`)
    }
  })
}

module.exports = forecast

const request = require('request')

const forecast = (latitude, logitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + logitude + '&appid=70f143079afb3b8a7f97e8a5abfcf317'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location service!', undefined)
        } else if (body.cod !== 200){
            callback('Unable to find location. Try another search', undefined)
        }  else {
            callback(undefined, 'The weather of ' + body.name + ' is ' + body.weather[0].description)
        }
    })
}

module.exports = forecast
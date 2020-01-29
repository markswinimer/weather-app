const request = require('request')

// { json: true } option is a feature of 'request' module. It returns the responose parsed

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1df93248d089f31712d51634207e0033/' + latitude + ',' + longitude + '?lang=en'
    
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the weather service', undefined)
        } else if (body.error) {
            // Search for error response: aka 400, 404, 500
            callback('Unable to find location', undefined)
        } else {
            const temp = body.currently.temperature
            const chanceOfRain = body.currently.precipProbability

            const currentForecast = body.daily.data[0].summary + ' It is currently ' + temp + ' degrees out. There is a ' + chanceOfRain + '% chance of rain.'
            callback(undefined, currentForecast)
        }
    })
}

module.exports = forecast
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
            const hourly = body.hourly.data[0]

            //Converts UNIX time string to standard time format
            const dateObj = new Date(hourly.time * 1000);
            const utcString = dateObj.toUTCString();
            // const time = utcString.slice(-11, -4); 
            const time = dateObj.getUTCHours(); 

            const currentForecast = {
                forecast: body.daily.data[0].summary + ' It is currently ' + temp + ' degrees out. There is a ' + chanceOfRain + '% chance of rain.',
                hourly: hourly.summary + ' At ' + time + ':00 it is ' + hourly.summary + ' and ' + hourly.temperature + ' degrees outside.'
            }
            callback(undefined, currentForecast)
        }
    })
}

module.exports = forecast
const request = require('request')

const geocode = (address, callback) => {
    // encodeURIComponent(address) is needed to convert the input to correct url
    // this will catch people searching for reserved characters: &, /, %
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXN3aW5pbWVyIiwiYSI6ImNrNW9rMWN1cDAxNTgzbW8wbm05NG44anAifQ.DG_KE0FWq9pntw21hArzww&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Location not found')
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode
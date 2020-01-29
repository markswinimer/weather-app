const path = require('path')
const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Set up handlebars views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to use
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mark Swinimer'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mark Swinimer'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mark Swinimer',
        message: 'You have reached the help page, please input your question.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errror: 'No location provided'
        })
    }

    const location = req.query.address

    // default params here is very important. error cannot be returned because server crashes on arguments
    geocode(location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: location,
                weather: forecastData
            })
            console.log('Location: ' + location)
            console.log('Forecast: ' + forecastData)
        })
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No search term provided'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mark Swinimer',
        errorMessage: 'Help article not found2'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mark Swinimer',
        errorMessage: 'Sorry, we couldnt find that page'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
const path = require('path')
const express = require('express');
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

// Setup handlebars engine and views location
app.set('view engine', 'hbs' )
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
}) 

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Yunus .A'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Yunus .A'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({
                    error: error,
                })
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error,
                    })
                }

                res.send({
                    forecast: forecastData,
                    location: location,
                })
            })
        })
       
    }
    
})

app.get('/help/*', (req, res) => {
    res.render('help-page', {
        paragraph: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('help-page', {
        paragraph: 'page not found'
    })
})

// app.get('', (req, res) => {
//     res.send('Hello from express!')
// })

// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'Yunus',
//             occupation: 'IT personnel'
//         },
//         {
//             Origin: 'Nigeria',
//             religion: 'Islam'
//         }
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('About us')
// })

// app.com
// app.com/help
// app.com/about
// app.get('/help/*', (req, res) => {
//     res.send('<h2>Help article not found</h2>')
// }) 

// app.get('*', (req, res) => {
//     res.send('<h2>My 404 page</h2>')
// }) 

app.listen(port, () => {
    console.log('Sever is up on port ' + port)
})
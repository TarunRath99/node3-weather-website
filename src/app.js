const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app=express()
const port=process.env.PORT||3000

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//nodemon src/app.js -e js,hbs for loading handlebars templates

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Tarun Rath'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        message:'ask for help',
        name:'Tarun Rath'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Tarun Rath'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'you must provide address term'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
            {
                return res.send({
                    error:error
                })
            }
       
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({
                    error:error
                })
            }

            res.send({
                location:location,
                summary:forecastData
            })
        })
    }) 
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Error 404',
        message:'help article not found',
        name:'Tarun Rath'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Error 404',
        message:'Page not found',
        name:'Tarun Rath'
    })
})

app.listen(port,()=>{
    console.log("server up in port "+port)
})

const express=require('express')
const path=require('path')
const app=express()
const port=process.env.PORT || 3000
const hbs=require('hbs')
const geoCode=require('./utils/geoCode')
const forecast=require('./utils/forecast')
//set up static diretory to serve
app.use(express.static(path.join(__dirname,'../public')))
//define paths for express config
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Shiv'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Author',
        name:'Sanket'
    })
})
app.get('/help',(req,res)=>{
     res.render('help',{
         message:'Yahan koi help nahi milegi',
         title:'Help',
         name:'Shiv'
     })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"No address provided"
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,place_name}={})=>{
        if(error){
        return res.send({
            error:"No address provided"
        })}
       forecast(latitude,longitude,(error,foreastData)=>{
           if(error)
           return res.send({error:"Error in fetching data"})
           res.send({
            forecast:foreastData,
            location:place_name,
            address:req.query.address
        })
        })  
      })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
    return res.send({
        error:"You must provide a search term"
    })
    }
    console.log(req.query.search)
    res.send({
     products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404 page', {
        title:'404',
        message:'Help article not found',
    name:'Shiv Sanket'})
    })
app.get('*',(req,res)=>{
    res.render('404 page', {
        title:'404',
        message:'Page not found',
        name:'Shiv Sanket'})
})
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})
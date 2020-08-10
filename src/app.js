const path = require('path');
const express = require('express');
const hbs = require('hbs');

//geocode and forecast utils
const geocode = require('./utils/gecode');
const forecast = require('./utils/forecast');

const app = express();

//set path for engine config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//set handebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//static direcory to serve
app.use(express.static(publicDirectoryPath));

//forecast and w

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather-app',
        name:'panneer',
    });
});
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'panneer',
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'this is same helpful text',
        title:'help',
        name:'panneer',
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'send the address query to search'
        });
    }
        geocode(req.query.address,(error,{latitude,longtitude,location}={})=>{
            if(error){
                return res.send({
                    error:error,
                });
            }
            forecast(latitude,longtitude,(error,{temperature,feelslike})=>{
                if(error){
                    return res.send({
                        error:error,
                    });
                }
                res.send({
                    address:req.query.address,
                    location:location,
                    temperature:temperature,
                    feelslike:feelslike
                });
            });    
        });

});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'enter some search data',
        });
    }
    console.log(req.query);
    res.send({
        product: [],
    });
});

//this has to come at last

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error:'help searched not found'
    });
});

app.get('*',(req,res)=>{ 
    res.render('error',{
        error:'page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
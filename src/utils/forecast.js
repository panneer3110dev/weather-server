const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=aa351b41f6d96ec12bc3dcac6221cb69&query='+latitude+','+longitude;

    request({url,json:true},(error,{body})=>{
        if (error) {
            callback('unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find the weather for the location mentioned', undefined);
        } else {
            callback(undefined, 
            {feelslike:body.current.feelslike,
            temperature:body.current.temperature});
        }  
    });

};
module.exports = forecast;

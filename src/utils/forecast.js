const request=require('request')

const forecast=(latitude,longitude,callback)=>
{
    const url='https://api.darksky.net/forecast/0b65d6f8cd88969115ee8f09bda4539d/'+latitude+","+longitude+'?units=si'
    request({url , json:true},(error,{body})=>{
    if(error)
    {
        callback("Cannot connect to web service",undefined)
    }
    else if(body.error)
    {
       callback("Unable to find weather",undefined)
    }
    else{
        callback(undefined,body.daily.data[0].summary+"It's currently "+body.currently.temperature+
        " degrees celsius .Chances of rain is "+body.currently.precipProbability)+"%"
    }
    })
 
}

module.exports=forecast

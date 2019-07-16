const request=require('request')
const forecast=(latitude,longitude,callback)=>{
const url='https://api.darksky.net/forecast/2a87a1352ee63607af36db210ef65ea2/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'
request({url,json:true},(error,{body})=>{
   if(error)
   {
   callback('No internet connection!')
   }
   else if(body.error){
      callback('Unable to find location')
   }
   else{
       callback(undefined,body.daily.data[0].summary+' The current temperature is '+body.currently.temperature+' There is '+body.currently.precipProbability+'% chance of rain')
   }
})}
module.exports=forecast
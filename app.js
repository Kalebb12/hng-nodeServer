const express = require("express")
const geoip = require('geoip-lite')
const app = express()
app.get("/api/hello",(req,res)=>{
    const clientIp = req.ip;
    const findGeo =() =>{
        const geo = geoip.lookup(clientIp);
        if(geo){
          return(geo.city)
        }
        return "Unknown"
    }
    const visitorName = req.query.visitor_name
    res.json({ 
        client_ip:clientIp,
        location : findGeo()
        ,greeting: `Hello, ${visitorName}!, the temperature is 11 degrees Celcius in ${findGeo()}` 
    })
})

app.listen(8080, ()=>{
    console.log("Server is running on port 8080")
})
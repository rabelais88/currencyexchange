const moment = require('moment')
const https = require('https')
const express = require('express')
const app = express()
const fs = require('fs')

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("server is up at " + server.address().port)
})

const APIkey = 'qAMf5kWkPhzClY5BlKk2QRvZVLmLuEid'

app.get('/jsondata',(req,res)=>{
  const curdate = moment().format('YYYYMMDD')
  let urloption = `authkey=${APIkey}&searchdate=${curdate}&data=AP01`
  let jsonres = ''
  https.get('https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?' + urloption,(httpres)=>{
    httpres.setEncoding('utf8')
    httpres.on('end',(err)=>{
      res.send(jsonres)
    })
    httpres.on('data',(httpdata)=>{
      jsonres += httpdata
    })
  })
})

app.use('/dist', express.static(__dirname + '/dist'))

app.get('/',(req,res)=>{
  fs.readFile('index.html','utf8',(err,data)=>{
    res.send(data)
  })
})
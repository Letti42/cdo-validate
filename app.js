const express = require('express');
const app = express();
const fetch = require('cross-fetch');

app.get('/',(req,res)=>{
  if(req.query.url === undefined){
    res.send({"good":"false","type":400});
    return;
  }
  var urlRedir = req.query.url;
  if(urlRedir !== undefined)urlRedir = decodeURIComponent(urlRedir).toLowerCase().includes('://')?'http://'+decodeURIComponent(urlRedir).split('://')[1]:"http://"+decodeURIComponent(urlRedir);
  fetch(decodeURIComponent(encodeURIComponent(urlRedir))).then((response) => response.text()).then((text)=>{
    res.send({"good":"true","type":200});
  })
  .catch((err)=>{
    res.send({"good":"false","type":404});
  })
});

app.listen(process.env.PORT || 5000);

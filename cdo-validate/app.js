const express = require('express');
const app = express();
const fetch = require('cross-fetch');

app.get('/',(req,res)=>{
  if(req.query.url === undefined){
    res.send('Bad request');
    return;
  }
  var urlRedir = req.query.url;
  if(urlRedir !== undefined)urlRedir = decodeURIComponent(urlRedir).toLowerCase().includes('://')?'http://'+decodeURIComponent(urlRedir).split('://')[1]:"http://"+decodeURIComponent(urlRedir);
  fetch(decodeURIComponent(encodeURIComponent(urlRedir))).then((response) => response.text()).then((text)=>{
    res.send('good');
  })
  .catch((err)=>{
    res.send('err');
  })
});

app.listen(process.env.PORT || 5000);
const express = require('express')
,     bodyParser = require('body-parser')
,     data = require('./data.js');


const app = express();
const PORT = 3000;
app.use(bodyParser.json());


app.get('/api/getData', (req, res) => res.status(200).send(data));

app.post('/api/addData', function(req, res, next){
  data.unshift(req.body);
  res.status(200).send(data);
});




app.listen(PORT, console.log('Listening on port:', PORT, 'yAy\!'));

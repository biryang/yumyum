const express = require('express')
const app = express()
var fs = require('fs');


const getFoodList = () => {
  const foodListJson = fs.readFileSync('./foodlist.json', 'utf8');
  const jsonData = JSON.parse(foodListJson);
  return jsonData
}

const randomFood = (list) => {
  random = Math.floor(Math.random() * 10)
  return list[random]
}

const foodList = getFoodList()
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/random', function (req, res) {
  foodJson = JSON.stringify(randomFood(foodList))
  return res.send(foodJson);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

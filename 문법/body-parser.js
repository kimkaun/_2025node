const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.post('/submit', (req, res) => {
  const {name, year} = req.body;
  res.send(`Name : ${name}, Year : ${year}`); // (')이게 아니라 (`)다
});

// 서버가 포트 3001에서 요청을 대기합니다.
app.listen(3001, () => {
  console.log('서버가 http://localhost:3001에서 실행 중입니다.');
});
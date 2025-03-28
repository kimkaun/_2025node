const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// .env로 민감한 데이터를 이동
const db = mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,    
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

app.set('view engine', 'ejs');
// __dirname : 현재 파일이 속한 절대경로
// path.join을 사용하면 운영체제에 맞추어 경로 구분자(/, \)를 알아서 정해준다.
app.set('views', path.join(__dirname, 'views'));

db.connect(err => {
  if(err) {
    console.error('MYSQL 연결 실패 : ', err);
    return;
  }
  console.log('MYSQL에 연결 되었습니다.');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/travel', (req, res) => {
  const query = 'select id, name from travelList';
  db.query(query, (err, results) => {
    if(err) {
      console.error('데이터베이스 쿼리 실패');
      resstatus(500).send('Internal Server Error');
      return;
    }
    const travelList = results;
    res.render('travel', {travelList});
  })
});

// 서버가 포트 3001에서 요청을 대기합니다.
app.listen(3001, () => {
    console.log('서버가 http://localhost:3001에서 실행 중입니다.');
  });


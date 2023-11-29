const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const query = require('./sql/query');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: '', // 데이터베이스 호스트 주소
  user: 'root', // 데이터베이스 유저명
  password: 'test1234', // 데이터베이스 패스워드
  port: 5000,
});

// 데이터베이스
connection.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Connected to database');
});

// 데이터베이스 초기화
const CreateMethod = () => {
  try {
    connection.query(query.createDatabase);
    connection.query(query.useDatabase)
    connection.query(query.createPostingTable)
  } catch (error) {
    console.log(error)
  }
}
CreateMethod();

// 정적 파일 제공 (Svelte 앱을 호스팅하기 위해 필요)
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

// API 엔드포인트 설정 (예시)
app.get('/category/*', (req, res) => {
  if (req.params[0] == '') {
    
  } else {
    const category = req.params[0];
    connection.query('SELECT * FROM posts WHERE category = ?', [category], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
    });
  }
});

// POST 요청을 처리하는 엔드포인트
app.post('/post', (req, res) => {
  const { title, description, category } = req.body;
  console.log(title, description, category);

  // 데이터베이스가 없다면 생성
  connection.query(query.insertPosting, [title, description, category, 1], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.status(200).json({ success: true, message: 'Post created successfully' });
  });
});

// 나머지 요청은 index.html로 리다이렉트
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
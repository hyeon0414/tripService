const express = require('express');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // JSON 파싱
app.use(express.urlencoded({ extended: true })); // URL 파싱

// 기본 라우트
app.get('/', (req, res) => {
  res.json({
    message: '서버 실행 중입니다.',
  });
});

const PORT = process.env.PORT || 3000; // .env 파일에서 포트 번호 가져오기 (없다면 3000)

app.listen(PORT, () => {
  console.log(`서버 ${PORT} 포트에서 실행 중입니다.`); // 성공 시
}).on('error', (err) => {
  console.error('서버 시작 실패:', err); // 실패 시
});

module.exports = app;
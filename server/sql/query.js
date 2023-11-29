const query = {
  // 데이터베이스 생성
  createDatabase: "CREATE DATABASE IF NOT EXISTS svelte_service;",

  // 데이터베이스 사용
  useDatabase: "USE svelte_service",
  // 포스팅 테이블 생성
  createPostingTable: "CREATE TABLE IF NOT EXISTS posts (\
    id INT AUTO_INCREMENT PRIMARY KEY,\
    title VARCHAR(100) NOT NULL,\
    description TEXT,\
    category VARCHAR(30),\
    datetime DATETIME DEFAULT CURRENT_TIMESTAMP,\
    user_id INT\
  );",

  // 포스팅 데이터 저장
  insertPosting: "INSERT INTO posts (title, description, category, user_id) VALUES (?, ?, ?, ?)",
};

module.exports = query;
export default {
  // Database
  createDatabase: "CREATE DATABASE IF NOT EXISTS svelte_service",
  useDatabase: "USE svelte_service",
  
  // Account Table
  createAccountTable: "CREATE TABLE IF NOT EXISTS account_table (\
    id INT PRIMARY KEY AUTO_INCREMENT,\
    user_email VARCHAR(30) NOT NULL,\
    user_password VARCHAR(20) NOT NULL,\
    user_nickname VARCHAR(10),\
    user_desc TEXT,\
    user_image_source TEXT,\
    user_status TEXT\
  );",
  insertAccount: "INSERT INTO account_table\
    (user_email, user_password)\
    VALUES (?, ?)",
  deleteAccount: "DELETE FROM account_table WHERE user_email = '?'",

  searchAccount_1: "SELECT * FROM account_table WHERE user_email = ? AND user_password = ?;",

  createPostingTable: "CREATE TALE IF NOT EXISTS posting_table (\
    id INT PRIMARY KEY AUTO_INCREMENT,\
    user_email VARCHAR(30) NOT NULL,\
    title TEXT NOT NULL,\
    datetime DATETIME DEFAULT UTC_TIMESTAMP(),\
    description TEXT NOT NULL\
    );",

  insertPosting: "INSERT INTO posting_table\
  (user_email, title, description) VALUES (?, ?, ?)",

  deletePosting: "DELETE FROM posting_table WHERE id = '?'"
}


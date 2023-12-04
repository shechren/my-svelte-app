import { createPool } from 'mariadb';
import query from '$routes/sql';

export const POST = async ({request}) => {
  const body = await request.json()
  const { title, description, id } = body;
  const [email, domain, password] = id.split('-');

  const fullEmail = `${email}@${domain}.com`;
  console.log(fullEmail)
  console.log(password)

  const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'test1234',
    port: 5000,
    database: 'svelte_service',
  });

  const connection = await pool.getConnection();
  await connection.query(query.createDatabase);
  await connection.query(query.useDatabase);
  await connection.query(query.createPostingTable);
  const [result] = await connection.query(query.insertPosting, [, description]);
  await connection.release();
  await pool.end();

}
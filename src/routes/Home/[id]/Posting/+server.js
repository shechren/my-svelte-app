import { createPool } from 'mariadb';
import query from '$routes/sql';

export const POST = async ({request}) => {
  const body = await request.json()
  const { category, title, description, user_id } = body;
  const [email, domain, password] = user_id.split('-');

  const fullEmail = `${email}@${domain}.com`;

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
  const [result] = await connection.query(query.insertPosting, [[category], [fullEmail], [password], [title], [description]]);
  await connection.release();
  await pool.end();

  if (result.length > 0) {
    return new Response(JSON.stringify({status: 200}))
  } else {
    return new Response(JSON.stringify({status: 401}))
  }
}
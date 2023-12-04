import { createPool } from 'mariadb';
import query from '$routes/sql';

export const GET = async () => {
  console.log("check")
  try {
    const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'test1234',
    port: 5000,
    database: 'svelte_service',
  });

  const connection = await pool.getConnection();
  await connection.query(query.useDatabase)
  const result = await connection.query(query.selectPosting, ['coding']);
  await connection.release();
  await pool.end();
  if (result) {
    return new Response(JSON.stringify(result));
  } else {
    return new Response(JSON.stringify({status: 401}))
  }
  } catch (err) {
    return new Response(JSON.stringify({status: 503}))
  }
}
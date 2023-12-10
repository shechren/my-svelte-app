import { createPool } from 'mariadb';
import query from '$routes/sql';

export const actions = {
  default: async (request) => {
  try {
    const { email, password } = request.body;

    const pool = createPool({
      host: 'localhost',
      user: 'root',
      password: 'test1234',
      port: 5000,
      database: 'svelte_service',
    });

    const connection = await pool.getConnection();
    const [result] = await connection.query(query.searchAccount_1, [email, password]);
    await connection.release();
    await pool.end();

    if (result.length > 0) {
      return new Response(JSON.stringify({status: 200}))
    } else {
      return new Response(JSON.stringify({status: 401}))
    }
  } catch (error) {
    console.error('Error in login endpoint:', error);
    return new Response(JSON.stringify({status: 500}))
  }}
};
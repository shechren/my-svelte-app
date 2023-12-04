import { createPool } from 'mariadb';
import query from '$routes/sql';

export const actions = 
 { create: async ({request}) => {
  try {
    const body = await request.formData();
    const email = body.get('email')
    const password = body.get('password')

    const pool = createPool({
      host: 'localhost',
      user: 'root',
      password: 'test1234',
      port: 5000,
      database: 'svelte_service'
    });
    const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    await pool.query(query.createDatabase);
    await pool.query(query.useDatabase);
    await pool.query(query.createAccountTable);
    await pool.query(query.insertAccount, [[email], [password]]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw new Error(error)
  } finally {
    await connection.release();
    await pool.end();
  }
    return {
      success: true
    }}
    catch (err) {
    return err
  }
}}
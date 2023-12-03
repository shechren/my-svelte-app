import { createPool } from 'mariadb';
import query from '$routes/sql';

export const actions = {
  default: async (event) => {
    try {
      const body = await event.request.formData();
      const data = Object.fromEntries(body)
      
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
      await pool.query(query.insertAccount, [[data.email], [data.password]]);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error(error);
    } finally {
      await connection.release();
      await pool.end();
    }
      return {
        status: 200,
        body: { message: 'Successfully processed the request.' },
      };
    } catch (error) {
      console.error('Error in post action:', error);

      return {
        status: 500,
        body: { message: 'Internal server error.' },
      };
    }
  }
}
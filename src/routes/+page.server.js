import { createPool } from 'mariadb';
import query from '$routes/sql';

export const actions = 
 { login: async ({request}) => {
  try {
    const body = await request.formData();
    const email = body.get('email')
    const password = body.get('password')
    let result = ''

    let addressEmail = email.replace('@', '?');

    addressEmail = addressEmail.replace('.com', '');

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
      result = await pool.query(query.searchAccount_1, [[email], [password]]);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw new Error('database error')
    } finally {
      await connection.release();
      await pool.end();
    }

  
    if (email==='test' && password==='test1234') {
      return {
        type: 'success',
        code: 'owner' + '-' + addressEmail + '-' + password
      }
    } else if (result.length > 0) {
      return {
        type: 'success',
        code: addressEmail + '-' + password
      }
    } else {
      throw new Error('result error')
    }
  } catch (err) {
   
  }
 } 
}
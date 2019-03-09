const pool = require('./postgresConnection.js');

const fetchPhotos= (id)  => {
  (async () => {
    const client = await pool.connect()
    try {
      const res = await client.query('SELECT * FROM photos WHERE id = $1', [id])
      console.log(res)
      return res;
    } finally {
      client.release()
    }
  })().catch(e => console.log(e.stack))
}

module.exports = fetchPhotos;
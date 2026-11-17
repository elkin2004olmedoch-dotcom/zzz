// Raw pg pool for graceful shutdown. Its connection string comes from the
// service's database dependency, never from environment variables.
const service = require('../../service.mjs').default;
const { Pool } = require('pg');

const { db } = service.load();

const pool = new Pool({
  connectionString: db.url,
  max: 1,
  idleTimeoutMillis: 10000,
});

module.exports = pool;

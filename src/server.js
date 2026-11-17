const service = require('../service.mjs').default;
const app = require('./app');
const pool = require('./config/db');

const port = service.port();
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`API de productos escuchando en el puerto ${port}`);
});

async function shutdown() {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

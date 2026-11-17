// Prisma ORM 8 model accessor. On Compute it comes from the service's
// database dependency, wired in service.mjs; queries read orm.public.<Model>.
const service = require('../../service.mjs').default;

const { db } = service.load();

module.exports = db.client.orm;

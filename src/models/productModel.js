const orm = require('../config/prisma');

const productFields = ['id', 'nombre', 'categoria', 'pvp'];

function normalizeProduct(product) {
  if (!product) return null;
  return {
    ...product,
    pvp: Number(product.pvp),
  };
}

async function findAll({ limit, offset }) {
  const [{ total }, products] = await Promise.all([
    orm.public.Producto.aggregate((aggregate) => ({ total: aggregate.count() })),
    orm.public.Producto
      .select(...productFields)
      .orderBy((producto) => producto.id.asc())
      .limit(limit)
      .offset(offset)
      .all(),
  ]);

  return {
    total,
    products: products.map(normalizeProduct),
  };
}

async function findById(id) {
  const product = await orm.public.Producto
    .select(...productFields)
    .first({ id });

  return normalizeProduct(product);
}

async function create({ nombre, categoria, pvp }) {
  const product = await orm.public.Producto
    .select(...productFields)
    .create({ nombre, categoria, pvp });

  return normalizeProduct(product);
}

async function replace(id, { nombre, categoria, pvp }) {
  const product = await orm.public.Producto
    .where({ id })
    .select(...productFields)
    .update({ nombre, categoria, pvp });

  return normalizeProduct(product);
}

async function update(id, fields) {
  const data = {};

  for (const [field, value] of Object.entries(fields)) {
    data[field] = value;
  }

  const product = await orm.public.Producto
    .where({ id })
    .select(...productFields)
    .update(data);

  return normalizeProduct(product);
}

async function remove(id) {
  const product = await orm.public.Producto
    .select('id')
    .where({ id })
    .delete();

  return product;
}

module.exports = { findAll, findById, create, replace, update, remove };

const prisma = require('../config/prisma');

const productSelect = {
  id: true,
  nombre: true,
  categoria: true,
  pvp: true,
};

function normalizeProduct(product) {
  if (!product) return null;
  return {
    ...product,
    pvp: Number(product.pvp),
  };
}

async function findAll({ limit, offset }) {
  const [total, products] = await Promise.all([
    prisma.producto.count(),
    prisma.producto.findMany({
      select: productSelect,
      orderBy: { id: 'asc' },
      take: limit,
      skip: offset,
    }),
  ]);

  return {
    total,
    products: products.map(normalizeProduct),
  };
}

async function findById(id) {
  const product = await prisma.producto.findUnique({
    where: { id },
    select: productSelect,
  });

  return normalizeProduct(product);
}

async function create({ nombre, categoria, pvp }) {
  const product = await prisma.producto.create({
    data: { nombre, categoria, pvp },
    select: productSelect,
  });

  return normalizeProduct(product);
}

async function replace(id, { nombre, categoria, pvp }) {
  try {
    const product = await prisma.producto.update({
      where: { id },
      data: { nombre, categoria, pvp },
      select: productSelect,
    });

    return normalizeProduct(product);
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

async function update(id, fields) {
  const data = {};

  for (const [field, value] of Object.entries(fields)) {
    data[field] = value;
  }

  try {
    const product = await prisma.producto.update({
      where: { id },
      data,
      select: productSelect,
    });

    return normalizeProduct(product);
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

async function remove(id) {
  try {
    const product = await prisma.producto.delete({
      where: { id },
      select: { id: true },
    });

    return product;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

module.exports = { findAll, findById, create, replace, update, remove };
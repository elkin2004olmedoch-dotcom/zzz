const productModel = require('../models/productModel');

async function getAll(req, res, next) {
  try {
    const { total, products } = await productModel.findAll(req.pagination);
    res.json({
      page: req.pagination.page,
      limit: req.pagination.limit,
      total,
      totalPages: Math.ceil(total / req.pagination.limit),
      products,
    });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const product = await productModel.findById(req.productId);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado.' });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

async function replace(req, res, next) {
  try {
    const product = await productModel.replace(req.productId, req.body);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado.' });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const product = await productModel.update(req.productId, req.body);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado.' });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const product = await productModel.remove(req.productId);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado.' });
    res.status(200).json({ mensaje: 'Producto eliminado.', id: product.id });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAll, getById, create, replace, update, remove };
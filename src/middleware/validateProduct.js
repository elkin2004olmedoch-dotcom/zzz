const fields = ['nombre', 'categoria', 'pvp'];

function validateProduct({ partial = false } = {}) {
  return (req, res, next) => {
    const body = req.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return res.status(400).json({ error: 'El cuerpo debe ser un objeto JSON.' });
    }

    const keys = Object.keys(body);
    const unknown = keys.filter((key) => !fields.includes(key));
    if (unknown.length) {
      return res.status(400).json({ error: `Campos no permitidos: ${unknown.join(', ')}.` });
    }
    if (partial && keys.length === 0) {
      return res.status(400).json({ error: 'Envía al menos un campo para actualizar.' });
    }

    const required = partial ? keys : fields;
    for (const field of required) {
      if (!Object.hasOwn(body, field)) {
        return res.status(400).json({ error: `El campo ${field} es obligatorio.` });
      }
      if (field === 'nombre' || field === 'categoria') {
        if (typeof body[field] !== 'string' || !body[field].trim()) {
          return res.status(400).json({ error: `${field} debe ser texto no vacío.` });
        }
        body[field] = body[field].trim();
        if (body[field].length > 100) {
          return res.status(400).json({ error: `${field} no puede superar 100 caracteres.` });
        }
      } else if (typeof body[field] !== 'number' || !Number.isFinite(body[field]) || body[field] < 0) {
        return res.status(400).json({ error: 'pvp debe ser un número no negativo.' });
      }
    }

    next();
  };
}

function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ error: 'El id debe ser un entero positivo.' });
  }
  req.productId = id;
  next();
}

function validatePagination(req, res, next) {
  const page = req.query.page === undefined ? 1 : Number(req.query.page);
  const limit = req.query.limit === undefined ? 100 : Number(req.query.limit);

  if (!Number.isSafeInteger(page) || page < 1) {
    return res.status(400).json({ error: 'page debe ser un entero positivo.' });
  }
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) {
    return res.status(400).json({ error: 'limit debe ser un entero entre 1 y 100.' });
  }

  const offset = (page - 1) * limit;
  if (!Number.isSafeInteger(offset)) {
    return res.status(400).json({ error: 'page está fuera del rango permitido.' });
  }

  req.pagination = { page, limit, offset };
  next();
}

module.exports = { validateProduct, validateId, validatePagination };
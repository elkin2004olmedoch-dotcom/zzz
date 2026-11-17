function notFound(req, res) {
  res.status(404).json({ error: 'Ruta no encontrada.' });
}

function errorHandler(error, req, res, next) {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'El cuerpo JSON no es válido.' });
  }
  console.error(error);
  if (res.headersSent) return next(error);
  res.status(500).json({ error: 'Error interno del servidor.' });
}

module.exports = { notFound, errorHandler };
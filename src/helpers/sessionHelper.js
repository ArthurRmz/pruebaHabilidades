
const auth = function(req, res, next) {
  if (req.session && req.session.ingreso)
    return next();
  else
    return res.sendStatus(401);
};
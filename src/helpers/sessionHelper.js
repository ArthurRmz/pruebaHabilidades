const auth = function(req, res, next) {
  if (req.session && req.session.id_usuario && req.session.ingreso){
    return next();
  }else{
    return res.render('pages/error');
  }
};

module.exports = {
  auth
};
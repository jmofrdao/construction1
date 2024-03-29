function requireUser(req, res, next) {
    if (!req.user) {
      res.status(401);
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
  
    next();
  }

  function requireSeller(req, res, next) {
    console.log(req.seller)
    if (!req.seller) {
      res.status(401);
      next({
        name: "MissingSellerError",
        message: "You must be logged in to perform this action"
      });
    }
  
    next();
  }
  

  module.exports = {requireUser, requireSeller}
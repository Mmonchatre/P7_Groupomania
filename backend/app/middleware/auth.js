const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    
    /* parseInt ajouté car req.body.userId est une chaine et pas 
    un entier dans Postman */
    if (req.body.userId && parseInt(req.body.userId) !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
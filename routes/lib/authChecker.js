const jwt = require("jsonwebtoken");
const mongoDBErrorHelper = require("./mongoDBErrorHelper");

const checkIfUserHasValidJwtToken = async (req, res, next) => {
    // console.log(5)
  try {
    if (req.headers && req.headers.authorization) {

      let jwtToken = req.headers.authorization.slice(7);

      let decodedJWT = jwt.verify(jwtToken, process.env.JWT_SECRET);

      if (decodedJWT) {
        next();
      }
    } else {
      throw { message: "You don't have permission, please login." };
    }
  } catch (e) {
    res.status(500).json(mongoDBErrorHelper(e));
  }
};

module.exports = {
  checkIfUserHasValidJwtToken,
};

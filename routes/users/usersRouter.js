var express = require('express');
var router = express.Router();
var { signUp, login } = require('./controller/userController')
var { checkIfEmptyMiddleware, checkForSymbolMiddleware, checkLoginIsEmpty } = require('../lib/validator');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/sign-up", 
checkIfEmptyMiddleware, 
checkForSymbolMiddleware, 
signUp
);

router.post("/login",
checkLoginIsEmpty,
login)


module.exports = router;
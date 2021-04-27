const { isEmpty, isEmail, matches } = require("validator");
const mongoDBErrorHelper = require("./mongoDBErrorHelper");

const checkIfEmpty = (target) => {
  if (isEmpty(target)) {
    return true;
  } else {
    return false;
  }
};

const checkIfEmail = (target) => {
  if (isEmail(target)) {
    return true;
  } else {
    return false;
  }
};

// making sure the user is not inputting an empty string, and that the email is in the proper format.  brought in up top w validator
const checkIfEmptyMiddleware = (req, res, next) => {
  let errorObj = {};
  let checkedEmail = false;

  const { userName, firstName, lastName, email, password } = req.body;

  if (checkIfEmpty(userName)) {
    errorObj.userName = "User Name cannot be empty";
  }

  if (checkIfEmpty(firstName)) {
    errorObj.firstName = "First Name cannot be empty";
  }

  if (checkIfEmpty(lastName)) {
    errorObj.lastName = "Last Name cannot be empty";
  }

  if (checkIfEmpty(email)) {
    errorObj.email = "Email cannot be empty";
  }

  if (checkIfEmpty(password)) {
    errorObj.password = "Password cannot be empty";
  }

  if (!checkedEmail) {
    if (!checkIfEmail(email)) {
      errorObj.email = "It must be in email format!";
    }
  }

  if (Object.keys(errorObj).length > 0) {
    // res.render("sign-up", { error: errorObj });
    res.status(500).json(
      mondoDBErrorHelper({
        message: errorObj,
      })
    );
  } else {
    //It means go to the next function
    next();
  }
};

const checkForSymbol = (target) => {
  if (matches(target, /[!@#$%^&*()\[\],.?":;{}|<>]/g)) {
    return true;
  } else {
    return false;
  }
};

const checkForSymbolMiddleware = (req, res, next) => {
  let errorObj = {};
  let { firstName, lastName } = req.body;

  if (checkForSymbol(firstName)) {
    errorObj.firstName = "First Name cannot contain special characters. Please try again.";
  }

  if (checkForSymbol(lastName)) {
    errorObj.lastName = "Last Name cannot contain special characters. Please try again.";
  }

  if (Object.keys(errorObj).length > 0) {
    res.status(500).json(
      mongoDBErrorHelper({
        message: errorObj,
      })
    );
  } else {
    next();
  }
};

const checkLoginIsEmpty = (req, res, next) => {
  let errorObj = {};

  const { email, password } = req.body;

  if (checkIfEmpty(email)){
    errorObj.email = "Email cannot be empty";
  }
  if (checkIfEmpty(password)){
    errorObj.password = "Password cannot be empty";
  }
  if (Object.keys(errorObj).length > 0) {
    // res.render("sign-up", { error: errorObj });
    res.status(500).json(mongoDBErrorHelper({ message: errorObj }));
  } else {
    next();
  }
}

module.exports = {
  checkIfEmptyMiddleware,
  checkForSymbolMiddleware,
  checkLoginIsEmpty
};

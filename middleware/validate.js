const { BadRequestError, UnprocessableEntityError } = require('../utils/customErrors');

const validateName = (req, res, next) => {
  try {
    const { name } = req.query;

    // 1. Check for missing, undefined, or empty string (400 Bad Request)
    if (!name || name.trim() === "") {
      throw new BadRequestError("Missing or empty name parameter");
    }

    // 2. Check if name is purely numeric (422 Unprocessable Entity)
    if (!isNaN(name) && !isNaN(parseFloat(name))) {
      throw new UnprocessableEntityError("name is not a string");
    }

    // 3. Regex check for alphabetic characters (422 Unprocessable Entity)
    const nameRegex = /^[a-zA-Z\s\-]+$/; 
    if (!nameRegex.test(name)) {
      throw new UnprocessableEntityError("name must contain only alphabetic characters");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validateName };
const { fetchAndProcessGender } = require('../services/genderService');
const { BadRequestError, UnprocessableEntityError } = require('../utils/customErrors');

const classifyName = async (req, res, next) => {
  try {
    const { name } = req.query;

    // --- 1. VALIDATION LOGIC (Using Custom Error Classes) ---
    
    // Handle 400 Bad Request: Missing or empty
    if (!name || name.trim() === "") {
      throw new BadRequestError("Missing or empty name parameter");
    }

    // Handle 422 Unprocessable Entity: Not a string or a numeric string
    if (typeof name !== 'string' || !isNaN(name)) {
      throw new UnprocessableEntityError("name is not a string");
    }

    // --- 2. EXTERNAL API CALL & PROCESSING ---
    const result = await fetchAndProcessGender(name);

    // --- 3. EDGE CASE HANDLING ---
    if (result.noPrediction) {
      return res.status(200).json({
        status: "error",
        message: "No prediction available for the provided name"
      });
    }

    // --- 4. SUCCESS RESPONSE ---
    // The 'result' object already contains the renamed 'sample_size' 
    // and 'is_confident' logic from the service layer.
    return res.status(200).json({
      status: "success",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { classifyName };
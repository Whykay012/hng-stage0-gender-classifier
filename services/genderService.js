const axios = require('axios');
const { UpstreamError } = require('../utils/customErrors');


const fetchAndProcessGender = async (name) => {
  try {
    const GENDERIZE_URL = `https://api.genderize.io/?name=${name}`;
    

    const response = await axios.get(GENDERIZE_URL, { timeout: 4500 });
    
    const { gender, probability, count } = response.data;

    
    if (!gender || count === 0) {
      return { noPrediction: true };
    }

    // Structured Success Data
    return {
      name: name.toLowerCase(),
      gender,
      probability,
      sample_size: count, // Renamed 'count' to 'sample_size' per Stage 0 rules
      is_confident: probability >= 0.7 && count >= 100, // Confidence Logic
      processed_at: new Date().toISOString() // Real-time UTC ISO 8601
    };

  } catch (err) {
    
    throw new UpstreamError("Failed to fetch data from Genderize API");
  }
};

module.exports = { fetchAndProcessGender };
# 🧙‍♂️ Backend Wizard - Stage 0: API Integration

A high-performance Node.js API that integrates with the Genderize API to process name data with custom confidence logic and standardized error handling.

## 🚀 Live Endpoint
**Base URL:** `https://your-app-name.vercel.app`  
**Example Request:** `GET /api/classify?name=john`

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **HTTP Client:** Axios (for external API integration)
- **Deployment:** Vercel / Railway / Heroku

## ⚙️ Logic & Requirements
- **Data Transformation:** Renames `count` to `sample_size`.
- **Confidence Logic:** `is_confident` is `true` only if `probability >= 0.7` AND `sample_size >= 100`.
- **Timestamping:** Every response includes a real-time `processed_at` field in ISO 8601 UTC format.
- **CORS:** Fully enabled with `Access-Control-Allow-Origin: *` to allow grading script access.

## 📂 Project Structure
```text
├── controllers/
│   └── classifyController.js   # Main logic & response formatting
├── middleware/
│   └── validate.js             # 400 and 422 error handling
├── services/
│   └── genderService.js        # Genderize API integration
├── server.js                   # App entry point & CORS setup
└── package.json
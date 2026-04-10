const express = require('express');
const cors = require('cors');
const { apiLimiter } = require('./middleware/limiter'); // Import here
const classifyRoutes = require('./routes/classifyRoute');
const globalErrorHandler = require('./middleware/errorHandler');

const app = express();

// 1. Mandatory CORS
app.use(cors({ origin: '*' }));
app.use(express.json());

// 2. APPLY RATE LIMITER (Protect all routes)
app.use(apiLimiter);

// 3. Register Routes
app.use('/api', classifyRoutes);

// 4. Handle 404s (Routes that don't exist)
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found."
  });
});

// 4. Global Error Handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🧙‍♂️ Wizard API live with Rate Limiting on port ${PORT}`);
});
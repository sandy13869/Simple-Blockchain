// Load environment variables from .env file
require('dotenv').config();

// Initialize db
require('./src/config/db');

// Import required modules
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Create an Express application
const app = express();

// Define the port number
const port = process.env.PORT || 8000;

// Import routes
const tasksRoutes = require('./src/routes/index');

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Demo API',
      version: '1.0.0',
      description: 'API documentation portfolio',
    },
  },
  apis: ['./src/routes/*.js'], // Add other paths if needed
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes 
app.use('/api', tasksRoutes);

// Handling uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Perform cleanup tasks if needed
  process.exit(1); // Exit the process with a failure code
});

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
const server = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
  
  // Graceful Shutdown
  process.on('SIGINT', () => {
    console.log('Received SIGINT. Closing server gracefully.');
    // Close the server gracefully
    server.close(() => {
      console.log('Server closed.');
      process.exit(0); // Exit the process with a success code
    });
  });
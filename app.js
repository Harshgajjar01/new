const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000; // You can use any port you prefer

// Connection parameters
const connectionParams = {
  user: 'postgres',
  host: '192.168.1.200',
  database: 'LeaveApp',
  password: 'AdvEnt4pgSQL',
  port: 5432, // Default PostgreSQL portnode
};

// Create a new PostgreSQL client
const client = new Client(connectionParams);

// Connect to the database
client.connect();

// Define an API endpoint to fetch data
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM employee';

  // Execute the query
  client.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Send the result as JSON
    res.json(result.rows);
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

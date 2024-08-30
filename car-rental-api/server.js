require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors"); // Import the cors package

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// SQL Server configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

sql
  .connect(dbConfig)
  .then((pool) => {
    if (pool.connected) {
      console.log("Connected to SQL Server");

      // Create a new car
      app.post("/cars", async (req, res) => {
        const { Make, Model, Year, PricePerDay, AvailabilityStatus } = req.body;
        try {
          const result = await pool
            .request()
            .input("Make", sql.NVarChar, Make)
            .input("Model", sql.NVarChar, Model)
            .input("Year", sql.Int, Year)
            .input("PricePerDay", sql.Decimal(10, 2), PricePerDay)
            .input("AvailibilityStatus", sql.Bit, AvailabilityStatus) // Match the column name in SQL
            .query(
              "INSERT INTO dbo.CarsTable (Make, Model, Year, PricePerDay, AvailibilityStatus, CreatedDate, LastUpdatedDate) VALUES (@Make, @Model, @Year, @PricePerDay, @AvailibilityStatus, GETDATE(), GETDATE())"
            );

          res.status(201).send("Car registered successfully");
        } catch (err) {
          res.status(500).send("Error registering car: " + err);
        }
      });

      // Fetch all cars
      app.get("/cars", async (req, res) => {
        try {
          const pool = await sql.connect(dbConfig);
          const result = await pool
            .request()
            .query("SELECT * FROM dbo.CarsTable");
          res.status(200).json(result.recordset); // Send the list of cars to the client
        } catch (err) {
          res.status(500).send("Error fetching cars: " + err.message);
        }
      });

      // Update a car by ID
      app.put("/cars/:id", async (req, res) => {
        const { id } = req.params; // CarID from the URL
        const { Make, Model, Year, PricePerDay, AvailabilityStatus } = req.body; // Updated car data from the request body

        try {
          const pool = await sql.connect(dbConfig);
          await pool
            .request()
            .input("CarID", sql.Int, id)
            .input("Make", sql.NVarChar, Make)
            .input("Model", sql.NVarChar, Model)
            .input("Year", sql.Int, Year)
            .input("PricePerDay", sql.Decimal(10, 2), PricePerDay)
            .input("AvailibilityStatus", sql.Bit, AvailabilityStatus) // Fix typo to match SQL column
            .query(`UPDATE dbo.CarsTable 
                    SET Make = @Make, Model = @Model, Year = @Year, 
                        PricePerDay = @PricePerDay, AvailibilityStatus = @AvailibilityStatus, LastUpdatedDate = GETDATE()
                    WHERE CarID = @CarID`);

          res.status(200).send("Car updated successfully");
        } catch (err) {
          res.status(500).send("Error updating car: " + err.message);
        }
      });

      // Delete a car by ID
      app.delete("/cars/:id", async (req, res) => {
        const { id } = req.params; // Get CarID from the URL

        try {
          const pool = await sql.connect(dbConfig);
          await pool
            .request()
            .input("CarID", sql.Int, id)
            .query("DELETE FROM dbo.CarsTable WHERE CarID = @CarID");

          res.status(200).send("Car deleted successfully");
        } catch (err) {
          res.status(500).send("Error deleting car: " + err.message);
        }
      });

      // Start the server
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    }
  })
  .catch((err) => console.error("Database connection failed: ", err));

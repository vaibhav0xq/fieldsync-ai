require("dotenv").config();
const express = require("express");
const app = express();

const reportRoutes = require("./routes/reportRoutes");

const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("FieldSync AI backend is running");
});

app.use("/api", reportRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
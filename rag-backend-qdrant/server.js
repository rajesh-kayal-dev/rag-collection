import express from "express";
import textRoutes from "./routes/textRoutes.js";
import queryRoutes from "./routes/queryRoutes.js";
import { createCollection } from "./config/qdrant.js";

const app = express();

app.use(express.json());

app.use("/api", textRoutes);
app.use("/api", queryRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await createCollection();
});
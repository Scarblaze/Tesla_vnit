// server/index.js
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import express from "express";
import { projects, council, achievements, gallery } from "./data.js";
import cloudinary from "./config/cloudinary.js";
import uploadRoutes from "./routes/uploadRoutes.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use("/api/upload", uploadRoutes);

// Serve static files from public directory
app.use("/assets", express.static(path.join(__dirname, "../public/assets")));

const PORT = process.env.PORT || 4000;

// API Routes
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.get("/api/council", (req, res) => {
  res.json(council);
});

app.get("/api/achievements", (req, res) => {
  res.json(achievements);
});

app.get("/api/gallery", (req, res) => {
  res.json(gallery);
});




// Serve static frontend files from client/dist
const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist, { extensions: ["html", "js", "css"] }));

// Fallback to index.html for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});


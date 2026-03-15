// server/index.js

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { projects, council, achievements, gallery } from "./data.js";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// ===== SIMPLE CORS (optional) =====
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ===== SERVE STATIC IMAGES =====
app.use(
  "/assets",
  express.static(path.join(__dirname, "../public/assets"))
);

// ===== API ROUTES =====

app.get("/api/projects", (req, res) => res.json(projects));
app.get("/api/council", (req, res) => res.json(council));
app.get("/api/achievements", (req, res) => res.json(achievements));
app.get("/api/gallery", (req, res) => res.json(gallery));

// ===== SERVE FRONTEND =====
// IMPORTANT: your build output is dist/ at root

const distPath = path.join(__dirname, "..", "dist");

app.use(express.static(distPath));

// SPA fallback for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ===== START SERVER =====

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
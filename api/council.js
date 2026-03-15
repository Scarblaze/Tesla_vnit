import { council } from "../data.js";

export default function handler(req, res) {
  res.status(200).json(council);
}
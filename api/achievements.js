import { achievements } from "../data.js";

export default function handler(req, res) {
  res.status(200).json(achievements);
}
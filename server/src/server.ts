import express, { Request, Response } from "express";

const app = express();

app.get("/games", (req, res) => {
  return res.json([]);
});

app.post("/ads", (req, res) => {
  return res.status(201).json([]);
});

app.get("/games/:id/ads", (req, res) => {
  const gameId = req.params.id;

  return res.send(gameId);
});

app.get("/games/:id/discord", (req, res) => {
  const gameId = req.params.id;

  return res.json([]);
});

app.listen(3333, () => {
  console.log("rodando na 3333");
});

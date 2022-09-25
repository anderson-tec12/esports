import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

// conexão com banco ativa
const prismaClient = new PrismaClient({
  log: ["query"],
});

app.get("/games", async (req, res) => {
  const games = await prismaClient.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return res.json(games);
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

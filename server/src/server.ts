import express, { Request, Response } from "express";
import { prisma, PrismaClient } from "@prisma/client";

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

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prismaClient.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourEnd: true,
      hourStart: true,
    },
    where: {
      gameId: gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
      };
    })
  );
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const ad = await prismaClient.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.json({
    discord: ad,
  });
});

app.listen(3333, () => {
  console.log("rodando na 3333");
});

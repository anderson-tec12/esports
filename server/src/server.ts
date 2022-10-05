import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hours-string-to-minutes";
import { convertMinutesToHoursString } from "./utils/convert-minutes-to-hours-string";

const app = express();

app.use(express.json());
app.use(cors());

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

app.post("/games/:gameId/ads", async (req, res) => {
  const gameId = req.params.gameId;
  const body: any = req.body;

  const ad = await prismaClient.ad.create({
    data: {
      gameId,
      name: body.name,
      weekDays: body.weekDays.join(","),
      useVoiceChannel: body.useVoiceChannel,
      yearsPlaying: body.yearsPlaying,
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      hourStart: convertHourStringToMinutes(body.hourStart),
      discord: body.discord,
    },
  });

  return res.status(201).json(ad);
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
        hourEnd: convertMinutesToHoursString(ad.hourEnd),
        hourStart: convertMinutesToHoursString(ad.hourStart),
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

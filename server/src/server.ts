import express, { Request, Response } from "express";

const app = express();

app.get("/", (req, res) => {
  return res.json([
    { id: 1, name: "Anuncio 1" },
    { id: 2, name: "Anuncio 2" },
    { id: 3, name: "Anuncio 3" },
    { id: 4, name: "Anuncio 4" },
    { id: 5, name: "Anuncio 5" },
  ]);
});

app.listen(3333, () => {
  console.log("rodando na 3333");
});

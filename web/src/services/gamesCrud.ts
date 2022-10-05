import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.15.5:3333",
});

export type PropsCreateADS = {
  gameId: string;
  name: string;
  weekDays: number[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourEnd: string;
  hourStart: string;
  discord: string;
};

export function createADS({ gameId, ...props }: PropsCreateADS) {
  return API.post(`/games/${gameId}/ads`, {
    ...props,
  });
}

export function ListGames() {
  return API.get("games");
}

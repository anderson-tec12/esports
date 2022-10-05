import * as Dialog from "@radix-ui/react-dialog";

import { useEffect, useState } from "react";

import "./styles/main.css";
import Logo from "./assets/logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAtBanner } from "./components/CreatAtBanner";
import { CreatAtModal } from "./components/CreatAtModal";
import { ListGames } from "./services/gamesCrud";

type GameProps = {
  bannerUrl: string;
  id: string;
  title: string;
  _count: { ads: number };
};

function App() {
  const [listGames, setListGames] = useState<GameProps[]>([]);
  useEffect(() => {
    ListGames().then((data) => setListGames(data.data));
  }, []);
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={Logo} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {listGames.map((game) => (
          <GameBanner
            key={game.id}
            adsCount={game._count.ads}
            bannerUrl={game.bannerUrl}
            title={game.title}
          />
        ))}
        {/* <GameBanner /> */}
      </div>

      <Dialog.Root>
        <CreateAtBanner />
        <CreatAtModal />
      </Dialog.Root>
    </div>
  );
}

export default App;

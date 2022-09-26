import React, { useEffect, useState } from "react";
import { View, Image, FlatList } from "react-native";

import Logo from "../../assets/logo.png";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";

import { styles } from "./styles";

type GameProps = {
  bannerUrl: string;
  id: string;
  title: string;
  _count: { ads: number };
};

export function Home() {
  const [listGames, setListGames] = useState<GameProps[]>([]);
  useEffect(() => {
    fetch("http://192.168.15.5:3333/games")
      .then((res) => res.json())
      .then((data) => setListGames(data));
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />

      <Heading
        title="Encontre seu duo"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={listGames}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}

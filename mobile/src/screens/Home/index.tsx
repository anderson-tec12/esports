import React, { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/logo.png";
import { Background } from "../../components/Background";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

type GameProps = {
  bannerUrl: string;
  id: string;
  title: string;
  _count: { ads: number };
};

export function Home() {
  const [listGames, setListGames] = useState<GameProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({ bannerUrl, id, title }: GameProps) {
    navigation.navigate("game", {
      bannerUrl,
      id,
      title,
    });
  }

  useEffect(() => {
    fetch("http://192.168.15.5:3333/games")
      .then((res) => res.json())
      .then((data) => setListGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={Logo} style={styles.logo} />

        <Heading
          title="Encontre seu duo"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={listGames}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}

import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity, View, Image, FlatList, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Background } from "../../components/Background";
import LogoImg from "../../assets/logo.png";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { DuoCart, DuoCartProps } from "../../components/DuoCart";
import { DuoMatch } from "../../components/DuoMatch";

interface RouteParams {
  id: string;
  title: string;
  bannerUrl: string;
}

export function Game() {
  const route = useRoute();
  const navigation = useNavigation();
  const game = route.params as RouteParams;

  const [duos, setDuos] = useState<DuoCartProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.15.5:3333/ads/${adsId}/discord`)
      .then((res) => res.json())
      .then((res) => setDiscordDuoSelected(res.discord.discord));
  }

  useEffect(() => {
    fetch(`http://192.168.15.5:3333/games/${game.id}/ads`)
      .then((res) => res.json())
      .then((res) => setDuos(res));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={LogoImg} style={styles.logo} />
          <View style={styles.right}></View>
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="contain"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <DuoCart data={item} onConnect={() => getDiscordUser(item.id)} />
            );
          }}
          contentContainerStyle={[
            duos.length === 0
              ? {
                  justifyContent: "center",
                  flex: 1,
                  alignItems: "center",
                }
              : styles.contentList,
          ]}
          style={[styles.containerList]}
          ListEmptyComponent={() => {
            return <Text style={styles.emptyListText}>Não há anuncios</Text>;
          }}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => {
            setDiscordDuoSelected("");
          }}
        />
      </SafeAreaView>
    </Background>
  );
}

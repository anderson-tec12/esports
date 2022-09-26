import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity, View, Image } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Background } from "../../components/Background";
import LogoImg from "../../assets/logo.png";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";

interface RouteParams {
  id: string;
  title: string;
  bannerUrl: string;
}

export function Game() {
  const route = useRoute();
  const navigation = useNavigation();
  const game = route.params as RouteParams;

  function handleGoBack() {
    navigation.goBack();
  }

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
      </SafeAreaView>
    </Background>
  );
}

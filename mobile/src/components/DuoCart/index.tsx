import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { THEME } from "../../theme";
import { DuoInfo } from "../DuoInfo";
import { GameController } from "phosphor-react-native";

import { styles } from "./styles";

export interface DuoCartProps {
  id: string;
  name: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourEnd: string;
  hourStart: string;
}

interface Props {
  data: DuoCartProps;
  onConnect(): void;
}

export function DuoCart({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="nome" value={data.name} />
      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dia(s) \u2022 ${data.hourStart} - ${data.hourEnd} `}
      />
      <DuoInfo
        label="Chamada de audio"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}> Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}

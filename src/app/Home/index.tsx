import { View, Image, Button, TouchableOpacity, Text, Alert } from 'react-native';
import { PrimaryButton } from '@/components/PrimaryButton'

import { styles } from './styles'

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")}/>
      <PrimaryButton title='Confirmar' onPress={() => {Alert.alert("Intersection test message")}}/>
    </View>
  );
}



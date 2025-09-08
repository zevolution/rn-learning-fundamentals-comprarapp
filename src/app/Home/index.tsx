import { View, Image, Alert } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton'
import { PrimaryInput } from '@/components/PrimaryInput'

import { styles } from './styles'

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")}/>
      <PrimaryInput placeholder='Qual a boa pra hoje?'/>
      <PrimaryButton title='Confirmar' onPress={() => {Alert.alert("Intersection test message")}}/>
    </View>
  );
}



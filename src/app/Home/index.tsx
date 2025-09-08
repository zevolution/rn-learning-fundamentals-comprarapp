import { View, Image, Button, TouchableOpacity, Text } from 'react-native';

import { styles } from './styles'

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")}/>
      <Button title='Confirmar with Button' />
      <TouchableOpacity>
        <Text>Confirmar with Touchable Opacity</Text>
      </TouchableOpacity>
    </View>
  );
}



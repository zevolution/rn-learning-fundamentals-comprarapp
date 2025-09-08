import { View, Image, Alert } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton'
import { PrimaryInput } from '@/components/PrimaryInput'
import { PrimaryContentFilter } from '@/components/PrimaryContentFilter';

import { FilterStatus } from '@/types/FilterStatus';

import { styles } from './styles'

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")}/>

      <View style={styles.form}>
        <PrimaryInput placeholder='Qual a boa pra hoje?'/>
        <PrimaryButton title='Confirmar' onPress={() => {Alert.alert("Intersection test message")}}/>
      </View>

      <View style={styles.content}>
        <PrimaryContentFilter isActive={false} status={FilterStatus.PENDING} />
        <PrimaryContentFilter isActive={true} status={FilterStatus.DONE} />
      </View>
    </View>
  );
}



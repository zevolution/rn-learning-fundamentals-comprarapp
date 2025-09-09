import { View, Image, Alert, TouchableOpacity, Text } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton'
import { PrimaryInput } from '@/components/PrimaryInput'
import { PrimaryContentFilter } from '@/components/PrimaryContentFilter';

import { FilterStatus } from '@/types/FilterStatus';

import { styles } from './styles'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")}/>

      <View style={styles.form}>
        <PrimaryInput placeholder='Qual a boa pra hoje?'/>
        <PrimaryButton title='Confirmar' onPress={() => {Alert.alert("Intersection test message")}}/>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <PrimaryContentFilter key={status} isActive status={status} />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}



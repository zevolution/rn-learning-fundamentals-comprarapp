import { View, Image, Alert, TouchableOpacity, Text, FlatList } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton'
import { PrimaryInput } from '@/components/PrimaryInput'
import { PrimaryContentFilter } from '@/components/PrimaryContentFilter';

import { FilterStatus } from '@/types/FilterStatus';

import { styles } from './styles'
import { PurchaseItem } from '@/components/PurchaseItem';

const getRandomId = (): string => Math.random().toString(36).substring(2);

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

const generatePurchaseItem = (): any => {
  return {
    id: getRandomId(),
    description: `${Math.floor(Math.random() * 100) + 1} pacotes de alguma coisa`,
    status: FilterStatus.PENDING
  }
}

const PURCHASE_ITEMS: any[] = Array.from({ length: 15 }, generatePurchaseItem)

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

        <FlatList
          data={PURCHASE_ITEMS}
          renderItem={({ item }) => (
            <PurchaseItem
              key={item.id}
              data={item}
              onPress={() => Alert.alert(`O item \n '${item.description}' \n foi pressionado`)}
              onRemove={() => Alert.alert(`A lixeira do item \n '${item.description}' \n foi pressionada`)}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          ItemSeparatorComponent={() => <View style={styles.contentListItemSeparator}/>}
        />

      </View>
    </View>
  );
}

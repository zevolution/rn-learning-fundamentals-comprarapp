import { View, Image, Alert, TouchableOpacity, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react'

import { PrimaryButton } from '@/components/PrimaryButton'
import { PrimaryInput } from '@/components/PrimaryInput'
import { PrimaryContentFilter } from '@/components/PrimaryContentFilter';
import { PurchaseItem } from '@/components/PurchaseItem';

import { FilterStatus } from '@/types/FilterStatus';

import { purchaseItemsStorage } from '@/storage/purchaseItemsStorage'

import { styles } from './styles'

const getRandomId = (): string => Math.random().toString(36).substring(2);

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export default function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [input, setInput] = useState("")
  const [items, setItems] = useState<any>([])

  async function handleAddPurchaseItem() {
    if (!input.trim()) return Alert.alert("Adicionar", "Pra inserir um item adicione uma breve descrição")

    const newItem = {
      id: getRandomId(),
      description: input,
      status: FilterStatus.PENDING
    }

    await purchaseItemsStorage.add(newItem)
    await getItemsByStatus()

    setFilter(FilterStatus.PENDING)
    setInput("")
  }

  async function handleRemovePurchaseItem(itemToBeRemoved: any) {
    await purchaseItemsStorage.remove(itemToBeRemoved.id)
    await getItemsByStatus();
  }

  function handleClearPurchaseItems() {
    Alert.alert('Limpar', 'Deseja remover todos os itens?',[
      { text: 'Não', style: 'cancel' },
      { text: 'Sim' , onPress: () => handleClearPurchaseItemsFromStorage()}
    ])
  }

  async function handleClearPurchaseItemsFromStorage() {
    try {
      await purchaseItemsStorage.clear()
      setItems([])
    } catch (error) {
      console.log(error)
      Alert.alert("Limpar", "Não foi possível limpar todos os itens.")
    }
  }

  async function handleTogglePurchaseItemStatus(itemToBeCompleted: any) {
    await purchaseItemsStorage.toggleStatus(itemToBeCompleted.id)
    await getItemsByStatus()
  }

  async function getItemsByStatus() {
    const items = await purchaseItemsStorage.getByStatus(filter)
    setItems(items)
  }

  useEffect(() => {
    getItemsByStatus()
  }, [filter])

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")}/>

      <View style={styles.form}>
        <PrimaryInput placeholder='Qual a boa pra hoje?' onChangeText={setInput} value={input}/>
        <PrimaryButton title='Confirmar' onPress={() => handleAddPurchaseItem()}/>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <PrimaryContentFilter 
              key={status}
              isActive={filter === status}
              status={status}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={() => handleClearPurchaseItems()}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          renderItem={({ item }) => (
            <PurchaseItem
              key={item.id}
              data={item}
              onPress={() => handleTogglePurchaseItemStatus(item)}
              onRemove={() => handleRemovePurchaseItem(item)}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          ItemSeparatorComponent={() => <View style={styles.contentListItemSeparator}/>}
          ListEmptyComponent={() => <Text style={styles.contentListEmpty}>Nenhum item adicionado até o momento</Text>}
        />

      </View>
    </View>
  );
}

import { View, Image, Alert, TouchableOpacity, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react'

import { PrimaryButton } from '@/components/PrimaryButton'
import { PrimaryInput } from '@/components/PrimaryInput'
import { PrimaryContentFilter } from '@/components/PrimaryContentFilter';
import { PurchaseItem } from '@/components/PurchaseItem';

import { FilterStatus } from '@/types/FilterStatus';

import { styles } from './styles'

const getRandomId = (): string => Math.random().toString(36).substring(2);

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

const REVERSE_STATUS: Record<FilterStatus, FilterStatus> = {
  [FilterStatus.PENDING]: FilterStatus.DONE,
  [FilterStatus.DONE]: FilterStatus.PENDING
}

const generatePurchaseItem = (): any => {
  return {
    id: getRandomId(),
    description: `${Math.floor(Math.random() * 100) + 1} pacotes de alguma coisa`,
    status: FilterStatus.PENDING
  }
}

const PURCHASE_ITEMS: any[] = Array.from({ length: 15 }, generatePurchaseItem)

export default function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [input, setInput] = useState("")
  const [items, setItems] = useState<any>([])
  const [itemsByActiveStatus, setItemsByActiveStatus] = useState<any>([])

  function handleAddPurchaseItem() {
    if (!input.trim()) return Alert.alert("Adicionar", "Pra inserir um item adicione uma breve descrição")

    const newItem = {
      id: getRandomId(),
      description: input,
      status: FilterStatus.PENDING
    }

    setItems((prevState: any) => [newItem, ...prevState])
    setFilter(FilterStatus.PENDING)

    setInput("")
  }

  function handleRemovePurchaseItem(itemToBeRemoved: any) {
    const updatedItems = items.filter((item: any) => item.id !== itemToBeRemoved.id)
    setItems(updatedItems)
  }

  function handleClearPurchaseItems() {
    Alert.alert('Limpar', 'Deseja remover todos os itens?',[
      { text: 'Não', style: 'cancel' },
      { text: 'Sim' , onPress: () => handleClearPurchaseItemsFromStorage()}
    ])
  }

  function handleClearPurchaseItemsFromStorage() {
    setItems([])
  }

  function handlePurchaseItem(itemToBeCompleted: any) {
    const updatedItems = items.map((item: any) =>
      item.id === itemToBeCompleted.id
        ? { ...item, status: REVERSE_STATUS[item.status] }
        : item
    );
    setItems(updatedItems)
  }

  function getItemsByStatus() {
    const itemsByStatus = items.filter((item: any) => item.status === filter)
    setItemsByActiveStatus(itemsByStatus)
  }

  useEffect(() => {
    getItemsByStatus()
  }, [filter, items])

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
          data={itemsByActiveStatus}
          renderItem={({ item }) => (
            <PurchaseItem
              key={item.id}
              data={item}
              onPress={() => handlePurchaseItem(item)}
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

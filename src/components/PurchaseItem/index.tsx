import { View, TouchableOpacity, Text } from "react-native";

import { CircleCheck, CircleDashed, Trash2 } from 'lucide-react-native'

import { FilterStatus } from "@/types/FilterStatus";

import { styles } from './styles';

type PurchaseItemData = {
  status: FilterStatus,
  description: string
}

type PurchaseItemProps = {
  data: PurchaseItemData,
  onPress?: () => void;
  onRemove?: () => void;
}

export function PurchaseItem({ data }: PurchaseItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        { data.status === FilterStatus.DONE ? <CircleCheck /> : <CircleDashed /> }
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity>
        <Trash2 color='#828282'></Trash2>
      </TouchableOpacity>
    </View>
  )
}
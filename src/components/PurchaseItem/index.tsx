import { View, TouchableOpacity, Text } from "react-native";
import {  Trash2 } from 'lucide-react-native'

import { StatusIcon } from "@/components/StatusIcon";
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

export function PurchaseItem({ data, onPress, onRemove }: PurchaseItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <StatusIcon status={data.status}/>
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity onPress={onRemove}>
        <Trash2 color='#828282'></Trash2>
      </TouchableOpacity>
    </View>
  )
}
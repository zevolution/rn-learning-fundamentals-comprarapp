import { View, TouchableOpacity, Text } from "react-native";

import { CircleCheck, CircleDashed, Trash2 } from 'lucide-react-native'

import { FilterStatus } from "@/types/FilterStatus";

type PurchaseItemData = {
  status: FilterStatus,
  description: string
}

type PurchaseItemProps = {
  data: PurchaseItemData
}

export function PurchaseItem({ data }: PurchaseItemProps) {
  return (
    <View>
      <TouchableOpacity>
        { data.status === FilterStatus.DONE ? <CircleCheck /> : <CircleDashed /> }
      </TouchableOpacity>

      <Text>{data.description}</Text>

      <TouchableOpacity>
        <Trash2></Trash2>
      </TouchableOpacity>
    </View>
  )
}
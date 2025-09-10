import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { StatusIcon } from '../StatusIcon'

import { styles } from './styles'

import { FilterStatus } from '@/types/FilterStatus'

type PrimaryContentFilter  = TouchableOpacityProps & {
  status: FilterStatus,
  isActive: boolean
}

export function PrimaryContentFilter({status, isActive, ...rest}: PrimaryContentFilter) {
  return (
    <TouchableOpacity style={[styles.container, { opacity: isActive ? 1 : 0.5 }]} {...rest}>
      <StatusIcon status={status} />

      <Text style={styles.title}>
        { status === FilterStatus.DONE ? 'Comprado' : 'Pendente' }
      </Text>
    </TouchableOpacity>
  )
}
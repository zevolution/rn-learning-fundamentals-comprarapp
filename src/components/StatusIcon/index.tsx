import { CircleCheck, CircleDashed } from 'lucide-react-native'

import { FilterStatus } from '@/types/FilterStatus'

export function StatusIcon({ status }: { status: FilterStatus }) {
  return status === FilterStatus.DONE ? (
    <CircleCheck />
  ) : (
    <CircleDashed />
  )
}
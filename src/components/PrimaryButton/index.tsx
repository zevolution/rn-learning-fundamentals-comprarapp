import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles'

type PrimaryButtonProps = {
  title: string
}

export function PrimaryButton({title}: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Text style={styles.title}>{title || '*** New Button ***'}</Text>
    </TouchableOpacity>
  );
}
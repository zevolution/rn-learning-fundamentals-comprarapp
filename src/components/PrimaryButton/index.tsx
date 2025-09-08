import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles'

export function PrimaryButton() {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Text style={styles.title}>Confirmar</Text>
    </TouchableOpacity>
  );
}
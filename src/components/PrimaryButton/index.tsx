import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles'

export function PrimaryButton() {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>Confirmar</Text>
    </TouchableOpacity>
  );
}
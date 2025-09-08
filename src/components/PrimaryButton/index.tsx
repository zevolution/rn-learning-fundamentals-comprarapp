import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';

import { styles } from './styles'

type PrimaryButtonProps = TouchableOpacityProps & {
  title: string
}

export function PrimaryButton({title, ...rest}: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
      <Text style={styles.title}>{title || '*** New Button ***'}</Text>
    </TouchableOpacity>
  );
}
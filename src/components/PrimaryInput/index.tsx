import { TextInput, TextInputProps } from 'react-native'

import { styles } from './styles'

type PrimaryInputProps = TextInputProps & {

}

export function PrimaryInput({...rest}: PrimaryInputProps) {
  return (
    <TextInput style={styles.container} {...rest} />
  )
}
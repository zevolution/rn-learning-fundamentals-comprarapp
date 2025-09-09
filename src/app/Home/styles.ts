import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0d2d8',
    alignItems: 'center',
    paddingTop: 36,
  },
  form: {
    paddingHorizontal: 24,
    width: '100%',
    gap: 7,
    marginTop: 42
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    marginTop: 24
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E5EC',
    paddingBottom: 12
  },
  clearButton: {
    marginLeft: 'auto',
    justifyContent: 'center'
  },
  clearButtonText: {
    fontSize: 14,
    color: '#828282',
    fontWeight: '600',
  }
});
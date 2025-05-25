import appColors from '@/constants/appColors';
import { StyleSheet } from 'react-native';


export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },

  text: {
    fontSize: 14,
    color: appColors.text,
  },

  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    // minHeight: 56,
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },

  section: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D56F0',
    width: 30,
    height: 30,
    borderRadius: 100,
  },

  tag: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: appColors.white,
    borderRadius: 100,
    marginRight: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  iconLeft: {
    marginRight: 20,
    width: 30,
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginLeft: 70,
  },
});
import React, {FC} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import {SEARCH_ICON} from '../../Constants/Constants';

// Define SearchBarProps with onSUbmit function along with all TextInputProps
type SearchBarProps = TextInputProps & {
  onSubmit: () => void;
};
const SearchBar: FC<SearchBarProps> = ({onSubmit, ...props}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={'grey'}
        placeholder="Search"
        onSubmitEditing={onSubmit}
        {...props}
      />
      <TouchableOpacity onPress={onSubmit}>
        <Image style={styles.icon} source={{uri: SEARCH_ICON}} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    color: 'grey',
    borderColor: '#ccc',
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 10,
  },
  input: {
    flex: 1,
    color: 'grey',
  },
  icon: {
    width: 24,
    height: 24,
    margin: 10,
  },
});

export default SearchBar;

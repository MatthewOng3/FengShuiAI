import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, StatusBar } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';


const SelectionScreen = () => {
  const [inputText, setInputText] = useState('');
  const navigation = useNavigation();
  const [checkedItems, setCheckedItems] = useState(['Clothing',
  'Shoes',
  'Books',
  'Electronics',
  'Papers and Documents',
  'Containers and Packaging',
  'Furniture',
]);

  const items = [
    'Shoes',
    'Books',
    'Electronics',
    'Papers and Documents',
    'Containers and Packaging',
    'Furniture',
  ];

  const handleCheckboxChange = (item) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter((i) => i !== item));
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  return (
    <>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Select items to organise:</Text>
          <FlatList
            data={items}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <CheckBox
                containerStyle={styles.itemsContainer}
                title={item}
                checked={checkedItems.includes(item)}
                onPress={() => handleCheckboxChange(item)}
              />
            )}
          />
          <Button
            title="Proceed"
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('Tasks')}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#092223',
  },
  container: {
    flex: 1,
    backgroundColor: '#081515',
    padding: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    marginTop: 20,
    color: 'white',
    fontFamily: 'sans-serif-light',
  },
  itemsContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  // input: {
  //   height: 40,
  //   borderColor: 'red',
  //   borderWidth: 1,
  //   marginBottom: 10,
  //   paddingHorizontal: 10,
  // },
  button: {
    backgroundColor: '#00D19F',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default SelectionScreen;
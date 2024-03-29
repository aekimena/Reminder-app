import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Modal from 'react-native-modal';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome6';

import {TodosContext} from '../contexts/todosContext';

const AddTodoModal = ({
  todoNote,
  setTodoNote,
  saveNewTodo,
  editMode,
  setEditMode,
  setOpenDatePicker,
  alertProvided,
  dateString,
  setToDefault,
}) => {
  const colorScheme = useColorScheme();
  const themeColor = '#60B1D6';
  const currentTextColor = colorScheme == 'dark' ? '#fff' : '#222';
  const {addBoxShown, setAddBoxShown} = useContext(TodosContext);

  const innerStyle = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      width: useWindowDimensions().width,
      alignSelf: 'center',
    },
    infoBox: {
      backgroundColor: colorScheme == 'dark' ? '#222' : '#fff',
      height: 'auto',
      borderRadius: 15,
      paddingVertical: 30,
      paddingHorizontal: 15,
      gap: 10,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
    },
    textInput: {
      height: 'auto',
      width: '100%',
      color: currentTextColor,
      fontSize: 20,
      fontWeight: '400',
      padding: 10,
    },
    cancelIcon: {
      height: 28,
      width: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorScheme == 'dark' ? '#222' : '#ECECEC',
    },
  });

  return (
    <View>
      <Modal
        style={{margin: 0}}
        onBackdropPress={() => {
          setTodoNote('');
          editMode
            ? (setEditMode(false), setAddBoxShown(false))
            : setAddBoxShown(false);
          setToDefault();
        }}
        onBackButtonPress={() => {
          setTodoNote('');
          editMode
            ? (setEditMode(false), setAddBoxShown(false))
            : setAddBoxShown(false);
          setToDefault();
        }}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        backdropOpacity={0.1}
        animationInTiming={100}
        useNativeDriverForBackdrop
        animationOutTiming={100}
        avoidKeyboard={true}
        isVisible={addBoxShown}>
        <View style={innerStyle.modalContainer}>
          <View style={innerStyle.infoBox}>
            <View
              style={{
                width: '100%',
                height: 'auto',
                backgroundColor: colorScheme == 'dark' ? '#222' : '#ECECEC',
                borderRadius: 10,
              }}>
              <TextInput
                style={innerStyle.textInput}
                defaultValue={todoNote}
                onChangeText={newText => setTodoNote(newText)}
                autoFocus
                placeholder="Add a to-do item"
                multiline
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                <Pressable
                  disabled={todoNote == '' ? true : false}
                  onPress={() => setOpenDatePicker(true)}
                  style={{
                    backgroundColor: colorScheme == 'dark' ? '#222' : '#ECECEC',
                    paddingVertical: 8,
                    paddingHorizontal: 18,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <Icon2
                      name="alarm-outline"
                      color={currentTextColor}
                      size={20}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color: currentTextColor,
                        fontWeight: '400',
                      }}>
                      {alertProvided ? dateString : 'Set alerts'}
                    </Text>
                  </View>
                </Pressable>
                {alertProvided && (
                  <Pressable
                    onPress={setToDefault}
                    style={innerStyle.cancelIcon}>
                    <Icon name="xmark" size={20} color={currentTextColor} />
                  </Pressable>
                )}
              </View>
              <TouchableOpacity
                disabled={todoNote == '' ? true : false}
                onPress={saveNewTodo}>
                <Text
                  style={{
                    color: todoNote == '' ? '#888' : themeColor,
                    fontSize: 20,
                    fontWeight: '500',
                  }}>
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddTodoModal;

const styles = StyleSheet.create({});

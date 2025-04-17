import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { Text, View } from 'react-native'

const CustomDropdown = ({
  label,
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  placeholder,
  zIndex
}) => (
  <View style={{ zIndex, marginBottom: open ? 180 : 1 }}>
    <Text
      style={{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#a63932'
      }}
    >
      {label}
    </Text>
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={{ marginBottom: 15, borderColor: '#a63932' }}
      placeholder={placeholder}
      dropDownDirection='BOTTOM'
      listMode='SCROLLVIEW'
      dropDownContainerStyle={{ borderColor: '#a63932' }}
    />
  </View>
)

export default CustomDropdown

import React, { useState } from "react";
import { Button, View } from "react-native";
import DatePicker from "react-native-date-picker";

export default () => {
  const [date, setDate] = useState(new Date()); // Ensure the date is a Date object
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Button title="Open" onPress={() => setOpen(true)} />
      
      {/* Make sure that `date` is a valid Date object */}
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(selectedDate) => {
          setOpen(false); // Close the modal
          setDate(selectedDate); // Update the selected date
        }}
        onCancel={() => {
          setOpen(false); // Close the modal
        }}
      />
    </View>
  );
};

import { useLocalSearchParams, router } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

export default function SelectDateRange() {
  const { price, hotelId } = useLocalSearchParams();
  const nightlyPrice = parseFloat(price) || 0;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showPicker, setShowPicker] = useState({ type: null, visible: false });

  const handleDateChange = (event, date, type) => {
    setShowPicker({ type: null, visible: false });
    if (date) {
      type === "start" ? setStartDate(date) : setEndDate(date);
    }
  };

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const nights = Math.max((endDate - startDate) / (1000 * 60 * 60 * 24), 1);
    return Number(nights * nightlyPrice).toLocaleString();
  };

  return (
    <SafeAreaView style={{ padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Select Date Range</Text>
      <Text style={{ marginTop: 10, fontSize:15, fontWeight:'900' }}>Price per Night: ₦{nightlyPrice? Number(nightlyPrice).toLocaleString() : ''}</Text>

      {["start", "end"].map((type) => (
        <TouchableOpacity
          key={type}
          onPress={() => setShowPicker({ type, visible: true })}
          style={{ marginTop: 20 }}
        >
          <Text style={{ fontSize: 16, color: "blue" }}>
            {type === "start"
              ? startDate
                ? `Check-in: ${startDate.toDateString()}`
                : "Select Check-in Date"
              : endDate
              ? `Check-out: ${endDate.toDateString()}`
              : "Select Check-out Date"}
          </Text>
        </TouchableOpacity>
      ))}

      {showPicker.visible && (
        <DateTimePicker
          value={showPicker.type === "start" ? startDate || new Date() : endDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, showPicker.type)}
        />
      )}

      <TouchableOpacity
        onPress={() => router.push({ pathname: "/Payments", params: { price: calculateTotal(), hotelId } })}
        style={{
          marginTop: 30,
          padding: 15,
          backgroundColor: "#a63932",
          borderRadius: 10,
          width: "80%",
          alignItems: "center",
        }}
        disabled={!startDate || !endDate}
      >
        <Text  style={{ color: "white", fontSize: 18, bottom: 0 }}>
          Paying 
          <Text style={{ color: "white", fontSize: 18, bottom: 0,fontWeight:'700' }}>  ₦{calculateTotal()}
        </Text>
        </Text>
        
      </TouchableOpacity>
    </SafeAreaView>
  );
}

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';

const BookFlight = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showDeparture, setShowDeparture] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [tripType, setTripType] = useState('return');
  const [useAvios, setUseAvios] = useState(false);

  const onChangeDeparture = (event, selectedDate) => {
    setShowDeparture(false);
    if (selectedDate) setDepartureDate(selectedDate);
  };

  const onChangeReturn = (event, selectedDate) => {
    setShowReturn(false);
    if (selectedDate) setReturnDate(selectedDate);
  };

  return (
//   <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.header}>Booking</Text>
      <Text style={styles.subHeader}>Let’s start your trip</Text>
      
      <View style={styles.tripTypeContainer}>
        <RadioButton.Group onValueChange={newValue => setTripType(newValue)} value={tripType}>
          <View style={styles.radioButton}><RadioButton value="return" /><Text>Return</Text></View>
          <View style={styles.radioButton}><RadioButton value="one-way" /><Text>One-way</Text></View>
          <View style={styles.radioButton}><RadioButton value="multi-city" /><Text>Multi-city</Text></View>
        </RadioButton.Group>
      </View>
        
        <View style={styles.destination}><View style={styles.inputContainer}>
        <Text style={styles.label}>From</Text>
        <TextInput style={styles.input} placeholder="Select destination" />
        <Text style={styles.subText}>Murtala Muhammed Airport</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>To</Text>
        <TextInput style={styles.input} placeholder="Select destination" />
        <Text style={styles.subText}>Murtala Muhammed Airport</Text>
      </View>
      </View>

      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => setShowDeparture(true)}>
          <Text style={styles.dateText}>Departure: {departureDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDeparture && (
          <DateTimePicker
            value={departureDate}
            mode="date"
            display="default"
            onChange={onChangeDeparture}
          />
        )}
      </View>
      
      {tripType === 'return' && (
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => setShowReturn(true)}>
            <Text style={styles.dateText}>Return: {returnDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showReturn && (
            <DateTimePicker
              value={returnDate}
              mode="date"
              display="default"
              onChange={onChangeReturn}
            />
          )}
        </View>
      )}

      <View style={styles.passengerContainer}>
        <Text>1 passenger</Text>
        <Text>Economy</Text>
      </View>

      <View style={styles.promoContainer}>
        <TextInput style={styles.input} placeholder="Promo code" />
        <Text style={styles.plusIcon}>+</Text>
      </View>
      
      <View style={styles.switchContainer}>
        <Text>Book using Avios</Text>
        <Switch value={useAvios} onValueChange={setUseAvios} />
      </View>
       {/* Book Now Button */}
       <View style={{ marginTop: 30, alignItems: "center", marginHorizontal:10 }}>
        <TouchableOpacity
        //   onPress={handleBooking}
          style={{
            padding: 15,
            backgroundColor: "#a63932",
            borderRadius: 10,
            width: "100%",
            alignItems: "center",
            elevation: 3,
          }}
        //   disabled={!startDate || !endDate}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Search flight
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'space-evenly',
    paddingHorizontal: 20,
    paddingVertical:30,
    backgroundColor: '#F8F8F8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  destination:{
    backgroundColor:'#fff',
    borderRadius:20
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  inputText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
    color: '#888',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  dateContainer: {
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  passengerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  plusIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default BookFlight;
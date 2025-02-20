import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomBotton from '@/component/CustomBotton';

const BookFlight = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showDeparture, setShowDeparture] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [tripType, setTripType] = useState('return');
  const [useAvios, setUseAvios] = useState(false);
  const [flightClass, setFlightClass] = useState('Economy');
  // const bottomSheetModalRef = useRef(null);

  const onChangeDeparture = (event, selectedDate) => {
    setShowDeparture(false);
    if (selectedDate) setDepartureDate(selectedDate);
  };

  const onChangeReturn = (event, selectedDate) => {
    setShowReturn(false);
    if (selectedDate) setReturnDate(selectedDate);
  };

  // const openBottomSheet = () => {
  //   bottomSheetModalRef.current?.present();
  // };
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  return (
//   <SafeAreaView>
<GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
    <View style={styles.container}>
      <Text style={styles.header}>Booking Your Flight</Text>
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

    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => setShowDeparture(true)}>
          <Text style={styles.dateText}>Departure:</Text>
            <Text style={styles.dateSubtext}>{departureDate.toLocaleDateString()}</Text>
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
            <Text style={styles.dateText}>Return: </Text>
             <Text style={styles.dateSubtext}>{returnDate.toLocaleDateString()}</Text>
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
      </View>

      <View style={styles.passengerContainer}>
        <Text>1 passenger</Text>
        <TouchableOpacity onPress={handlePresentModalPress}>
              <Text>{flightClass}</Text>
              </TouchableOpacity>
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
        <CustomBotton button={'search flight'} onPress={''}/>
        </View>


          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            index={0} snapPoints={['25%', '50%']}
            >
            <BottomSheetView style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Flight Class</Text>
              {['Economy', 'Business', 'First Class'].map((item) => (
                <TouchableOpacity key={item} onPress={() => { setFlightClass(item); bottomSheetModalRef.current?.dismiss(); }} style={styles.modalOption}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </BottomSheetView>
        </BottomSheetModal>
    </View>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    // width:'100%',
    flex: 1,
    justifyContent:'space-evenly',
    paddingHorizontal: 20,
    paddingVertical:30,
    backgroundColor: '#F8F8F8',
    // alignItems:'center'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf:'center'
  },
  subHeader: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    alignSelf:'center'
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
    fontSize: 19,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
    color: '#888',
  },
  
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
  },
  dateContainer: {
    marginBottom: 15,
    alignItems:'center'
  },
  dateText: {
    alignSelf:"center",
    fontSize: 13,
    marginBottom:10,
    fontWeight:'bold',
  },
  dateSubtext:{
    fontSize:15,
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
  button: {
    backgroundColor: '#a63932',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOption: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
});

export default BookFlight;
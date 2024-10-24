import CancellationBox from '@/component/CancellationBox';
import React from 'react';
import { ScrollView } from 'react-native';

const Bookings = () => {
  return (
    <ScrollView style={{ marginVertical: 10 }}>
      <CancellationBox
        city={'Lagos'}
        date={'16 - 20 Oct 2024'}
        name={'Bon Lekki'}
        datePrice={'16 - 20 Oct US$55'}
        type={'Pending'}
      />
      <CancellationBox
        city={'Asaba'}
        date={'10 - 12 Dec 2024'}
        name={'Bon Asaba'}
        datePrice={'10 - 12 Dec US$95'}
        type={'Cancelled'}
      />
      <CancellationBox
        city={'Abuja'}
        date={'16 - 30 april 2025'}
        name={'Bon Lekki'}
        datePrice={'16 - 20 Oct US$500'}
        type={'Pending'}
      />
      <CancellationBox
        city={'Lagos'}
        date={'16 - 20 Oct 2024'}
        name={'Bon Lekki'}
        datePrice={'16 - 20 Oct US$55'}
        type={'Pending'}
      />
      <CancellationBox
        city={'Lagos'}
        date={'16 - 20 Oct 2024'}
        name={'Bon Lekki'}
        datePrice={'16 - 20 Oct US$55'}
        type={'Pending'}
      />
      <CancellationBox
        city={'Lagos'}
        date={'16 - 20 Oct 2024'}
        name={'Bon Lekki'}
        datePrice={'16 - 20 Oct US$55'}
        type={'Pending'}
      />
      <CancellationBox
        city={'Lagos'}
        date={'16 - 20 Oct 2024'}
        name={'Bon Lekki'}
        datePrice={'16 - 20 Oct US$55'}
        type={'Pending'}
      />
      <CancellationBox
        city={'Lagos'}
        date={'16 - 20 Oct 2024'}
        name={'Bon Lekki'}
        datePrice={'16 - 20 Oct US$55'}
        type={'Pending'}
      />
      <CancellationBox
        city={'Lagos'}
        date={'16 - 20 Oct 2024'}
        name={'Bon Lekki'}
        datePrice={'16 - 20 Oct US$55'}
        type={'Pending'}
      />
    </ScrollView>
  );
};

export default Bookings;

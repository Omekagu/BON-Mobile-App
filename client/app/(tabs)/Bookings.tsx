import CancellationBox from '@/component/CancellationBox';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

const Bookings = () => {
  return (
    <SafeAreaView>
      <ScrollView style={{ marginVertical: 10 }}>
        <CancellationBox
          image={'https://i.postimg.cc/9MHhdrTt/BON-HOTEL-TRANSTELL-ROOMS7.jpg'}
          city={'Lagos'}
          date={'16 - 20 Oct 2024'}
          name={'Bon Lekki'}
          datePrice={'16 - 20 Oct $55'}
          type={'Done'}
          color={'green'}
        />
        <CancellationBox
          image={'https://i.postimg.cc/7L0vZwcC/BON-HOTEL-TRANSTELL-ROOMS1.jpg'}
          city={'Asaba'}
          date={'10 - 12 Dec 2024'}
          name={'Bon Asaba'}
          datePrice={'10 - 12 Dec $95'}
          type={'Cancelled'}
          color={'red'}
        />
        <CancellationBox
          image={
            'https://i.postimg.cc/BQXVvJPq/BON-HOTEL-TRANSTELL-ROOMS11.jpg'
          }
          city={'Abuja'}
          date={'16 - 30 april 2025'}
          name={'Bon Lekki'}
          datePrice={'16 - 20 Oct $500'}
          type={'Pending'}
          color={'orange'}
        />
        <CancellationBox
          image={'https://i.postimg.cc/QtffXzX9/BON-HOTEL-TRANSTELL-ROOMS6.jpg'}
          city={'Benin'}
          date={'16 - 20 Oct 2024'}
          name={'Bon Lekki'}
          datePrice={'16 - 20 Oct $55'}
          type={'Pending'}
          color={'green'}
        />
        <CancellationBox
          image={'https://i.postimg.cc/9MHhdrTt/BON-HOTEL-TRANSTELL-ROOMS7.jpg'}
          city={'Delta'}
          date={'16 - 20 Oct 2024'}
          name={'Bon Lekki'}
          datePrice={'16 - 20 Oct $55'}
          type={'Pending'}
          color={'green'}
        />
        <CancellationBox
          image={'https://i.postimg.cc/7L0vZwcC/BON-HOTEL-TRANSTELL-ROOMS1.jpg'}
          city={'Enugu'}
          date={'10 - 12 Dec 2024'}
          name={'Bon Asaba'}
          datePrice={'10 - 12 Dec $95'}
          type={'Cancelled'}
          color={'green'}
        />
        <CancellationBox
          image={
            'https://i.postimg.cc/BQXVvJPq/BON-HOTEL-TRANSTELL-ROOMS11.jpg'
          }
          city={'Kaduna'}
          date={'16 - 30 april 2025'}
          name={'Bon Lekki'}
          datePrice={'16 - 20 Oct $500'}
          type={'Pending'}
          color={'green'}
        />
        <CancellationBox
          image={'https://i.postimg.cc/QtffXzX9/BON-HOTEL-TRANSTELL-ROOMS6.jpg'}
          city={'osun'}
          date={'16 - 20 Oct 2024'}
          name={'Bon Lekki'}
          datePrice={'16 - 20 Oct $55'}
          type={'Pending'}
          color={'green'}
        />
        <CancellationBox
          image={'https://i.postimg.cc/9MHhdrTt/BON-HOTEL-TRANSTELL-ROOMS7.jpg'}
          city={'umuahia'}
          date={'16 - 20 Oct 2024'}
          name={'Bon Lekki'}
          datePrice={'16 - 20 Oct $55'}
          type={'Pending'}
          color={'green'}
        />
        <CancellationBox
          image={'https://i.postimg.cc/7L0vZwcC/BON-HOTEL-TRANSTELL-ROOMS1.jpg'}
          city={'calabar'}
          date={'10 - 12 Dec 2024'}
          name={'Bon Asaba'}
          datePrice={'10 - 12 Dec $95'}
          type={'Cancelled'}
          color={'green'}
        />
        <CancellationBox
          image={
            'https://i.postimg.cc/BQXVvJPq/BON-HOTEL-TRANSTELL-ROOMS11.jpg'
          }
          city={'awka'}
          date={'16 - 30 april 2025'}
          name={'Bon Lekki'}
          datePrice={'16 - 20 Oct $500'}
          type={'Pending'}
          color={'green'}
        />
        <CancellationBox
          image={'https://i.postimg.cc/QtffXzX9/BON-HOTEL-TRANSTELL-ROOMS6.jpg'}
          city={'Bayelsa'}
          date={'16 - 20 Oct 2024'}
          name={'Bon Lekki'}
          datePrice={'16 - 20 Oct $55'}
          type={'Pending'}
          color={'green'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookings;

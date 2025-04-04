import React from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
// import { LineChart } from 'react-native-chart-kit'

const Wallet = () => {
  //   const chartData = {
  //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //     datasets: [
  //       {
  //         data: [500, 600, 550, 650, 700, 750, 800],
  //         color: () => `#a63932`
  //       }
  //     ]
  //   }

  const transactions = [
    { id: '1', title: 'Received BTC', amount: '+₿0.005', date: 'Apr 1' },
    { id: '2', title: 'Sent ETH', amount: '-Ξ0.3', date: 'Mar 30' },
    { id: '3', title: 'Top Up', amount: '+$100', date: 'Mar 28' }
  ]

  const renderHeader = () => (
    <View>
      <Text style={styles.balanceText}>Total Balance</Text>
      <Text style={styles.amount}>$4,230.75</Text>
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
    </View>
  )

  return (
    <FlatList
      data={transactions}
      keyExtractor={item => item.id}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.transactionItem}>
          <Text style={styles.txTitle}>{item.title}</Text>
          <View style={styles.txRight}>
            <Text style={styles.txAmount}>{item.amount}</Text>
            <Text style={styles.txDate}>{item.date}</Text>
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#121212',
    padding: 15,
    height: '100%'
  },
  balanceText: {
    color: '#000',
    fontSize: 16
  },
  amount: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20
  },
  sectionTitle: {
    color: '#000',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#a63932',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  txTitle: {
    color: '#000',
    fontSize: 16
  },
  txRight: {
    alignItems: 'flex-end'
  },
  txAmount: {
    color: '#000',
    fontWeight: 'bold'
  },
  txDate: {
    color: '#000',
    fontSize: 12
  }
})

export default Wallet

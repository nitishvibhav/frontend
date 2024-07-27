import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const LedgerDetail = ({ route, navigation }) => {
  const { item } = route.params;

  const handleUpdate = () => {
    // Navigate to the update page or handle the update logic
    navigation.navigate('Payment', { item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ledger Detail</Text>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Method: <Text style={styles.value}>{item.method}</Text></Text>
        <Text style={styles.label}>Payment Status: <Text style={styles.value}>{item.paymentStatus}</Text></Text>
        <Text style={styles.label}>Payment Category: <Text style={styles.value}>{item.paymentCategory}</Text></Text>
        <Text style={styles.label}>Date: <Text style={styles.value}>{item.date}</Text></Text>
        <Text style={styles.label}>Amount: <Text style={styles.value}>{item.amount}</Text></Text>
        <Text style={styles.label}>Charge: <Text style={styles.value}>{item.charge}</Text></Text>
        <Text style={styles.label}>Dues: <Text style={styles.value}>{item.dues}</Text></Text>
        <Text style={styles.label}>Payable Amount: <Text style={styles.value}>{item.payableAmount}</Text></Text>
        <Text style={styles.label}>Remark: <Text style={styles.value}>{item.remark}</Text></Text>
        <Text style={styles.label}>Receipt Against: <Text style={styles.value}>{item.receiptAgainst}</Text></Text>
      </View>
    </View>
  );
};

export default LedgerDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  value: {
    fontWeight: 'normal',
    color: '#666',
  },
});

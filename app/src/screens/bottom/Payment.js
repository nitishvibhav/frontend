import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getByHotelIdLedger} from '../../redux/Ledger/action';
import {useNavigation} from '@react-navigation/native';

const Payment = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user} = useSelector(state => state.loginReducer);
  const [ledgerData, setLedgerData] = useState([]);

  useEffect(() => {
    const fetchLedgerData = async () => {
      const response = await dispatch(getByHotelIdLedger(user.result.username));
      if (response.value && response.value.data && response.value.data.result) {
        setLedgerData(response.value.data.result);
      }
    };

    fetchLedgerData();
  }, [dispatch, user.result.username]);

  const getStatusStyle = status => {
    switch (status) {
      case 'PENDING':
        return {color: 'red', borderColor: 'red'}; // Red for Pending
      case 'PARTIALLY-PAID':
        return {color: 'orange', borderColor: 'orange'}; // Orange for Partially Paid
      case 'SUCCESS':
        return {color: 'green', borderColor: 'green'}; // Green for Successful
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Method</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText}>Amount</Text>
        <Text style={styles.headerText}>Dues</Text>
        <Text style={styles.headerText}>Date</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {ledgerData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('LedgerDetail', {item})}>
            <View style={styles.row}>
              <Text style={styles.methodText}>{item.method}</Text>
              <View
                style={[
                  styles.statusContainer,
                  getStatusStyle(item.paymentStatus),
                ]}>
                <Text
                  style={[
                    styles.statusText,
                    getStatusStyle(item.paymentStatus),
                  ]}>
                  {item.paymentStatus}
                </Text>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.amountText}>रु {item.amount}</Text>
              </View>
              <View style={styles.duesContainer}>
                <Text style={styles.duesText}>रु {item.dues}</Text>
              </View>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  headerText: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 11, // Changed size to 11
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal:5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  methodText: {
    flex: 1,
    color: 'purple',
    fontWeight: '500',
    fontSize: 11, // Changed size to 11
    textAlign: 'center',
  },
  statusContainer: {
    width: '20%',
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 11, // Changed size to 11
  },
  amountContainer: {
    flex: 1,
    backgroundColor: '#e0f7fa', // Light cyan background
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  amountText: {
    color: '#00796b', // Dark teal color
    fontWeight: '600',
    fontSize: 11, // Changed size to 11
  },
  duesContainer: {
    flex: 1,
    backgroundColor: '#ffe0b2', // Light orange background
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  duesText: {
    color: '#e65100', // Dark orange color
    fontWeight: '600',
    fontSize: 11, // Changed size to 11
  },
  dateText: {
    flex: 1,
    color: 'black',
    fontWeight: '600',
    fontSize: 10, // Changed size to 11
    textAlign: 'center',
  },
});
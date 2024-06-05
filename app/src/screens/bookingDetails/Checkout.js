import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import PriceBreakupCard from '../../components/PriceBreakupCard';
import CustomButton from '../../components/CustomButton';
import CheckoutCalendar from '../../components/CheckoutCalendar';
import imagePath from '../../assets/images/imagePath';

const Checkout = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.labelview}>
            <Text style={styles.label}>Checkout Date</Text>
          </View>
        <CheckoutCalendar/>
          <View style={styles.labelview}>
            <Text style={styles.label}>Checkout Time</Text>
          </View>
          <TouchableOpacity style={styles.touchableopacity}>
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '500'}}>
              Checkout Time
            </Text>
            <Image
              source={imagePath.alarmClock}
              style={{height: 16, width: 16}}
            />
          </TouchableOpacity>
          <View style={styles.labelview}>
            <Text style={styles.label}>Additional Services Details</Text>
          </View>
          <TextInput
            style={styles.textinput}
            placeholder="Eg: Water, Breakfast etc."
            placeholderTextColor="gray"
            numberOfLines={2}
          />
          <View style={styles.labelview}>
            <Text style={styles.label}>Service Amount</Text>
          </View>
          <TextInput
            style={styles.textinput}
            placeholder="Serive Amount"
            placeholderTextColor="gray"
          />
        </View>
        <PriceBreakupCard />
      </ScrollView>
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          width: '100%',
          backgroundColor: 'black',
          paddingVertical: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 20,
        }}>
        <View>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>
            ₹ 4,500
          </Text>
          <Text style={{color: 'gray', fontSize: 10, fontWeight: '400'}}>
            Including Taxes 
          </Text>
        </View>
        <View>
          <CustomButton title="Pay & Checkout" width="80%" />
        </View>
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  textinput: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 20,
    fontSize: 14,
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
  labelview: {
    marginTop: 10,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    elevation: 5,
    alignSelf: 'center',
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    paddingBottom: 20,
  },
  touchableopacity: {
    paddingHorizontal: 20,
    borderColor: 'gray',
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 6,
    fontSize: 14,
    marginTop: 2,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

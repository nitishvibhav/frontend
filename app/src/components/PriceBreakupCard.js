import {View, Text, Image} from 'react-native';
import React from 'react';

const PriceBreakupCard = () => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        alignSelf: 'center',
        elevation: 5,
        shadowColor: 'grey',
        marginBottom: 90,
        paddingBottom: 20,
      }}>
      <Text
        style={{marginLeft: 20, fontSize: 18, fontWeight: 700, marginTop: 10}}>
        Price Breakup
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        <Text style={{color: '#4b4b4b'}}>1 Rooms x 2 night Base Price</Text>
        <Text style={{color: '#4b4b4b'}}>₹ 4,000</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#d6d6d6',
          borderBottomWidth: 1,
          margin: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text style={{color: '#0a8374'}}>Additional Discount </Text>
        <Text style={{color: '#0a8374'}}>- ₹ 500</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#d6d6d6',
          borderBottomWidth: 1,
          margin: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text style={{color: '#0a8374'}}>Coupon Discount </Text>
        <Text style={{color: '#0a8374'}}>- ₹ 1,000</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#d6d6d6',
          borderBottomWidth: 1,
          margin: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text style={{color: '#4b4b4b'}}>Price after Discount</Text>
        <Text style={{color: '#4b4b4b'}}>₹ 2,500</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#d6d6d6',
          borderBottomWidth: 1,
          margin: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text style={{color: '#4b4b4b'}}>Taxes (Vat)</Text>
        <Text style={{color: '#4b4b4b'}}>₹ 400</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#d6d6d6',
          borderBottomWidth: 1,
          margin: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text style={{color: '#4b4b4b'}}>Service fees</Text>
        <Text style={{color: '#4b4b4b'}}>₹ 1600</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#d6d6d6',
          borderBottomWidth: 1,
          margin: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Text style={{color: '#000', fontSize: 16, fontWeight: 700}}>
          Total Amount to be paid
        </Text>
        <Text style={{color: '#4b4b4b', fontSize: 16, fontWeight: 700}}>
          ₹ 2,900
        </Text>
      </View>
    </View>
  );
};

export default PriceBreakupCard;

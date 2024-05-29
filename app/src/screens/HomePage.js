import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
     

      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          backgroundColor: 'white',
          borderRadius: 10,
          marginVertical: 10,
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            source={require('../../assets/images/button.png')}
            style={{height: 12, width: 12}}
          />
          <Text style={{color: 'black', fontSize: 12, marginRight: 10}}>
            Available
          </Text>
          <Image
            source={require('../../assets/images/button.png')}
            style={{height: 12, width: 12, tintColor: 'red'}}
          />
          <Text style={{color: 'black', fontSize: 12, marginRight: 10}}>
            Booked
          </Text>
          <Image
            source={require('../../assets/images/button.png')}
            style={{height: 12, width: 12, tintColor: 'orange'}}
          />
          <Text style={{color: 'black', fontSize: 12, marginRight: 10}}>
            Available Check-in
          </Text>
          <Image
            source={require('../../assets/images/button.png')}
            style={{height: 12, width: 12, tintColor: 'gray'}}
          />
          <Text style={{color: 'black', fontSize: 12}}>Unavailable</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        <View style={styles.roomView}>
          <TouchableOpacity onPress={() => navigation.navigate('RoomDetails')}>
            <Text style={styles.roomText}>Room 1</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.roomView}
          onPress={() => navigation.navigate('RoomBooking')}>
          <View>
            <Text style={styles.roomText}>Room 2</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.roomView}>
          <Text style={styles.roomText}>Room 3</Text>
        </View>
        <View style={styles.roomView}>
          <Text style={styles.roomText}>Room 4</Text>
        </View>
        <View style={styles.roomView}>
          <Text style={styles.roomText}>Room 5</Text>
        </View>
        <View style={styles.roomView}>
          <Text style={styles.roomText}>Room 6</Text>
        </View>
        <View style={styles.roomView}>
          <Text style={styles.roomText}>Room 7</Text>
        </View>
        <View style={styles.roomView}>
          <Text style={styles.roomText}>Room 8</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        <View style={styles.roomView2}>
          <Text style={styles.roomText}>Room 9</Text>
        </View>
        <View style={styles.roomView2}>
          <Text style={styles.roomText}>Room 10</Text>
        </View>
        <View style={styles.roomView2}>
          <Text style={styles.roomText}>Room 11</Text>
        </View>
        <View style={styles.roomView2}>
          <Text style={styles.roomText}>Room 12</Text>
        </View>
        <View style={styles.roomView2}>
          <Text style={styles.roomText}>Room 13</Text>
        </View>
        <View style={styles.roomView2}>
          <Text style={styles.roomText}>Room 14</Text>
        </View>
        <View style={styles.roomView2}>
          <Text style={styles.roomText}>Room 15</Text>
        </View>
        <View style={styles.roomView2}>
          <Text style={styles.roomText}>Room 16</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        <View style={styles.roomView3}>
          <Text style={styles.roomText}>Room 17</Text>
        </View>
        <View style={styles.roomView3}>
          <Text style={styles.roomText}>Room 18</Text>
        </View>
        <View style={styles.roomView3}>
          <Text style={styles.roomText}>Room 19</Text>
        </View>
        <View style={styles.roomView3}>
          <Text style={styles.roomText}>Room 20</Text>
        </View>
        <View style={styles.roomView3}>
          <Text style={styles.roomText}>Room 21</Text>
        </View>
        <View style={styles.roomView3}>
          <Text style={styles.roomText}>Room 22</Text>
        </View>
        <View style={styles.roomView3}>
          <Text style={styles.roomText}>Room 23</Text>
        </View>
        <View style={styles.roomView3}>
          <Text style={styles.roomText}>Room 24</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: 20,
        }}>
        <View style={styles.roomView4}>
          <Text style={styles.roomText}>Room 25</Text>
        </View>
        <View style={styles.roomView4}>
          <Text style={styles.roomText}>Room 26</Text>
        </View>
        <View style={styles.roomView4}>
          <Text style={styles.roomText}>Room 27</Text>
        </View>
        <View style={styles.roomView4}>
          <Text style={styles.roomText}>Room 28</Text>
        </View>
        <View style={styles.roomView4}>
          <Text style={styles.roomText}>Room 29</Text>
        </View>
        <View style={styles.roomView4}>
          <Text style={styles.roomText}>Room 30</Text>
        </View>
        <View style={styles.roomView4}>
          <Text style={styles.roomText}>Room 31</Text>
        </View>
        <View style={styles.roomView4}>
          <Text style={styles.roomText}>Room 32</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  headingView: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
  },
  haedingtext: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
  },
  roomView: {
    width: '24%',
    height: 75,
    backgroundColor: 'green',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  roomText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  roomView2: {
    width: '24%',
    height: 75,
    backgroundColor: 'maroon',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  roomView3: {
    width: '24%',
    height: 75,
    backgroundColor: 'blue',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  roomView4: {
    width: '24%',
    height: 75,
    backgroundColor: 'orange',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  topContainer: {
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 6,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

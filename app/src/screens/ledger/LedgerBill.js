import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import {Snackbar} from 'react-native-paper';
import {getByHotelIdBooking} from '../../redux/Booking1/action';
import {
  createLedger,
  updateLedger,
  getByHotelIdLedger,
} from '../../redux/Ledger/action';
import {getUser} from '../../../utils';
import CustomButton from '../../components/CustomButton';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity';
import {Calendar} from 'react-native-calendars';
import imagePath from '../../assets/images/imagePath';

const methodData = ['CARD', 'ONLINE', 'CASH', 'CHEQUE'];
const statusData = ['PENDING', 'SUCCESS', 'PARTIALLY-PAID'];

export default function LedgerBill({color, route, navigation}) {
  const {item} = route.params || {}; // Get the item from the route params
  const userDetails = getUser().result;
  const dispatch = useDispatch();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('green');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {getBookingByHotelId, bookingState} = useSelector(
    state => state.booking1Reducer,
  );

  const {user} = useSelector(state => state.loginReducer);

  useEffect(() => {
    dispatch(getByHotelIdBooking(user.result.username));
  }, [dispatch, user.result.username]);

  const filterableData =
    bookingState === 2 && getBookingByHotelId && getBookingByHotelId.result
      ? getBookingByHotelId.result.filter(
          booking => booking.status !== 'CHECKED-OUT',
        )
      : [];

  const pickerData = filterableData.map(item => ({
    label: item.fullName,
    value: item._id,
  }));

  const currentDate = new Date().toISOString().split('T')[0];

  const handlePressDate = day => {
    formik.setFieldValue('date', day.dateString);
    setIsModalVisible(false);
  };

  const RoleSchema = Yup.object().shape({
    linkupId: Yup.string().required('linkupId is required'),
    date: Yup.string().required('date is required'),
    method: Yup.string().required('method is required'),
    amount: Yup.string().required('amount is required'),
    charge: Yup.string().required('charge is required'),
    dues: Yup.string().required('dues is required'),
    payableAmount: Yup.string().required('payableAmount is required'),
    paymentStatus: Yup.string().required('paymentStatus is required'),
    paymentCategory: Yup.string().required('paymentCategory is required'),
    userCategory: Yup.string().required('userCategory is required'),
    receiptAgainst: Yup.string().required('receiptAgainst is required'),
    remark: Yup.string().required('remark is required'),
  });

  const formik = useFormik({
    initialValues: {
      linkupId: user.result.username,
      date: item ? item.date : '',
      amount: item ? item.amount.toString() : '', // Ensuring it's a string
      charge: item ? item.charge.toString() : '', // Ensuring it's a string
      dues: item ? item.dues.toString() : '', // Ensuring it's a string
      payableAmount: item ? item.payableAmount.toString() : '', // Ensuring it's a string
      remark: item ? item.remark : '',
      method: item ? item.method : '',
      paymentStatus: item ? item.paymentStatus : '',
      paymentCategory: 'RECEIPT-PAID',
      userCategory: 'CUSTOMER',
      receiptAgainst: item ? item.receiptAgainst : '',
    },
    enableReinitialize: true,
    validationSchema: RoleSchema,
    onSubmit: values => {
      if (item) {
        updateHandler(values);
      } else {
        createHandler(values);
      }
    },
  });

  const {errors, touched, handleSubmit, handleChange, handleBlur, values} =
    formik;

  const createHandler = async values => {
    const res = await dispatch(createLedger(values));
    const status = res?.value?.status;
    if (status === 200) {
      dispatch(getByHotelIdLedger(user.result.username));
      setSnackbarColor('green');
      setSnackbarMessage(res.value.data.message || 'Done');
      formik.resetForm();
      navigation.goBack(); // Navigate back to the previous screen
    } else {
      setSnackbarColor('red');
      setSnackbarMessage(res.message || 'Error');
    }
    setSnackbarVisible(true);
  };

  const updateHandler = async values => {
    const res = await dispatch(updateLedger(values, item._id));
    const status = res?.value?.status;
    if (status === 200) {
      dispatch(getByHotelIdLedger(user.result.username));
      setSnackbarColor('green');
      setSnackbarMessage(res.value.data.message || 'Updated successfully');
      formik.resetForm();
      navigation.goBack(); // Navigate back to the previous screen
    } else {
      setSnackbarColor('red');
      setSnackbarMessage(res.message || 'Error');
    }
    setSnackbarVisible(true);
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Payment Method</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={values.method}
                onValueChange={itemValue =>
                  formik.setFieldValue('method', itemValue)
                }>
                <Picker.Item label="Select Method" value="" />
                {methodData.map(method => (
                  <Picker.Item key={method} label={method} value={method} />
                ))}
              </Picker>
            </View>
            {touched.method && errors.method && (
              <Text style={styles.errorText}>{errors.method}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Payment Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={values.paymentStatus}
                onValueChange={itemValue =>
                  formik.setFieldValue('paymentStatus', itemValue)
                }>
                <Picker.Item label="Select Status" value="" />
                {statusData.map(status => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
            </View>
            {touched.paymentStatus && errors.paymentStatus && (
              <Text style={styles.errorText}>{errors.paymentStatus}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Receipt Against</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={values.receiptAgainst}
                onValueChange={itemValue =>
                  formik.setFieldValue('receiptAgainst', itemValue)
                }>
                <Picker.Item label="Select Receipt Against" value="" />
                {pickerData.map(item => (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Picker>
            </View>
            {touched.receiptAgainst && errors.receiptAgainst && (
              <Text style={styles.errorText}>{errors.receiptAgainst}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <View style={{width: '100%'}}>
              <CustomTouchableOpacity
                label="DATE"
                icon={imagePath.checkIn}
                text={values.date || 'Select Date'}
                width="100%"
                onPress={() => setIsModalVisible(true)}
              />
              {touched.date && errors.date && (
                <Text style={styles.errorText}>{errors.date}</Text>
              )}
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={[styles.formGroup, {width: '49%'}]}>
              <Text style={styles.label}>Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                keyboardType="numeric"
                value={values.amount}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                placeholderTextColor="black"
              />
              {touched.amount && errors.amount && (
                <Text style={styles.errorText}>{errors.amount}</Text>
              )}
            </View>

            <View style={[styles.formGroup, {width: '49%'}]}>
              <Text style={styles.label}>Charge</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Charge"
                keyboardType="numeric"
                value={values.charge}
                onChangeText={handleChange('charge')}
                onBlur={handleBlur('charge')}
                placeholderTextColor="black"
              />
              {touched.charge && errors.charge && (
                <Text style={styles.errorText}>{errors.charge}</Text>
              )}
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={[styles.formGroup, {width: '49%'}]}>
              <Text style={styles.label}>Dues</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Dues"
                keyboardType="numeric"
                value={values.dues}
                onChangeText={handleChange('dues')}
                onBlur={handleBlur('dues')}
                placeholderTextColor="black"
              />
              {touched.dues && errors.dues && (
                <Text style={styles.errorText}>{errors.dues}</Text>
              )}
            </View>

            <View style={[styles.formGroup, {width: '49%'}]}>
              <Text style={styles.label}>Payable Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Payable Amount"
                keyboardType="numeric"
                value={values.payableAmount}
                onChangeText={handleChange('payableAmount')}
                onBlur={handleBlur('payableAmount')}
                placeholderTextColor="black"
              />
              {touched.payableAmount && errors.payableAmount && (
                <Text style={styles.errorText}>{errors.payableAmount}</Text>
              )}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Remark</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Enter Remark"
              value={values.remark}
              onChangeText={handleChange('remark')}
              onBlur={handleBlur('remark')}
              placeholderTextColor="black"
            />
            {touched.remark && errors.remark && (
              <Text style={styles.errorText}>{errors.remark}</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              title={item ? 'update' : 'submit'}
              onPress={handleSubmit}
              width="100%"
            />
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          <Calendar
            onDayPress={handlePressDate}
            markedDates={{
              [formik.values.date]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: 'blue',
                selectedTextColor: 'white',
              },
            }}
            minDate={currentDate}
          />
          <Button onPress={() => setIsModalVisible(false)} title="Close" />
        </View>
      </Modal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{backgroundColor: snackbarColor}}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 0,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
    fontWeight: '700',
  },
  input: {
    height: 54,
    borderColor: '#dadada',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#eef3ef',
    color: 'black',
  },
  picker: {
    height: 54,
    borderColor: '#dadada',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#eef3ef',
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  pickerContainer: {
    borderColor: '#dadada',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#eef3ef',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
});

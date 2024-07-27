import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { Snackbar } from 'react-native-paper';
import { getByHotelIdBooking } from '../../redux/Booking1/action';
import { createLedger, updateLedger, getByHotelIdLedger } from '../../redux/Ledger/action';
import { getUser } from '../../../utils';

const methodData = ['CARD', 'ONLINE', 'CASH', 'CHEQUE'];
const statusData = ['PENDING', 'SUCCESS', 'PARTIALLY-PAID'];
const paymentCat = ['RECEIPT-PAID', 'RECEIPT-RECEIVED'];
const userCat = ['CUSTOMER', 'STAFF', 'ORGANIZATION'];

export default function Payment({ color, route, navigation }) {
  const { item } = route.params || {}; // Get the item from the route params
  const userDetails = getUser().result;
  const dispatch = useDispatch();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('green');

  const { getBookingByHotelId, bookingState } = useSelector(
    state => state.booking1Reducer,
  );

  const { user } = useSelector(state => state.loginReducer);

  useEffect(() => {
    dispatch(getByHotelIdBooking(user.result.username));
  }, [dispatch, user.result.username]);

  const filterableData =
    bookingState === 2 && getBookingByHotelId && getBookingByHotelId.result
      ? getBookingByHotelId.result.filter(booking => booking.status !== 'CHECKED-OUT')
      : [];

  const pickerData = filterableData.map(item => ({
    label: item.fullName,
    value: item._id,
  }));

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
    paymentCategory: item ? item.paymentCategory : '',
    userCategory: item ? item.userCategory : '',
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

  const { errors, touched, handleSubmit, handleChange, handleBlur, values } = formik;

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
    const res = await dispatch(updateLedger( values,item._id));
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
            <View style={styles.input}>
              <Picker
                selectedValue={values.method}
                onValueChange={itemValue => formik.setFieldValue('method', itemValue)}
              >
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
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Date"
              value={values.date}
              onChangeText={handleChange('date')}
              onBlur={handleBlur('date')}
            />
            {touched.date && errors.date && (
              <Text style={styles.errorText}>{errors.date}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={values.amount}
              onChangeText={handleChange('amount')}
              onBlur={handleBlur('amount')}
            />
            {touched.amount && errors.amount && (
              <Text style={styles.errorText}>{errors.amount}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Charge</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Charge"
              keyboardType="numeric"
              value={values.charge}
              onChangeText={handleChange('charge')}
              onBlur={handleBlur('charge')}
            />
            {touched.charge && errors.charge && (
              <Text style={styles.errorText}>{errors.charge}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Dues</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Dues"
              keyboardType="numeric"
              value={values.dues}
              onChangeText={handleChange('dues')}
              onBlur={handleBlur('dues')}
            />
            {touched.dues && errors.dues && (
              <Text style={styles.errorText}>{errors.dues}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Payable Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Payable Amount"
              keyboardType="numeric"
              value={values.payableAmount}
              onChangeText={handleChange('payableAmount')}
              onBlur={handleBlur('payableAmount')}
            />
            {touched.payableAmount && errors.payableAmount && (
              <Text style={styles.errorText}>{errors.payableAmount}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Remark</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Remark"
              value={values.remark}
              onChangeText={handleChange('remark')}
              onBlur={handleBlur('remark')}
            />
            {touched.remark && errors.remark && (
              <Text style={styles.errorText}>{errors.remark}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Payment Status</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={values.paymentStatus}
                onValueChange={itemValue => formik.setFieldValue('paymentStatus', itemValue)}
              >
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
            <Text style={styles.label}>Payment Category</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={values.paymentCategory}
                onValueChange={itemValue => formik.setFieldValue('paymentCategory', itemValue)}
              >
                <Picker.Item label="Select Category" value="" />
                {paymentCat.map(category => (
                  <Picker.Item key={category} label={category} value={category} />
                ))}
              </Picker>
            </View>
            {touched.paymentCategory && errors.paymentCategory && (
              <Text style={styles.errorText}>{errors.paymentCategory}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>User Category</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={values.userCategory}
                onValueChange={itemValue => formik.setFieldValue('userCategory', itemValue)}
              >
                <Picker.Item label="Select User Category" value="" />
                {userCat.map(category => (
                  <Picker.Item key={category} label={category} value={category} />
                ))}
              </Picker>
            </View>
            {touched.userCategory && errors.userCategory && (
              <Text style={styles.errorText}>{errors.userCategory}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Receipt Against</Text>
            <View style={styles.input}>
              <Picker
                selectedValue={values.receiptAgainst}
                onValueChange={itemValue => formik.setFieldValue('receiptAgainst', itemValue)}
              >
                <Picker.Item label="Select Receipt Against" value="" />
                {pickerData.map(item => (
                  <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
              </Picker>
            </View>
            {touched.receiptAgainst && errors.receiptAgainst && (
              <Text style={styles.errorText}>{errors.receiptAgainst}</Text>
            )}
          </View>

          <Button onPress={handleSubmit} title={item ? "Update" : "Submit"} color={color} />
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        style={{ backgroundColor: snackbarColor }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 20,
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
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
  },
});

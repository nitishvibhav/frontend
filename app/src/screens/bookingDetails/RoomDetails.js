import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {getByReceiptIdLedger} from '../../redux/Ledger/action';
import {launchImageLibrary} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';
import {
  getDocumentByLinkedIdDetails,
  updateDocumentByID,
  uploadDocumentFile,
} from '../../redux/documents/action';
import {Modal} from 'react-native-paper';

const RoomDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState([]);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const item = route.params?.item;
  console.log(item._id, 'item line no.26');
  console.log(item, 'line no 17');

  const {getDocumentByLinkedId} = useSelector(state => state.documentReducer);
  const imageUrl = getDocumentByLinkedId.result;
  console.log(imageUrl, 'imageUrl');

  useEffect(() => {
    dispatch(getByReceiptIdLedger(item._id));
    dispatch(getDocumentByLinkedIdDetails(item._id));
  }, [dispatch]);

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      const images = imageUrl.flatMap(doc =>
        doc.images.map(image => `data:image/png;base64,${image}`),
      );
      setFetchedImages(images);
    }
  }, [imageUrl]);

  const {getLedgerByReceipt} = useSelector(state => state.ledgerReducer);
  const ledgerData = getLedgerByReceipt.result;
  console.log(ledgerData, 'ledger data......');

  const selectImageFromGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setDocuments([
          ...documents,
          {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          },
        ]);
      }
    });
  };

  const captureImageWithCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setDocuments([
          ...documents,
          {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          },
        ]);
      }
    });
  };

  const handlePostImage = async () => {
    if (documents.length < 2) {
      Alert.alert('Error', 'Please upload at least 2 documents.');
      return;
    }
    const formData = new FormData();
    documents.forEach((doc, index) => {
      formData.append('images', {
        uri: doc.uri,
        type: 'image/jpeg',
        name: `document${index + 1}.jpg`,
      });
    });

    formData.append('linkedId', item._id);
    formData.append('title', 'Uploaded Image');

    try {
      await dispatch(updateDocumentByID(formData));
      Alert.alert('Success', 'Documents uploaded successfully');
      setDocuments([]);
    } catch (error) {
      console.error('Upload Error: ', error);
      Alert.alert('Error', 'Failed to upload documents');
    }
  };

  return (
    <View style={styles.flexContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.ledgerTitle}>Payment History</Text>
          {ledgerData && ledgerData.length > 0 ? (
            ledgerData.map((ledger, index) => (
              <View
                key={ledger._id}
                style={[styles.ledgerItem, index > 0 && styles.marginTop10]}>
                <View style={styles.ViewContainer}>
                  <View>
                    <Text>Method</Text>
                    <View style={styles.methodView}>
                      <Text style={{color: 'white', fontSize: 10}}>
                        {ledger.method}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text>Status</Text>
                    <View style={styles.methodView}>
                      <Text style={{color: 'white', fontSize: 10}}>
                        {ledger.paymentStatus}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text>Date</Text>
                    <Text style={{color: 'black', fontSize: 12}}>
                      {ledger.date}
                    </Text>
                  </View>
                </View>

                <View style={styles.ViewContainer}>
                  <View>
                    <Text>Total Amount :</Text>
                    <Text style={{color: 'black', fontSize: 12}}>
                      {ledger.payableAmount}
                    </Text>
                  </View>
                  <View>
                    <Text>Amount :</Text>
                    <Text style={{color: 'black', fontSize: 12}}>
                      {ledger.amount}
                    </Text>
                  </View>
                  <View>
                    <Text>Dues :</Text>
                    <Text style={{color: 'black', fontSize: 12}}>
                      {ledger.dues}
                    </Text>
                  </View>
                </View>
                <View style={styles.ViewContainer}>
                  <View>
                    <Text>Charges :</Text>
                    <Text style={{color: 'black', fontSize: 12}}>
                      {ledger.charge}
                    </Text>
                  </View>
                  <View>
                    <Text>Remark :</Text>
                    <Text style={{color: 'black', fontSize: 12}}>
                      {ledger.remark}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No Ledger Data Available</Text>
          )}
        </View>

        {/* Booking Details Container */}
        <View style={styles.container}>
          <View style={styles.ViewContainer}>
            <Text style={styles.bookingTitle}>Booking Details</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => navigation.navigate('UpdateBooking', {item})}>
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.ViewContainer}>
            <Text style={styles.labelText}>Booking Status:</Text>
            <Text style={styles.valueText}>{item.status}</Text>
          </View>
          <View style={styles.ViewContainer}>
            <Text style={styles.labelText}>Full Name:</Text>
            <Text style={styles.valueText}>{item.fullName}</Text>
          </View>
          <View style={styles.ViewContainer}>
            <Text style={styles.labelText}>Check-In:</Text>
            <Text style={styles.valueText}>{item.checkIn}</Text>
          </View>
          <View style={styles.ViewContainer}>
            <Text style={styles.labelText}>Check-Out:</Text>
            <Text style={styles.valueText}>{item.checkOut}</Text>
          </View>
          <View style={styles.ViewContainer}>
            <Text style={styles.labelText}>Room Number:</Text>
            <View style={{flexDirection: 'row'}}>
              {item.rooms.map(Room => (
                <View key={Room._id} style={styles.smallContainer}>
                  <Text style={styles.roomTextContainer}>
                    {Room.roomNumber}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.ViewContainer}>
            <Text style={styles.labelText}>Guests:</Text>
            {item.guests.map(guest => (
              <Text
                style={styles.valueText}
                key={
                  guest._id
                }>{`${guest.name} (Age: ${guest.age}, Gender: ${guest.gender})`}</Text>
            ))}
          </View>
          <View style={styles.ViewContainer}>
            <Text style={styles.labelText}>Total Guests:</Text>
            <Text style={styles.valueText}>{item.numberOfGuest.total}</Text>
          </View>
          <View style={styles.ViewContainer}>
            <Text style={styles.labelText}>Amenities:</Text>
            <Text style={styles.valueText}>{item.aminities.join(', ')}</Text>
          </View>
          <View style={styles.ViewContainer}>
            <Text style={styles.labelText}>Booking Method:</Text>
            <Text style={styles.valueText}>{item.bookingMethod}</Text>
          </View>
        </View>

        {/* Document Upload Section */}

        {/* Fetched Images Section */}
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.uploadTitle}>Fetched Images</Text>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => setIsModalVisible(true)}>
              <Text style={styles.updateButtonText}>Add image</Text>
            </TouchableOpacity>
          </View>
          {fetchedImages.length > 0 ? (
            fetchedImages.map((imageUrl, index) => (
              <Image
                key={index}
                source={{uri: imageUrl}}
                style={styles.uploadedImage}
              />
            ))
          ) : (
            <Text>No images fetched yet</Text>
          )}
        </View>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          contentContainerStyle={styles.modalContent}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Upload Documents</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={selectImageFromGallery}>
                <Text style={styles.modalButtonText}>Select from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={captureImageWithCamera}>
                <Text style={styles.modalButtonText}>Capture Image</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Uploaded Images</Text>
            <ScrollView horizontal>
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <Image
                    key={index}
                    source={{uri: doc.uri}}
                    style={styles.modalUploadedImage}
                  />
                ))
              ) : (
                <Text style={styles.noDocumentsText}>
                  No documents uploaded yet
                </Text>
              )}
            </ScrollView>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.postButton]}
                onPress={handlePostImage}>
                <Text style={[styles.modalButtonText, styles.postButtonText]}>
                  Post Images
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default RoomDetails;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 4,
  },
  ledgerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ledgerItem: {
    backgroundColor: '#F3F6F9',
    borderRadius: 5,
    padding: 10,
  },
  marginTop10: {
    marginTop: 10,
  },
  ViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  methodView: {
    backgroundColor: '#28a745',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  noDataText: {
    textAlign: 'center',
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  labelText: {
    fontWeight: 'bold',
  },
  valueText: {
    flexShrink: 1,
  },
  smallContainer: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  roomTextContainer: {
    padding: 5,
    color: 'white',
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },

  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalUploadedImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  noDocumentsText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
  postButton: {
    backgroundColor: '#28a745',
  },
  postButtonText: {
    color: '#FFFFFF',
  },
});

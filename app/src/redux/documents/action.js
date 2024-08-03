import * as source from './source';

export const uploadDocumentFile = imageData => {
  return {
    type: 'UPLOAD_FILE',
    payload: source.uploadDocument(imageData),
  };
};

export const updateDocumentByID = (id, imageData) => {
  return {
    type: 'UPDATE_DOCUMENT',
    payload: source.updateDocument(id, imageData),
  };
};

export const getDocumentByLinkedIdDetails = id => {
  return {
    type: 'GET_DOCUMENT_BY_LINKEDID',
    payload: source.getDocumentByLinkedId(id),
  };
};

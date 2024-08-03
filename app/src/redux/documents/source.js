import {request} from '../../../request';

export const uploadDocument = imageData => {
  return request.postFormData('images', imageData);
};

export const updateDocument = (id, imageData) => {
  return request.putFormData(`images/linked/${id}`, imageData);
};

export const getDocumentByLinkedId = id => {
  return request.get(`images/linked/${id}`);
};

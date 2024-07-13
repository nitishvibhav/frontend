import * as source from './source';

export function postFilterationDetails(data) {
  return {
    type: 'POST_FILTERATION',
    payload: source.postFilteration(data),
  };
}

import * as source from './source';

export function getAminitiesCategoryDetails() {
  return {
    type: 'GET_AMENITIESCATEGORY',
    payload: source.getAminitiesCategory(),
  };
}


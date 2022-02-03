import actionTypes from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Please provide valid values',
      };

    case actionTypes.CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      };

    default:
      throw new Error(`No such action: ${action.type}`);
  }
};

export default reducer;

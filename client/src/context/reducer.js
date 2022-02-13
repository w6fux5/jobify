import actionTypes from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    // Alert
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

    // Register and Login
    case actionTypes.SETUP_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        userLocation: action.payload.userLocation,
        jobLocation: action.payload.userLocation,
        user: action.payload.user,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.alertText,
      };

    case actionTypes.SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload,
      };

    default:
      throw new Error(`No such action: ${action.type}`);
  }
};

export default reducer;

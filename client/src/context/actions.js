const actionTypes = {
  // Alert
  DISPLAY_ALERT: 'SHOW_ALERT',
  CLEAR_ALERT: 'CLEAR_ALERT',

  // User Setup
  SETUP_USER_BEGIN: 'SETUP_USER_BEGIN',
  SETUP_USER_SUCCESS: 'SETUP_USER_SUCCESS',
  SETUP_USER_ERROR: 'SETUP_USER_ERROR',

  // Update User
  UPDATE_USER_BEGIN: 'UPDATE_USER_BEGIN',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',

  LOGOUT_USER: 'LOGOUT_USER',

  // Set Job
  HANDLE_CHANGE: 'HANDLE_CHANGE',
  CLEAR_VALUES: 'CLEAR_VALUES',

  // SideBar
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
};

export default actionTypes;

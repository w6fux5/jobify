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

  // Set Job Form
  HANDLE_CHANGE: 'HANDLE_CHANGE',
  CLEAR_VALUES: 'CLEAR_VALUES',

  // Create Job
  CREATE_JOB_BEGIN: 'CREATE_JOB_BEGIN',
  CREATE_JOB_SUCCESS: 'CREATE_JOB_SUCCESS',
  CREATE_JOB_ERROR: 'CREATE_JOB_ERROR',

  // Edit Job
  EDIT_JOB_BEGIN: 'EDIT_JOB_BEGIN',
  EDIT_JOB_SUCCESS: 'EDIT_JOB_SUCCESS',
  EDIT_JOB_ERROR: 'EDIT_JOB_ERROR',

  // Get ALl Jobs
  GET_JOBS_BEGIN: 'GET_JOBS_BEGIN',
  GET_JOBS_SUCCESS: 'GET_JOBS_SUCCESS',

  // Set Edit Job
  SET_EDIT_JOB: 'SET_EDIT_JOB',

  // Delete Job
  DELETE_JOB_BEGIN: 'DELETE_JOB_BEGIN',

  // SideBar
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',

  // Stats
  SHOW_STATS_BEGIN: 'SHOW_STATS_BEGIN',
  SHOW_STATS_SUCCESS: 'SHOW_STATS_SUCCESS',
};

export default actionTypes;

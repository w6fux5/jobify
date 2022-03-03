import actionTypes from './actions';
import { initialState } from './AppContext';

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

    // User Setup
    case actionTypes.SETUP_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
        alertText: '',
        alertType: '',
      };

    case actionTypes.SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
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

    // Update User
    case actionTypes.UPDATE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
        alertText: '',
        alertType: '',
      };

    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        user: action.payload.user,
        showAlert: true,
        alertType: 'success',
        alertText: 'User Profile Update!',
      };

    case actionTypes.UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload,
      };

    case actionTypes.LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: '',
        userLocation: '',
        jobLocation: '',
      };

    // Toggle SIdebar
    case actionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        showSideBar: !state.showSideBar,
      };

    // Job Form Handle Change
    case actionTypes.HANDLE_CHANGE:
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      };

    // Job Form Clear values
    case actionTypes.CLEAR_VALUES:
      const initState = {
        isEditing: false,
        editJobId: '',
        position: '',
        company: '',
        jobLocation: state.userLocation,
        jobType: 'full-time',
        status: 'pending',
      };
      return {
        ...state,
        ...initState,
      };

    // Create Job
    case actionTypes.CREATE_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
        alertText: '',
        alertType: '',
      };

    case actionTypes.CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'New Job Created!',
      };

    case actionTypes.CREATE_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload,
      };

    // Get All Jobs
    case actionTypes.GET_JOBS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
        alertType: '',
        alertText: '',
      };

    case actionTypes.GET_JOBS_SUCCESS:
      const { numOfPages, totalJobs, jobs } = action.payload;
      return {
        ...state,
        isLoading: false,
        numOfPages,
        totalJobs,
        jobs,
      };

    // Set Edit Job
    case actionTypes.SET_EDIT_JOB:
      const job = state.jobs.find((el) => el._id === action.payload);
      const {
        company,
        jobLocation,
        jobType,
        _id: editJobId,
        position,
        status,
      } = job || {};
      return {
        ...state,
        isEditing: true,
        editJobId,
        company,
        jobLocation,
        jobType,
        position,
        status,
      };

    // Delete Job
    case actionTypes.DELETE_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    // Edit JOb
    case actionTypes.EDIT_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.EDIT_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Job Updated',
      };

    case actionTypes.EDIT_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload,
      };

    // Stats
    case actionTypes.SHOW_STATS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };

    case actionTypes.SHOW_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApplications,
      };

    case actionTypes.CLEAR_FILTERS:
      return {
        ...state,
        search: '',
        searchStatus: 'all',
        searchType: 'all',
        sort: 'latest',
      };

    case actionTypes.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };

    default:
      throw new Error(`No such action: ${action.type}`);
  }
};

export default reducer;

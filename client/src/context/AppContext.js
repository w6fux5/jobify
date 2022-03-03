import React, { useReducer, useContext } from 'react';

import axios from 'axios';

import reducer from './reducer';

import actionTypes from './actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',

  showSideBar: false,

  // User
  user: JSON.parse(user) || null,
  token: token || '',
  userLocation: userLocation || '',

  // Create and Edit Job
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  jobLocation: userLocation || '',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',

  // Get All Jobs
  jobs: [],
  totalJobs: 0,
  numOfPages: 0,
  page: 1,

  // Stats
  stats: {},
  monthlyApplications: [],

  // Search
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: actionTypes.DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: actionTypes.CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  };

  const logoutUser = () => {
    removeUserFromLocalStorage();
    dispatch({ type: actionTypes.LOGOUT_USER });
  };

  const toggleSideBar = () => {
    dispatch({ type: actionTypes.TOGGLE_SIDEBAR });
  };

  // @desc    1.Create a new user, 2.User Login 3.set user data to localStorage
  // @route   POST   /api/auth/register  /api/auth/login
  // @access  /pages/RegisterPage.jsx
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: actionTypes.SETUP_USER_BEGIN });

    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token, location } = data;

      dispatch({
        type: actionTypes.SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: actionTypes.SETUP_USER_ERROR,
        payload: error.response.data.message || error.response.data,
      });
    }

    clearAlert();
  };

  const updateUser = async (userData) => {
    dispatch({ type: actionTypes.UPDATE_USER_BEGIN });

    try {
      const { data } = await authFetch.patch('/auth/updateUser', userData);
      const { user, token, location } = data;

      dispatch({
        type: actionTypes.UPDATE_USER_SUCCESS,
        payload: { user, token, location },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: actionTypes.UPDATE_USER_ERROR,
          payload: error.response.data.message,
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: actionTypes.HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({ type: actionTypes.CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: actionTypes.CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post('/jobs', {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      dispatch({ type: actionTypes.CREATE_JOB_SUCCESS });
      clearValues();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: actionTypes.CREATE_JOB_ERROR,
        payload: error.response.data,
      });
    }
    clearAlert();
  };

  const getAllJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: actionTypes.GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { numOfPages, totalJobs, jobs } = data || {};
      dispatch({
        type: actionTypes.GET_JOBS_SUCCESS,
        payload: { numOfPages, totalJobs, jobs },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: actionTypes.SET_EDIT_JOB, payload: id });
  };

  const editJob = async () => {
    dispatch({ type: actionTypes.EDIT_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      dispatch({ type: actionTypes.EDIT_JOB_SUCCESS });
      dispatch({ type: actionTypes.CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: actionTypes.EDIT_JOB_ERROR,
        payload: error.response.data,
      });
    }
  };

  const deleteJob = async (jobID) => {
    dispatch({ type: actionTypes.DELETE_JOB_BEGIN });

    try {
      await authFetch.delete(`/jobs/${jobID}`);
      getAllJobs();
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
  };

  const showStats = async () => {
    dispatch({ type: actionTypes.SHOW_STATS_BEGIN });

    try {
      const { data } = await authFetch('/jobs/stats');
      dispatch({
        type: actionTypes.SHOW_STATS_SUCCESS,
        payload: {
          stats: data.stats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }

    clearAlert();
  };

  const clearFilter = () => {
    console.log('clear filter');
    dispatch({ type: actionTypes.CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({
      type: actionTypes.CHANGE_PAGE,
      payload: { page },
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        toggleSideBar,

        // User Login and Register
        setupUser,

        // User
        logoutUser,
        updateUser,

        // Create and Edit Job Form value
        handleChange,
        clearValues,

        // Jobs
        createJob,
        getAllJobs,
        setEditJob,
        deleteJob,
        editJob,

        // Stats
        showStats,

        clearFilter,

        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

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
  user: JSON.parse(user) || null,
  token: token || '',
  userLocation: userLocation || '',
  jobLocation: userLocation || '',

  showSideBar: false,
};

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
      dispatch({
        type: actionTypes.SETUP_USER_ERROR,
        payload: error.response.data.message,
      });
    }

    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSideBar,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

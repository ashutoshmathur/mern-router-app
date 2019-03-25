import axios from 'axios';
import { SIGNUP_SUCCESS, LOGIN_SUCCESS, SHOW_LOADING, SHOW_ERROR } from "../constants/action-types";
import { SIGNUP_URL, LOGIN_URL, PROFILE_URL } from "../constants/url";
import { setValueInLocalStore, getValueFromLocalStore, deleteValueFromLocalStore } from "../utils/localStore";
import { push } from 'connected-react-router';

const ajaxRequest = axios.create({
    timeout: 5000
  });

export const sendSignupRequest = (data) => {
  return dispatch => {
    dispatch(showLoading(true));

    ajaxRequest
      .post(SIGNUP_URL, data)
      .then(res => {
        setValueInLocalStore("user", res.data);
        dispatch(signupSuccess(res.data));
        dispatch(push('/login'));
        dispatch(showLoading(false));
      })
      .catch(err => {
        dispatch(showLoading(false));
        dispatch(showError(err.message));
      });
  };
};

const signupSuccess = data => ({
  type: SIGNUP_SUCCESS,
  payload: {
    ...data
  }
});

export const sendLoginRequest = (data) => {
  return dispatch => {
    dispatch(showLoading(true));

    ajaxRequest
      .post(LOGIN_URL, data)
      .then(res => {
        console.log("login res, ", res);
        setValueInLocalStore("user", res.data);
        dispatch(loginSuccess(res.data));
        dispatch(push('/profile'));
        dispatch(showLoading(false));
      })
      .catch(err => {
        dispatch(showLoading(false));
        dispatch(showError(err.message));
      });
  };
};

const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: {
    access_token: data.access_token,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    userId: data.userId
  }
});

export const getUserProfile = () => {
  return dispatch => {
    dispatch(showLoading(true));

    const currentUser = getValueFromLocalStore("user");
    console.log("getUserProfile, currentUser:  ", currentUser);
    if(currentUser) {
      ajaxRequest({
        method:'post',
        url:PROFILE_URL,
        data: {
          email: currentUser.email
        },
        headers: {'Authorization': `Bearer ${currentUser.access_token}`}
      })
      .then(res => {
          console.log("user profile res, ", res);
          if(res.status === 401) {
            deleteValueFromLocalStore("user");
            dispatch(push('/login'));
          } else {
            dispatch(push('/profile'));  
          }
          dispatch(showLoading(false));
        })
        .catch(err => {
          deleteValueFromLocalStore("user");
          dispatch(push('/login'));
          dispatch(showError(err.message));
          dispatch(showLoading(false));
        });
    };
  }
};

export const logoutUser = () => {
  return dispatch => {
    deleteValueFromLocalStore("user");
    console.log("logoutUser, user: ", getValueFromLocalStore("user"));
    dispatch(push('/login'));
  }
};

const showLoading = (isLoading) => ({
  type: SHOW_LOADING,
  payload: isLoading
});

const showError = error => ({
  type: SHOW_ERROR,
  payload: {
    error
  }
});
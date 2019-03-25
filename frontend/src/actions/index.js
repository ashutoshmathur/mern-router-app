import axios from 'axios';
import { SIGNUP_SUCCESS, LOGIN_SUCCESS, SHOW_LOADING, SHOW_ERROR } from "../constants/action-types";
import { SIGNUP_URL, LOGIN_URL } from "../constants/url";
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
        dispatch(showLoading(false));
        dispatch(signupSuccess(res.data));
        dispatch(push('/login'));
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
        dispatch(showLoading(false));
        dispatch(loginSuccess(res.data));
        dispatch(push('/profile'));
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
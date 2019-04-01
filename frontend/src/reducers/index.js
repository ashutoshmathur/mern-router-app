// The main reducer of the App
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { SIGNUP_SUCCESS, LOGIN_SUCCESS, SHOW_LOADING, SHOW_ERROR } from "../constants/action-types";

const initialState = {
  user: {},
  isLoading: false,
  apiError: {}
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, user: action.payload };
    case LOGIN_SUCCESS:
      return { 
        ...state, 
        user: action.payload
      };
    case SHOW_LOADING:
      return { ...state, isLoading: action.payload };
    case SHOW_ERROR:
      return { ...state, apiError: action.payload };
    default:
      return state;
  }
};

export default (history) => combineReducers({
  router: connectRouter(history),
  rootReducer
})
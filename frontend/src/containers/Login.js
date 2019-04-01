import { connect } from "react-redux";
import { sendLoginRequest, getUserProfile } from "../actions/index";
import LoginComponent from "../components/Login";

const mapDispatchToProps = dispatch => {
  return {
    sendLoginRequest: article => dispatch(sendLoginRequest(article)),
    getUserProfile: () => dispatch(getUserProfile())
  };
};

const mapStateToProps = (state) => {
  return {
      user: state.rootReducer.user,
      isLoading: state.rootReducer.isLoading,
      apiError: state.rootReducer.apiError
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;

import { connect } from "react-redux";
import { sendLoginRequest } from "../actions/index";
import LoginComponent from "../components/Login";

const mapDispatchToProps = dispatch => {
  return {
    sendLoginRequest: article => dispatch(sendLoginRequest(article))
  };
};

const mapStateToProps = (state) => {
  // console.log("state:  ", state)
  return {
      user: state.rootReducer.user,
      isLoading: state.rootReducer.isLoading,
      apiError: state.rootReducer.apiError
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;

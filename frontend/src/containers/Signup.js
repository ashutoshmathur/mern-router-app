import { connect } from "react-redux";
import { sendSignupRequest } from "../actions/index";
import SignupComponent from "../components/Signup";

const mapDispatchToProps = dispatch => {
  return {
    sendSignupRequest: data => dispatch(sendSignupRequest(data))
  };
};

const mapStateToProps = (state) => {
  return {
      user: state.rootReducer.user,
      isLoading: state.rootReducer.isLoading,
      apiError: state.rootReducer.apiError
  }
}

const Signup = connect(mapStateToProps, mapDispatchToProps)(SignupComponent);
export default Signup;

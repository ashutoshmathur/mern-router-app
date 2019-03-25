import { connect } from "react-redux";
import { sendSignupRequest } from "../actions/index";
import LandingPageComponent from "../components/LandingPage";

const mapDispatchToProps = dispatch => {
  return {
    sendSignupRequest: article => dispatch(sendSignupRequest(article))
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

const LandingPage = connect(mapStateToProps, mapDispatchToProps)(LandingPageComponent);
export default LandingPage;

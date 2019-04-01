import { connect } from "react-redux";
import { getUserProfile, logoutUser } from "../actions/index";
import DashboardComponent from '../components/Dashboard';

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: () => dispatch(getUserProfile()),
    logoutUser: () => dispatch(logoutUser())
  };
};

const mapStateToProps = (state) => {
  return {
      user: state.rootReducer.user,
      isLoading: state.rootReducer.isLoading,
      apiError: state.rootReducer.apiError
  }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);

export default Dashboard;

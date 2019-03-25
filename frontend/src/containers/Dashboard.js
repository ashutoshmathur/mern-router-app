import { connect } from "react-redux";
import DashboardComponent from '../components/Dashboard';

const mapStateToProps = (state) => {
  // console.log("state:  ", state)
  return {
      user: state.rootReducer.user,
      isLoading: state.rootReducer.isLoading,
      apiError: state.rootReducer.apiError
  }
}

const Dashboard = connect(mapStateToProps)(DashboardComponent);

export default Dashboard;

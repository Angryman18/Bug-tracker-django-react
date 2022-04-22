// vendors
import React, { useEffect } from "react";
import { connect } from "react-redux";

// components
import WelcomeUser from "../welcome/welcome";
import FullScreenModal from "../../components/fullscreenmodal/full-modal";

// services
import { retrieveAllProject } from "@actions/project.action";

const Dashboard = (props) => {
  const { dispatch } = props;
  useEffect(async () => {
    await dispatch(retrieveAllProject());
  }, []);

  return (
    <div>
      Dashboard
      {/* <FullScreenModal /> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Dashboard);

// vendors
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// components
import WelcomeUser from "../welcome/welcome";
import FullScreenModal from "../../components/fullscreenmodal/full-modal";
import Wrapper from "@components/wrapper/wrapper";

// services
import { retrieveAllProject } from "@actions/project.action";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = (props) => {
  const { dispatch } = props;
  useEffect(async () => {
    await dispatch(retrieveAllProject());
  }, []);

  const data = {
    labels: ["User", "Developer", "Tester"],
    datasets: [
      {
        data: [5, 3, 1],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Wrapper>
      <div className='my-6'>
        <h1 className='text-3xl pb-6 text-sideBarText'>Dashboard</h1>
        <hr />
      </div>
      <div className='grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 sm:gap-20 mx-auto w-full'>
        <div className='flex justify-center items-center 2xl:p-20 sm:p-5 border'>
          <div className="sm:w-3/4 sm:max-w-[60%] w-full">
            <Doughnut className="w-full" data={data} />
            <p className='text-center font-bold py-4'>Total Users</p>
          </div>
        </div>
        <div className='flex justify-center items-center border sm:p-5 2xl:p-20'>
          <div className="sm:w-3/4 sm:max-w-[60%] w-full">
            <Doughnut data={data} />
            <p className='text-center font-bold py-4'>Statistics</p>
          </div>
        </div>

        {/* <div className=''>
            <Doughnut data={data} />
          </div>
          <div className=''>
            <Doughnut data={data} />
          </div> */}
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Dashboard);

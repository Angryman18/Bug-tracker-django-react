// vendors
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

// components
import WelcomeUser from "../welcome/welcome";
import FullScreenModal from "../../components/fullscreenmodal/full-modal";
import Wrapper from "@components/wrapper/wrapper";
import Loader from "@components/spinner/loader.jsx";

// services
import { retrieveAllProject } from "@actions/project.action";
import { getDashboardStatics } from "@actions/dashboard.action";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = (props) => {
  const { dispatch } = props;
  const [loading, setLoading] = useState(false);
  const dashboard = useSelector((state) => state.DashboardReducer);

  useEffect(async () => {
    setLoading(true);
    await dispatch(retrieveAllProject());
    await dispatch(getDashboardStatics());
    setLoading(false);
  }, []);

  console.log("this is dashboard", dashboard);

  const userData = {
    labels: ["Developer", "User", "Tester"],
    datasets: [
      {
        data: Object.values(dashboard?.userData ?? {}),
        backgroundColor: [
          "rgba(59,134,134,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(254,132,2,1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataStats = {
    labels: ["Bugs", "Projects", "Features", "Comments"],
    datasets: [
      {
        data: Object.values(dashboard?.data_stats ?? {}),
        backgroundColor: [
          "rgba(107,72,255,1)",
          "rgba(245,88,123,1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const bugData = {
    labels: ["Bugs"],
    datasets: [
      {
        label: "Resolved Bugs",
        data: [dashboard?.bugData?.resolveBug],
        backgroundColor: "rgba(53, 162, 135, 1)",
      },
      {
        label: "Pending Bugs",
        data: [dashboard?.bugData?.pendingBug],
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
      {
        label: "In Progress",
        data: [dashboard?.bugData?.inProgressBug],
        backgroundColor: "rgba(53, 252, 235, 1)",
      },
      {
        label: "Rejected Bugs",
        data: [dashboard?.bugData?.rejectBug],
        backgroundColor: "rgba(255, 99, 132, 1) ",
      },
    ],
  };

  const featureData = {
    labels: ["Features"],
    datasets: [
      {
        label: "Accepted Features",
        data: [dashboard?.featData?.AcceptedFeature],
        backgroundColor: "rgba(53, 162, 135, 1)",
      },
      {
        label: "Unverified Features",
        data: [dashboard?.featData?.Unverified],
        backgroundColor: "rgba(249,206,0,1)",
      },
      {
        label: "Features in Talk",
        data: [dashboard?.featData?.inTalkFeature],
        backgroundColor: "rgba(38,148,171,1)",
      },
      {
        label: "Rejected Features",
        data: [dashboard?.featData?.rejectFeat],
        backgroundColor: "rgba(246,0,60,1)",
      },
    ],
  };

  return (
    <Wrapper>
      {loading && <Loader />}
      <div className='my-6'>
        <h1 className='text-3xl pb-6 text-sideBarText'>Dashboard</h1>
        <hr />
      </div>
      <div className='grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 sm:gap-20 mx-auto w-full'>
        <div className='flex justify-center items-center 2xl:p-20 sm:p-5 border'>
          <div className='sm:w-3/4 sm:max-w-[60%] w-full'>
            <Doughnut className='w-full' data={userData} />
            <p className='text-center font-bold py-4'>Total Users</p>
          </div>
        </div>
        <div className='flex justify-center items-center border sm:p-5 2xl:p-20'>
          <div className='sm:w-3/4 sm:max-w-[60%] w-full'>
            <Doughnut data={dataStats} />
            <p className='text-center font-bold py-4'>Data Overview</p>
          </div>
        </div>

        <div className='flex justify-center items-center border sm:p-5 2xl:p-20'>
          <div className=' w-full'>
            <Bar data={bugData} />
            <p className='text-center font-bold py-4'>Bug Overview</p>
          </div>
        </div>

        <div className='flex justify-center items-center border sm:p-5 2xl:p-20'>
          <div className=' w-full'>
            <Bar data={featureData} />
            <p className='text-center font-bold py-4'>Features Requests</p>
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
  const { dashboard } = state?.DashboardReducer;
  return { dashboard };
};

export default connect(mapStateToProps)(Dashboard);

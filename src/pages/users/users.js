// vendors
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import UserCard from "./user-card";
import Wrapper from "../../components/wrapper/wrapper";
import Table from "../../components/table/table.jsx";
import ProfileView from "../bug/profile-view";

// utils
import useDateFormat from "../../hooks/useFormat";

// actions
import { getAllUserDetails } from "../../actions/users.action";

const UsersList = () => {
  const clicked = useRef(false);
  const users = useSelector((state) => state?.UserReducer);
  const [filter, setFilter] = useState("");
  const [userQty, setUserQty] = useState({ Developer: 0, Tester: 0, User: 0 });
  const { formatDate } = useDateFormat();
  const [profileModal, setProfileModal] = useState({ modal: false, user: {} });
  const dispatch = useDispatch();

  const mountProfileData = (user) => {
    console.log(user);
    setProfileModal({ modal: true, user });
  };

  const tableColumns = [
    {
      Header: "Username",
      accessor: "user.username",
      Cell: (row) => {
        return (
          <p
            onClick={() => mountProfileData(row.row.original)}
            className='link cursor-pointer'
          >
            {row.value}
          </p>
        );
      },
    },
    {
      Header: "Role",
      accessor: "signedAs",
    },
    {
      Header: "Date Joined",
      accessor: "user.date_joined",
      Cell: (row) => {
        return formatDate(row.value);
      },
    },
  ];

  const cardClickHandler = (e, role) => {
    e.preventDefault();
    if (clicked.current && role === filter) {
      clicked.current = false;
      return setFilter("");
    }
    setFilter(role);
    clicked.current = true;
    return;
  };

  useEffect(() => {
    dispatch(getAllUserDetails())
      .then((res) => {
        let roleBasedUsers = { Developer: 0, Tester: 0, User: 0 };
        res.forEach((item) => {
          if (item.signedAs === "Developer") {
            roleBasedUsers.Developer += 1;
          } else if (item.signedAs === "Tester") {
            roleBasedUsers.Tester += 1;
          } else if (item.signedAs === "User") {
            roleBasedUsers.User += 1;
          }
        });
        return setUserQty(roleBasedUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <div className='my-6'>
        <h1 className='text-3xl pb-6 text-sideBarText'>Users Summary</h1>
        <hr />
      </div>
      <div className='grid lg:grid-cols-3 lg:h-44 grid-rows-3 gap-8'>
        <div className='h-44'>
          <UserCard
            role='Developer'
            className='bg-lightIndigo border-indigo-600'
            usersNumber={userQty.Developer}
            onClick={cardClickHandler}
          />
        </div>
        <div className='h-44'>
          <UserCard
            role='Tester'
            className='bg-lightRose border-rose-600'
            usersNumber={userQty.Tester}
            onClick={cardClickHandler}
          />
        </div>
        <div className='h-44'>
          <UserCard
            role='User'
            className='bg-lightOrange border-orange-600'
            usersNumber={userQty.User}
            onClick={cardClickHandler}
          />
        </div>
      </div>
      <Table
        data={users ?? []}
        filterValue={filter}
        columns={tableColumns}
        pagination={true}
      />
      <ProfileView
        showModal={profileModal.modal}
        toggle={() => setProfileModal({ modal: !profileModal.modal, user: {} })}
        profileObj={profileModal.user}
      />
    </Wrapper>
  );
};

export default UsersList;

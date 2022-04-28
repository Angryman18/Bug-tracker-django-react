import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Wrapper from "@components/wrapper/wrapper";
import Tab from "@components/tabs/tab";
import UserBugs from "./user-bugs";
import UserFeatures from "./user-features";
import Modal from "@components/modal/Modal.jsx";
import BugModal from "./bug-modal";
import FeatureModal from "./feature-modal";
import Alert from "@components/Alert/Alert";
import Loader from "@components/spinner/loader.jsx";
import DeleteConfirmation from "./components/delete-modal";

// actions
import { getUserSpeceficContent } from "@actions/manage.action";

// tab - 1 => BUGS
// tab - 2 => FEATURES
// tab - 3 => OTHER CONTENT

const BUGS = "BUGS";
const FEATURES = "FEATURES";

const ManagePage = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");
  const [view, setView] = useState("");
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state?.AuthReducer?.user);

  const [mountObject, setMountObject] = useState({});
  const [showBugModal, setShowBugModal] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const selectedOption = (value) => {
    setTab(value);
  };

  useEffect(() => {
    if (tab === "1") {
      setView(BUGS);
    } else if (tab === "2") {
      setView(FEATURES);
    } else {
      setView(null);
    }
  }, [tab]);

  useEffect(async () => {
    await dispatch(getUserSpeceficContent());
  }, []);

  const delelteModalHandler = e => {
    setShowDeleteModal(!showDeleteModal);
    setShowFeatureModal(false);
    setShowBugModal(false)
  }

  return (
    <Wrapper>
      {loading && <Loader />}
      <div className='my-6'>
        <h1 className='text-3xl pb-6 text-sideBarText'>Manage Content</h1>
        <hr />
      </div>
      <Tab selectedOption={selectedOption} />
      {userInfo.signedAs !== "Developer" && (
        <Alert>
          User/Tester can only view the content that they have created. Project
          Developer can only update it.
        </Alert>
      )}
      <div className='my-6'>
        <UserBugs
          view={view}
          setMountObject={setMountObject}
          setShowBugModal={setShowBugModal}
        />
        <UserFeatures
          view={view}
          setMountObject={setMountObject}
          setShowFeatureModal={setShowFeatureModal}
        />
      </div>

      <BugModal
        openModal={showBugModal}
        bugDetails={mountObject}
        toggle={() => setShowBugModal(!showBugModal)}
        setLoading={setLoading}
        deleteHandler={delelteModalHandler}
      />
      <FeatureModal
        openModal={showFeatureModal}
        featureDetails={mountObject}
        toggle={() => setShowFeatureModal(!showFeatureModal)}
        setLoading={setLoading}
        deleteHandler={delelteModalHandler}
      />
      <DeleteConfirmation
        openModal={showDeleteModal}
        toggle={() => setShowDeleteModal(!showDeleteModal)}
        deleteDetails={mountObject}
        setLoading={setLoading}
        view={view}
      />
    </Wrapper>
  );
};

export default ManagePage;

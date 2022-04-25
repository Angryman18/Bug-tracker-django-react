import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Button, Label } from "@material-tailwind/react";
import format from "date-fns/format";

// components
import Wrapper from "@components/wrapper/wrapper";
import { retrieveAllFeature } from "@actions/feature.action";
import Table from "@components/table/table.jsx";
import Loader from "@components/spinner/loader.jsx";
import AddFeatureModal from "./components/add-feature-modal";

const initialState = {
  allbugs: [],
  nodes: [],
  loading: false,
  showFeatureModal: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "getBugs":
      return { ...state, allbugs: action.payload };
    case "saveNode":
      if (!state.nodes.find((b) => b.id === action.payload.id)) {
        return { ...state, nodes: [...state.nodes, action.payload] };
      } else {
        const updateNode = state.nodes.map((node) => {
          if (node.id === action.payload.id) {
            return { ...node, more: action.payload.more };
          } else {
            return node;
          }
        });
        return { ...state, nodes: updateNode };
      }
    case "loading":
      return { ...state, loading: !state.loading };
    case "showFeatureModal":
      return { ...state, showFeatureModal: !state.showFeatureModal };
    default:
      return state;
  }
};

const Features = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer(reducer, initialState);

  const allBugs = useSelector((state) => state?.FeatureReducer);

  useEffect(() => {
    dispatch(retrieveAllFeature());
  }, [dispatch]);

  console.log(state);
  const handeMoreClick = (value, action) => (e) => {
    setState({ type: "saveNode", payload: { id: value, more: action } });
  };

  const columns = [
    {
      Header: "Summary",
      accessor: "title",
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: (row) => {
        const ifNodeExist = state?.nodes.find(
          (node) => node.id === row.row.original.id
        );
        if (ifNodeExist && ifNodeExist.more === true) {
          return (
            <div>
              {row.value}...
              <span
                onClick={handeMoreClick(row?.row?.original?.id, false)}
                className='link cursor-pointer'
              >
                Read less
              </span>
            </div>
          );
        } else if (row.value.length <= 50) {
          return row.value;
        }
        return (
          <div>
            {row.value.slice(0, 50)}...
            <span
              onClick={handeMoreClick(row?.row?.original?.id, true)}
              className='link cursor-pointer'
            >
              Read more
            </span>
          </div>
        );
      },
    },
    {
      Header: "Appealed By",
      accessor: "apealedBy.username",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (row) => {
        switch (row.value) {
          case "Unverified":
            return <Label color='deepOrange'>{row.value}</Label>;
          case "in Talk":
            return <Label color='blue'>{row.value}</Label>;
          case "Accepted":
            return <Label color='green'>{row.value}</Label>;
          case "Rejected":
            return <Label color='red'>{row.value}</Label>;
          default:
            return null;
        }
      },
    },
    {
      Header: "Appealed Date",
      accessor: "apealDate",
      Cell: row => {
        return format(new Date(row.value), "do MMM, yyyy")
      }
    },
  ];

  return (
    <Wrapper>
      {state.loading && <Loader />}
      <div className='my-6'>
        <h1 className='text-3xl pb-6 text-sideBarText'>Feature Requests</h1>
        <hr />
      </div>

      <div className='relative mt-4'>
        <div className='lg:absolute right-0 top-4'>
          <div className='flex gap-x-4 flex-row z-50'>
            <Button
              color='lightBlue'
              buttonType='filled'
              size='regular'
              rounded={false}
              block={false}
              iconOnly={false}
              ripple='light'
              onClick={() => setState({ type: "showFeatureModal" })}
            >
              Request Feature
            </Button>
          </div>
        </div>
        <Table columns={columns} data={allBugs} pagination={true} />
      </div>

      <AddFeatureModal
        showModal={state?.showFeatureModal}
        toggle={() => setState({ type: "showFeatureModal" })}
        projects={props.projects}
        forceLoading={() => setState({ type: "loading" })}
      />
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  const projects = state?.ProjectReducer?.data;
  return {
    projects,
  };
};

export default connect(mapStateToProps)(Features);

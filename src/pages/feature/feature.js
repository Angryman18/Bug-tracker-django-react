import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Wrapper from "@components/wrapper/wrapper";
import { retrieveAllFeature } from "@actions/feature.action";
import Table from "@components/table/table.jsx";

const initialState = {
  allbugs: [],
  nodes: [],
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

    default:
      return state;
  }
};

const Features = () => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer(reducer, initialState);

  const allBugs = useSelector((state) => state?.FeatureReducer);

  useEffect(() => {
    dispatch(retrieveAllFeature());
  }, []);

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
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Apealed Date",
      accessor: "apealDate",
    },
  ];

  return (
    <Wrapper>
      <div className='my-6'>
        <h1 className='text-3xl pb-6 text-sideBarText'>Feature Requests</h1>
        <hr />
      </div>
      <Table columns={columns} data={allBugs} />
    </Wrapper>
  );
};

export default Features;

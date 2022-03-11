const FeatureReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_FEATURE":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default FeatureReducer;
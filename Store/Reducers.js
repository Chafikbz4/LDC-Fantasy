// Reducer for userData
const userDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Reducer for modifier
const modifierReducer = (state = false, action) => {
  switch (action.type) {
    case "TRANS":
      return action.payload;
    default:
      return state;
  }
};

// Reducer for lastTeam
const lastTeamReducer = (state = [], action) => {
  switch (action.type) {
    case "GetLast":
      return action.payload;
    default:
      return state;
  }
};

// Reducer for captain
const captainReducer = (state = 0, action) => {
  switch (action.type) {
    case "Getcaptine":
      return action.payload;
    default:
      return state;
  }
};

// Reducer for last points
const lastPointsReducer = (state = 0, action) => {
  switch (action.type) {
    case "Getpoints":
      return action.payload;
    default:
      return state;
  }
};

export {
  userDataReducer,
  modifierReducer,
  lastTeamReducer,
  captainReducer,
  lastPointsReducer,
};

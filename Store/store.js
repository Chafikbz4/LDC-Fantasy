import { combineReducers, createStore } from "redux";
import { userDataReducer, modifierReducer, lastTeamReducer, captainReducer, lastPointsReducer } from "./Reducers";

// Combine the reducers
const rootReducer = combineReducers({
  userData: userDataReducer,
  modifier: modifierReducer,
  lastTeam: lastTeamReducer,
  captine: captainReducer,
  lastPoints: lastPointsReducer,
});

export const store = createStore(rootReducer);

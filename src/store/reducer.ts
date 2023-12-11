// rootReducer.js
import { combineReducers } from "redux";
import someReducer from "./testReducer/reducer";

const rootReducer = combineReducers({
  someReducer,
  // other reducers...
});

export default rootReducer;

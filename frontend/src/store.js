import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./Reducers/userReducer";
import { jobReducer } from "./Reducers/jobReducer";

const reducer = combineReducers({
  user: userReducer,
  jobs: jobReducer,
});

const middleware = [thunk];

const store = legacy_createStore(
  reducer,

  applyMiddleware(...middleware)
);

export default store;

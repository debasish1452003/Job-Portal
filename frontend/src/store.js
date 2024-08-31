import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./Reducers/userReducer";

const reducer = combineReducers({
  user: userReducer,
});

const middleware = [thunk];

const store = legacy_createStore(
  reducer,
  applyMiddleware(...middleware)
  // composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

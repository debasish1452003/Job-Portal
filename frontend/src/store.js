import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./Reducers/userReducer";
import { jobReducer } from "./Reducers/jobReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {
  user: {
    student: {
      isAuthenticatedStudent: false,
    },
    university: {
      isAuthenticatedUniversity: false,
    },
    employer: {
      isAuthenticatedEmployer: false,
    },
  },
};

// Middleware configuration
const middleware = [thunk];

const store = legacy_createStore(
  persistedReducer,

  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };

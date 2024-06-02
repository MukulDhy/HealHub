import { createStore } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "./Redux/reducers/user/userReducer";
import { combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { imageMlDetailsReducer, imageReducer } from "./Redux/reducers/image/imageReducer";

const loginFromStorge = localStorage.getItem("userLogin")
  ? JSON.parse(localStorage.getItem("userLogin"))
  : null;

const rootReducer = combineReducers({
  userDetail: userReducer,
  imgDet: imageReducer,
  imgMlInfo : imageMlDetailsReducer
});

const initialState = {
  userDetail: { user: loginFromStorge },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

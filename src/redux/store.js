import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import {
  Products,
  Count_of_orders,
  All_orders,
  Is_logged_in,
  Token,
  Address,
  Email,
  Count,
} from "./reducer";

const reducer = combineReducers({
  Products,
  Count_of_orders,
  All_orders,
  Is_logged_in,
  Token,
  Address,
  Email,
  Count,
});
const middleWare = [thunk];
const initialState = {
  Token: localStorage.getItem("token"),
  Count: localStorage.getItem("count")
    ? JSON.parse(localStorage.getItem("count"))
    : 0,
  Email: localStorage.getItem("email"),
  Is_logged_in: localStorage.getItem("login"),
  All_orders: localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : [],
  Address: localStorage.getItem("address")
    ? JSON.parse(localStorage.getItem("address"))
    : [],
};
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleWare)
);
export default store;

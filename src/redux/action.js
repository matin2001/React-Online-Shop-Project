import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";

export const getProducts = () => async (dispatch, getState) => {
  dispatch({
    type: "ProductLoading",
    payload: { data: [], error: "", loading: true },
  });
  try {
    const { data } = await axios.get("http://kzico.runflare.run/product/");
    dispatch({
      type: "ProductSuccess",
      payload: { data: [...data], error: "", loading: false },
    });
  } catch (error) {
    dispatch({
      type: "ProductError",
      payload: { data: [], error: error.message, loading: false },
    });
  }
};

export const Changing_order_count = () => async (dispatch, getState) => {
  const orders = getState().All_orders;
  let number = 0;
  for (let i = 0; i < orders.length; i++) {
    number = number + orders[i][3];
  }
  dispatch({
    type: "change_order",
    payload: number,
  });
};

export const Change_count = (str, name) => async (dispatch, getState) => {
  localStorage.removeItem("count");
  let count = getState().Count;
  const orders = getState().All_orders;
  if (str == "add") {
    count = count + 1;
  }
  if (str == "delete") {
    count = count - 1;
  }
  if (str == "clean") {
    for (let i = 0; i < orders.length; i++) {
      if (name == orders[i][1]) {
        count = count - orders[i][3];
      }
    }
  }
  localStorage.setItem("count", count);

  dispatch({
    type: "change_count",
    payload: count,
  });
};

export const Changing_order =
  (img, name, price, id, countInStock) => async (dispatch, getState) => {
    const orders = getState().All_orders;
    var bool = false;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i][1] === name) {
        bool = true;
        orders[i][3] += 1;
      }
    }
    if (bool === false) {
      orders.push([img, name, price, 1, id, countInStock]);
    }
    dispatch({
      type: "add_or_delete_order",
      payload: orders,
    });
  };

export const Cleaning_orders = () => async (dispatch, getState) => {
  const orders = [];
  dispatch({
    type: "clean_order",
    payload: orders,
  });
};

export const decreasing_order = (name) => async (dispatch, getState) => {
  const orders = getState().All_orders;
  for (let i = 0; i < orders.length; i++) {
    if (orders[i][1] === name) {
      orders[i][3] -= 1;
    }
  }
  dispatch({
    type: "delete_order",
    payload: orders,
  });
};

export const set_order = (temp) => async (dispatch, getState) => {
  dispatch({
    type: "set_order",
    payload: temp,
  });
};

export const writting_token = (token1) => async (dispatch, getState) => {
  dispatch({
    type: "change token",
    payload: token1,
  });
};

export const writting_email = (email1) => async (dispatch, getState) => {
  dispatch({
    type: "change email",
    payload: email1,
  });
};

export const logging_in = () => async (dispatch, getState) => {
  dispatch({
    type: "is logged in or not",
    payload: true,
  });
};

export const logging_out = () => async (dispatch, getState) => {
  dispatch({
    type: "is logged in or not for out",
    payload: false,
  });
};

export const Importing_Address =
  (city, address, postal, mobile) => async (dispatch, getState) => {
    dispatch({
      type: "writting address",
      payload: [city, address, postal, mobile],
    });
  };

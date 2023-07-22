export const Products = (
  state = { data: [], error: "", loading: false },
  { type, payload }
) => {
  switch (type) {
    case "ProductLoading":
      return payload;
    case "ProductSuccess":
      return payload;
    case "ProductError":
      return payload;
    default:
      return state;
  }
};


export const Count_of_orders = (
  state = 0,
  { type, payload }
) => {
  switch (type) {
    case "change_order":
      return payload;
    default:
      return state;
  }
};


export const Count = (
  state = 0,
  { type, payload }
) => {
  switch (type) {
    case "change_count":
      return payload;
    default:
      return state;
  }
};

export const All_orders = (
  state = [],
  { type, payload }
) => {
  switch (type) {
    case "add_or_delete_order":
      return payload;
    case "delete_order":
      return payload;
    case "set_order":
      return payload;
    case "clean_order":
      return payload;
    default:
      return state;
  }
};

export const Is_logged_in = (
  state = false,
  { type, payload }
) => {
  switch (type) {
    case "is logged in or not":
      return payload;
    case "is logged in or not for out":
      return payload;
    default:
      return state;
  }
};

export const Token = (
  state = "none",
  { type, payload }
) => {
  switch (type) {
    case "change token":
      return payload;
    default:
      return state;
  }
};

export const Email = (
  state = "none",
  { type, payload }
) => {
  switch (type) {
    case "change email":
      return payload;
    default:
      return state;
  }
};


export const Address = (
  state = ["", "", 0, 0],
  { type, payload }
) => {
  switch (type) {
    case "writting address":
      return payload;
    default:
      return state;
  }
};
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Badge, Button, CloseButton, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Change_count,
  Changing_order,
  Changing_order_count,
  decreasing_order,
  set_order,
} from "../redux/action";
import style from "./Cart.module.css";
import { Footer } from "./Footer";

const Cart = () => {
  const [data, setdata] = useState(useSelector((state) => state.All_orders));
  const check_login = useSelector((state) => state.Is_logged_in);
  const [cost, setcost] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let value = 0;
    //for(let i = 0; i<data.length; i++)
    data.map((item) => {
      value = value + item[2] * item[3];
    });
    setcost(value);
  }, [data]);
  const add_product = (image, name, price) => {
    const temp = [...data];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i][1] === name) {
        if (temp[i][3] < temp[i][5]) {
          temp[i][3] += 1;
          dispatch(Change_count("add"));
        } else {
          break;
        }
      }
    }
    setdata([...temp]);
    dispatch(set_order(temp));
    localStorage.setItem("orders", JSON.stringify(data));
  };
  const deleting_product = (name) => {
    const temp = [...data];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i][1] === name) {
        if (temp[i][3] > 1) {
          temp[i][3] -= 1;
          dispatch(Change_count("delete"));
        }
      }
    }
    setdata([...temp]);
    dispatch(set_order(temp));
    localStorage.setItem("orders", JSON.stringify(data));
  };
  const deleting_product_total = (name) => {
    const temp = [...data];
    const new_array = [];
    let index = 0;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i][1] === name) {
        continue;
      }
      new_array[index] = temp[i];
      index++;
    }
    dispatch(Change_count("clean", name));
    setdata([...new_array]);
    dispatch(set_order(new_array));
    localStorage.setItem("orders", JSON.stringify(new_array));
  };
  console.log(data);
  return (
    <div>
      {data.length ? (
        <div>
          <div
            style={{ width: "70vw", margin: "2vh auto" }}
            className={style.responsive_not}
          >
            <div style={{ fontSize: "5rem" }}>Your Cart</div>
            <div className={style.heading}>
              <span style={{ width: "7vw", textAlign: "left" }}>Number</span>
              <span style={{ width: "18vw", textAlign: "left" }}>Image</span>
              <span style={{ width: "20vw", textAlign: "left" }}>Name</span>
              <span style={{ width: "10vw", textAlign: "left" }}>Price</span>
              <span style={{ width: "15vw" }}>Count</span>
            </div>

            {data.map((item, index) => (
              <div className={style.cart} key={index}>
                <span
                  style={{ width: "5vw", textAlign: "left", marginLeft: "1vw" }}
                >
                  {index + 1}
                </span>
                <img
                  style={{
                    width: "5vw",
                    height: "7vh",
                    textAlign: "left",
                    marginRight: "15vw",
                  }}
                  src={item[0]}
                />
                <span
                  style={{
                    width: "20vw",
                    textAlign: "left",
                    marginLeft: "-1vw",
                  }}
                >
                  {item[1]}
                </span>
                <span style={{ width: "10vw", textAlign: "left" }}>
                  {item[2]} $
                </span>
                <span
                  style={{
                    width: "10vw",
                    display: "grid",
                    alignItems: "center",
                    alignContent: "center",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    margin: "0 0 0 3.5vw",
                  }}
                >
                  <span
                    className={style.add_or_delete}
                    style={{ marginRight: "1vw", cursor: "pointer" }}
                    onClick={() => deleting_product(item[1])}
                  >
                    -
                  </span>
                  <span className={style.add_or_delete}>{item[3]}</span>
                  <span
                    className={style.add_or_delete}
                    style={{ marginLeft: "1vw", cursor: "pointer" }}
                    onClick={() => add_product(item[0], item[1], item[2])}
                  >
                    +
                  </span>
                  <CloseButton
                    className={style.add_or_delete}
                    style={{
                      marginLeft: "1vw",
                      cursor: "pointer",
                      width: "0.2rem",
                      height: "0.2rem",
                      marginTop: "0.2rem",
                    }}
                    onClick={() => deleting_product_total(item[1])}
                  />
                </span>
              </div>
            ))}

            <div className={style.end}>
              <div style={{ padding: "0.4rem" }} className={style.button}>
                Total Price: {cost} $
              </div>
              <Button
                className={style.button}
                onClick={() => {
                  if (check_login) {
                    console.log("yes");
                    navigate("/address");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>

          <div
            style={{ width: "90vw", margin: "2vh auto" }}
            className={style.responsive}
          >
            <div style={{ fontSize: "3rem" }}>Your Cart</div>

            {data.map((item, index) => (
              <div className={style.cart} key={index}>
                <span
                  style={{
                    width: "5vw",
                    marginBottom: "2vh",
                    fontSize: "2rem",
                  }}
                >
                  {index + 1}
                </span>
                <img
                  style={{
                    width: "60vw",
                    height: "50vh",
                    borderRadius: "1rem",
                  }}
                  src={item[0]}
                />
                <span style={{ width: "80vw" }}>{item[1]}</span>
                <span>Price: {item[2]}$</span>
                <span
                  style={{
                    width: "50vw",
                    display: "grid",
                    alignItems: "center",
                    alignContent: "center",
                    gridTemplateColumns: "1fr 1fr 1fr",
                  }}
                >
                  <span
                    className={style.add_or_delete}
                    style={{ cursor: "pointer", color: "green" }}
                    onClick={() => deleting_product(item[1])}
                  >
                    -
                  </span>
                  <span className={style.add_or_delete}>{item[3]}</span>
                  <span
                    className={style.add_or_delete}
                    style={{ cursor: "pointer", color: "green" }}
                    onClick={() => add_product(item[0], item[1], item[2])}
                  >
                    +
                  </span>
                </span>
                <Button
                  variant="danger"
                  style={{
                    fontSize: "1rem",
                    width: "50vw",
                    height: "5vh",
                  }}
                  onClick={() => deleting_product_total(item[1])}
                >
                  Delete
                </Button>
              </div>
            ))}

            <div className={style.end}>
              <div className={style.button}>Total Price: {cost} $</div>
              <Button
                className={style.button}
                onClick={() => {
                  if (check_login) {
                    console.log("yes");
                    navigate("/address");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>

          <div className={style.footer}></div>
          <Footer />
        </div>
      ) : (
        <div>
          <div className={style.empty}>Your cart is empty</div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Cart;

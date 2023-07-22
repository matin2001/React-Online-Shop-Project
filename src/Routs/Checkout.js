import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Cleaning_orders } from "../redux/action";
import style from "./Checkout.module.css";

const Checkout = () => {
  const Address = useSelector((state) => state.Address);
  const Orders = useSelector((state) => state.All_orders);
  const token = useSelector((state) => state.Token);
  const Logged_or_not = useSelector((state) => state.Is_logged_in);
  console.log(Orders);
  console.log(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setstatus] = useState("");
  let orders1 = [];
  for (var i = 0; i < Orders.length; i++) {
    orders1.push({ product: Orders[i][4], qty: Orders[i][3] });
  }
  console.log(orders1);
  const req = async () => {
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/order/submit",
        {
          orderItems: orders1,
          shippingAddress: {
            address: Address[1],
            city: Address[0],
            postalCode: Address[2],
            phone: Address[3],
          },
          paymentMethod: "cash",
          shippingPrice: "5",
          totalPrice: 3,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setstatus(data);
      dispatch(Cleaning_orders());
      localStorage.setItem("orders", "");
      localStorage.setItem("address", "");
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      setstatus(error.response.data);
    }
  };
  return (
    <div>
      {!Logged_or_not ? (
        <div>
          <div className={style.error_res}>
            <div>you should log in first</div>
            <div>and don't have access to this page</div>
          </div>
          <div className={style.error}></div>
        </div>
      ) : (
        <div>
          <div className={style.responsive}>
            <p className={style.first_text}>
              Check the information and if you are sure about your shopping,
              click on Finish
            </p>

            <div className={style.total_cart}>
              <h3>Cart</h3>
              <div className={style.heading}>
                <span style={{ width: "12%", textAlign: "left" }}>Number</span>
                <span style={{ width: "18%", textAlign: "left" }}>Image</span>
                <span
                  style={{ width: "39%", textAlign: "left", marginLeft: "1%" }}
                >
                  Name
                </span>
                <span style={{ width: "13%", textAlign: "left" }}>Price</span>
                <span style={{ width: "17%", textAlign: "left" }}>Count</span>
              </div>
              {Orders.map((item, index) => (
                <div className={style.cart}>
                  <span
                    style={{
                      width: "10%",
                      textAlign: "left",
                      marginLeft: "1vw",
                    }}
                  >
                    {index + 1}
                  </span>
                  <img
                    style={{
                      width: "20%",
                      height: "90%",
                      textAlign: "left",
                    }}
                    src={item[0]}
                  />
                  <span style={{ width: "40%", textAlign: "left" }}>
                    {item[1]}
                  </span>
                  <span style={{ width: "15%", textAlign: "left" }}>
                    {item[2]} $
                  </span>
                  <span style={{ width: "15%", textAlign: "left" }}>
                    {item[3]}
                  </span>
                </div>
              ))}
              <Button
                variant="outline-warning"
                style={{ marginTop: "2vh" }}
                onClick={() => navigate("/cart")}
              >
                Edit Cart
              </Button>
            </div>

            <div className={style.address}>
              <Alert key="primary" variant="primary">
                <h3>Address</h3>
                <div className={style.city}>
                  <p>City : {Address[0]}</p>
                  <p>Postal Code : {Address[2]}</p>
                  <p>Mobile : {Address[3]}</p>
                </div>
                <p className={style.add}>Address : {Address[1]}</p>
                <Button
                  onClick={() => navigate("/address")}
                  variant="outline-danger"
                >
                  Edit Address
                </Button>
              </Alert>
            </div>
            <Button
              onClick={() => {
                Swal.fire({
                  title: "Buy the Products?",
                  showDenyButton: true,
                  confirmButtonText: "Buy",
                  denyButtonText: `Cancel`,
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    req();
                    Swal.fire("Successful");
                  } else if (result.isDenied) {
                    Swal.fire("Buying Staff Canceled");
                  }
                });
              }}
              variant="primary"
              size="lg"
              className={style.Button}
            >
              Finish
            </Button>
          </div>
          <div className={style.responsive_not}>
            <p className={style.first_text}>
              Check the information and if you are sure about your shopping,
              click on Finish
            </p>

            <div className={style.total_cart}>
              <h3>Check your cart here</h3>

              {Orders.map((item, index) => (
                <div className={style.cart}>
                  <span style={{ fontSize: "2rem" }}>{index + 1}</span>
                  <span style={{ marginBottom: "2vh" }}>{item[1]}</span>
                  <img
                    style={{
                      width: "50vw",
                      height: "30vh",
                    }}
                    src={item[0]}
                  />
                  <span style={{ margin: "2vh auto" }}>Price: {item[2]} $</span>
                  <span style={{}}>Count: {item[3]}</span>
                </div>
              ))}
              <Button
                variant="outline-warning"
                style={{ marginTop: "4vh", width: "60vw" }}
                onClick={() => navigate("/cart")}
              >
                Edit Cart
              </Button>
            </div>

            <div className={style.address}>
              <Alert key="primary" variant="primary">
                <h3>Address</h3>
                <div className={style.city}>
                  <p>City : {Address[0]}</p>
                  <p>Postal Code : {Address[2]}</p>
                  <p>Mobile : {Address[3]}</p>
                </div>
                <p className={style.add}>Address : {Address[1]}</p>
                <Button
                  onClick={() => navigate("/address")}
                  variant="outline-danger"
                >
                  Edit Address
                </Button>
              </Alert>
            </div>
            <Button
              onClick={() => {
                Swal.fire({
                  title: "Buy the Products?",
                  showDenyButton: true,
                  confirmButtonText: "Buy",
                  denyButtonText: `Cancel`,
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    req();
                    Swal.fire("Successful");
                  } else if (result.isDenied) {
                    Swal.fire("Buying Staff Canceled");
                  }
                });
              }}
              variant="primary"
              size="lg"
              className={style.Button}
            >
              Finish
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

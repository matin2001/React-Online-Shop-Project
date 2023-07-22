import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import style from "./Order.module.css";

const Order = () => {
  const navigate = useNavigate();
  const [status, setstatus] = useState("");
  const [get, setget] = useState(false);
  const [loading, setloading] = useState(false);
  const token = useSelector((state) => state.Token);
  const Logged_or_not = useSelector((state) => state.Is_logged_in);

  const req = async () => {
    setloading(true);
    try {
      const { data } = await axios.get("http://kzico.runflare.run/order/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setstatus(data);
      setloading(false);
    } catch (error) {
      setstatus(error.response.data);
      setloading(false);
    }
  };
  useEffect(() => {
    if (!get) {
      req();
      setget(true);
    }
  }, [get]);
  console.log(status);
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
      {loading ? (
        <Spinner animation="grow" variant="dark" />
      ) : status.status != 500 ? (
        <div>
          <div className={style.not_responsive}>
            <h1>Order Page</h1>
            {status ? (
              <div className={style.table}>
                <div>
                  <div className={style.table_h}>
                    <div>#</div>
                    <div>Orders List</div>
                    <div>Total Price</div>
                    <div>Order Id</div>
                    <div></div>
                  </div>
                  <div className={style.orders}>
                    {status.map((item, index) => (
                      <div className={index % 2 ? style.g1 : style.g2}>
                        <div className={style.table_b} key={index}>
                          <div className={style.b_items1}>{index + 1}</div>
                          <div className={style.b_items2}>
                            {item.orderItems.map((item1, index1) => (
                              <div>
                                {index1 + 1}.{item1.product.name}
                              </div>
                            ))}
                          </div>
                          <div className={style.b_items3}>
                            {item.totalPrice} $
                          </div>
                          <div className={style.b_items4}>{item._id}</div>
                          <div className={style.b_items5}>
                            <button
                              className={style.button2}
                              onClick={() => {
                                navigate("/order/" + item._id);
                              }}
                            >
                              More information
                            </button>
                          </div>
                        </div>
                        {/* <div className={style.added_line}></div> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={style.responsive}>
            <h1>Order Page</h1>
            {status ? (
              <div className={style.table}>
                {status.map((item, index) => (
                  <div className={index % 2 ? style.g1 : style.g2}>
                    <div className={style.table_b} key={index}>
                      <div className={style.b_items1}>{index + 1}</div>
                      <div className={style.b_items2}>
                        {item.orderItems.map((item1, index1) => (
                          <div>
                            {index1 + 1}.{item1.product.name}
                          </div>
                        ))}
                      </div>
                      <div className={style.b_items3}>Price: {item.totalPrice}$</div>
                      <div className={style.b_items4}>Id: {item._id}</div>
                      <div className={style.b_items5}>
                        <button
                          className={style.button2}
                          onClick={() => {
                            navigate("/order/" + item._id);
                          }}
                        >
                          More information
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div>No Order has been submitted</div>
      )}
    </div>
     )}
     </div>
  );
};

export default Order;

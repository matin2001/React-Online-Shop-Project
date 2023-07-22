import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Alert, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import style from "./OrderId.module.css";

const OrderId = () => {
  const [status, setstatus] = useState("");
  const token = useSelector((state) => state.Token);
  const [loading, setloading] = useState(false);
  const [get, setget] = useState(false);
  const Logged_or_not = useSelector((state) => state.Is_logged_in);
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);
  const req = async () => {
    setloading(true);
    try {
      const { data } = await axios.get(
        `http://kzico.runflare.run/order/${params.orderId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
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
  let array = status.orderItems;
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
          ) : (
            <div>
              {status.orderItems ? (
                <div>
                  <Alert
                    key="info"
                    variant="info"
                    className={style.title_alert}
                  >
                    <span className={style.title_text}>
                      Id of this order is:
                    </span>
                    <span className={style.title_id}>{status._id}</span>
                  </Alert>
                  <div>
                    <h2>Products in the order</h2>
                    <div className={style.oorr}>
                      <div>#</div>
                      <div>Name</div>
                      <div>Image</div>
                      <div>Color</div>
                      <div>Category</div>
                      <div>Price</div>
                      <div>Count</div>
                    </div>
                    <div className={style.separator}></div>
                    {array.map((item, index) => (
                      <div className={style.orders} key={index}>
                        <div className={index % 2 ? style.g1 : style.g2}>
                          <div>{index + 1}</div>
                          <div>{item.product.name}</div>
                          <img
                            src={item.product.image}
                            className={style.image}
                          />
                          <div>
                            <span className={style.res}>Color: </span>
                            {item.product.color}
                          </div>
                          <div>
                            <span className={style.res}>Category: </span>
                            {item.product.category}
                          </div>
                          <div>
                            <span className={style.res}>Price: </span>
                            {item.product.price} $
                          </div>
                          <div>
                            <span className={style.res}>Count: </span>
                            {item.qty}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={style.added_info}>
                    <div>
                      <h5 className={style.heading}>Total Price</h5>
                      <h3>{status.totalPrice}$</h3>
                    </div>

                    <div>
                      <h5 className={style.heading}>Shipping Price</h5>
                      <h3>{status.shippingPrice} $</h3>
                    </div>
                    <div>
                      <h5 className={style.heading}>Payment Method</h5>
                      <h3>{status.paymentMethod}</h3>
                    </div>
                  </div>
                  <Accordion className={style.Accordion}>
                    <Accordion.Item>
                      <Accordion.Header>
                        Click to see the Address
                      </Accordion.Header>
                      <Accordion.Body>
                        <div style={{ textAlign: "left" }}>
                          <span className={style.heading1}>Address: </span>
                          <span>{status.shippingAddress.address}</span>
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <span className={style.heading1}>City: </span>
                          <span>{status.shippingAddress.city}</span>
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <span className={style.heading1}>Postal Code: </span>
                          <span>{status.shippingAddress.postalCode}</span>
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <span className={style.heading1}>Phone Number: </span>
                          <span>{status.shippingAddress.phone}</span>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderId;

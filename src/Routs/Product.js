import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  ListGroup,
  OverlayTrigger,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Change_count, Changing_order, Changing_order_count } from "../redux/action";
import { Footer } from "./Footer";
import Header from "./Header";
import style from "./Product.module.css";

const Product = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  console.log(params)
  const dispatch = useDispatch();
  const [clicked, setclicked] = useState(false);
  const Products = useSelector((state) => state.All_orders);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `http://kzico.runflare.run/product/${params.productId}`
        );
        setloading(true);
        setData(data);
      } catch (error) {}
    }
    fetchData();
  }, []);
  const check_count = (name) => {
    for (let i = 0; i < Products.length; i++) {
      if (Products[i][1] == name) {
        console.log(Products[i][3])
        if (Products[i][3] < data.countInStock) return true;
        else return false;
      }
    }
    return true
  };
  useEffect(() => {
    if (clicked) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Added To Cart successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setclicked(false);
    }
  }, [clicked]);
  return (
    <div>
      {!loading ? (
        <div className={style.loading}>
          <Spinner animation="border" variant="primary" />
          <div>Loading...</div>
          <div>Please Wait</div>
        </div>
      ) : (
        <div>
          <div className={style.main}>
            <img src={data.image} className={style.image} />
            <div className={style.a}>
              <Card className={style.b}>
                <Card.Header className={style.title}>{data.name}</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item style={{ height: "6vh" }}>
                    Color: {data.color}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ height: "6vh" }}>
                    Count In Stock: {data.countInStock}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ height: "10vh" }}>
                    <div className="d-grid gap-2">
                      <Button
                        className={data.countInStock == 0 ? style.dis : ""}
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          if (data.countInStock == 0) {
                            console.log("NNTNT");
                          } else if(check_count(data.name)==true){
                            dispatch(Changing_order_count());
                            dispatch(Change_count("add"));
                            dispatch(
                              Changing_order(
                                data.image,
                                data.name,
                                data.price,
                                data._id,
                                data.countInStock
                              )
                            );
                            localStorage.setItem(
                              "orders",
                              JSON.stringify(Products)
                            );
                            setclicked(true);
                          }
                          else{
                            Swal.fire({
                              position: "center",
                              icon: "error",
                              title: "There is not enough stock",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          }
                        }}
                      >
                        add to cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
          </div>
          <div style={{ width: "80%", margin: "0 auto" }}>
            <div className={style.price_rating}>
              <div text="dark" className={style.badge}>
                Price: {data.price} $
              </div>
              <div text="dark" className={style.badge}>
                Rating: {data.rating}
              </div>
            </div>
            <div className={style.brand}>
              <OverlayTrigger
                className={style.trigger}
                key={"bottom"}
                placement={"bottom"}
                overlay={
                  <Tooltip id={`tooltip-${"bottom"}`}>{data.brand}</Tooltip>
                }
              >
                <Button variant="success">Brand</Button>
              </OverlayTrigger>
              <OverlayTrigger
                className={style.trigger}
                key={"bottom"}
                placement={"bottom"}
                overlay={
                  <Tooltip id={`tooltip-${"bottom"}`}>{data.category}</Tooltip>
                }
              >
                <Button variant="success">Category</Button>
              </OverlayTrigger>
              <OverlayTrigger
                className={style.trigger}
                key={"bottom"}
                placement={"bottom"}
                overlay={
                  <Tooltip id={`tooltip-${"bottom"}`}>
                    {data.numReviews}
                  </Tooltip>
                }
              >
                <Button variant="success">Number Of Reviews</Button>
              </OverlayTrigger>
            </div>
            <Accordion className={style.accordion} defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>{data.description}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      )}
      <div className={style.footer}></div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Product;

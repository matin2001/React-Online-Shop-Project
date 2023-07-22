import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts, logging_out, writting_token } from "../redux/action";
import { Footer } from "./Footer";
import style from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const Products = useSelector((state) => state.Products.data);
  const loading = useSelector((state) => state.Products.loading);
  const token = useSelector((state) => state.Token);
  const [status, setstatus] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const req = async () => {
    try {
      const { data } = await axios.get(
        "http://kzico.runflare.run/user/profile",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setstatus(data);
    } catch (error) {
      setstatus(error.response.data);
    }
  };
  useEffect(() => {
    req();
  }, []);
  useEffect(() => {
    if (status && status.status != 200 && status.status) {
      localStorage.removeItem("token");
      localStorage.removeItem("login");
      dispatch(writting_token(null));
      dispatch(logging_out());
    }
  }, [status]);
  return (
    <div>
      <div className={style.top_page}></div>
      <Alert className={style.head_text} key="info" variant="info">
        Welcome To our Site. You can find different types of computer equipments
        in our site. Hope you enjoy it!
      </Alert>
      {loading ? (
        <div>
          <h2 style={{ marginTop: "5vh" }}>Loading, Please Wait</h2>
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <div className={style.mainPage}>
            {Products.map((item) => (
              <Card key={item._id} className={style.Card}>
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ height: "300px" }}
                />
                <Card.Body>
                  <Card.Title style={{ height: "60px" }}>
                    {item.name}
                  </Card.Title>
                  <Card.Text className="mt-4" style={{ height: "30px" }}>
                    {item.countInStock
                      ? `Stock = ${item.countInStock}`
                      : "Not in the shop"}
                  </Card.Text>
                  <div className={style.Card_text}>
                    <Badge
                      style={{ width: "100%", height: "20px" }}
                      bg="success"
                    >
                      Price: {item.price} $
                    </Badge>
                    <Badge
                      style={{ width: "100%", height: "20px" }}
                      bg="warning"
                      text="dark"
                    >
                      Rating:
                      {item.rating}
                    </Badge>
                  </div>
                  <Button
                    style={{ marginTop: "1.5vh", width: "90.5%" }}
                    variant="primary"
                    onClick={() => navigate("/product/" + item._id)}
                  >
                    More Information
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
      <div className={style.footer}></div>
      <Footer />
    </div>
  );
};

export default Home;

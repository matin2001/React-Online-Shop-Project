import React, { useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  Navbar,
} from "react-bootstrap";
import MyImage from "./shopping_cart.png";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Changing_order_count,
  logging_in,
  logging_out,
  writting_token,
} from "../redux/action";
import style from "./Header.module.css";
import { GrCart } from "react-icons/gr";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.Is_logged_in);
  const Orders = useSelector((state) => state.All_orders);
  const token = useSelector((state) => state.Token);
  const email = useSelector((state) => state.Email);
  const count = useSelector((state) => state.Count_of_orders);
  const count1 = useSelector((state) => state.Count);
  const log_out = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    dispatch(writting_token(null));
    dispatch(logging_out());
  };
  useEffect(() => {
    if (email == null) {
      log_out();
    }
  }, email);
  useMemo(() => dispatch(Changing_order_count()), [Orders]);
  // useEffect(()=>{

  // },[Orders])
  console.log(Orders);
  console.log(count1);
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Matin Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <Button
                  className={style.cart}
                  onClick={() => navigate("/cart")}
                  variant="primary"
                >
                  <span className={style.cart_c}>{count1}</span>
                  <span className={style.icon}>
                    <GrCart />
                  </span>
                </Button>
              </Nav.Link>
              {!logged ? (
                <Nav.Link>
                  <Button
                    variant="success"
                    eventKey={2}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </Nav.Link>
              ) : (
                <Nav.Link>
                  <DropdownButton
                    variant="success"
                    id="dropdown-basic"
                    title={email}
                  >
                    <Dropdown.Item onClick={() => navigate("/profile")}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/order")}>
                      Orders
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => navigate("/setting/changeProfile")}
                    >
                      Setting
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        log_out();
                        navigate("/");
                      }}
                    >
                      Log out
                    </Dropdown.Item>
                  </DropdownButton>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;

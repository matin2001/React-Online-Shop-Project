import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Importing_Address } from "../redux/action";
import style from "./Address.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Address = () => {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [mobile, setMobile] = useState("");
  const add_redux = useSelector((state) => state.Address);
  const Logged_or_not = useSelector((state) => state.Is_logged_in);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Importing_Address(city, address, postal, mobile));
  }, [city, address, postal, mobile]);
  console.log(add_redux);
  const check_address = () => {
    let city_b = true;
    let address_b = true;
    let postal_b = true;
    let mobile_b = true;
    if (city.length == 0) {
      city_b = false;
      console.log("change the city");
      toast.error("Please Enter your city", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (address.length <= 10) {
      address_b = false;
      console.log("change the address");
      toast.error("Please Enter your address Correctly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (postal.length == 0) {
      postal_b = false;
      console.log("change the postal");
      toast.error("Please Enter your postal code", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (postal.length !== 10) {
      postal_b = false;
      console.log("change the postal");
      toast.error("Please Enter your postal code Correctly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // I'm not sure to use this or not

      // } else if (!/^\\d{5}-\\d{5}$/.test(postal)) {
      //   mobile_b = false;
      //   toast.error("Please Enter your Postal Code Correctly", {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "dark",
      //   });
    }

    if (mobile.length == 0) {
      mobile_b = false;
      console.log("change the mobile");
      toast.error("Please Enter your mobile", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (mobile.length != 11) {
      mobile_b = false;
      toast.error("Please Enter your mobile Correctly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (!/^(\+98|0)?9\d{9}$/.test(mobile)) {
      mobile_b = false;
      toast.error("Please Enter your mobile Correctly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (city_b && address_b && postal_b && mobile_b) {
      dispatch(Importing_Address(city, address, postal, mobile));
      localStorage.setItem(
        "address",
        JSON.stringify([city, address, postal, mobile])
      );
      navigate("/checkout");
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
        <div style={{ width: "100vw" }}>
          <div className={style.addpage}>
            <div className={style.content}>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4" className={style.text}>
                    City
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      className={style.city}
                      type="text"
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4" className={style.text}>
                    Address
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      className={style.address}
                      type="text"
                      as="textarea"
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Address"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4" className={style.text}>
                    Postal Code
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      className={style.city}
                      type="number"
                      onChange={(e) => setPostal(e.target.value)}
                      placeholder="Postal Code"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4" className={style.text}>
                    Mobile
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      className={style.city}
                      type="number"
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Mobile"
                    />
                  </Col>
                </Form.Group>
              </Form>
              <button
                className={style.button_29}
                onClick={() => check_address()}
                role="button"
              >
                next
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Address;

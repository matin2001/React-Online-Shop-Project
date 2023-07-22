import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "../App.css";
import { logging_in, writting_email, writting_token } from "../redux/action";
import style from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setstatus] = useState({});
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const token = useSelector((state) => state.Token);
  const email1 = useSelector((state) => state.Email);
  const Logged_or_not = useSelector((state) => state.Is_logged_in);
  const req = async () => {
    if (email.length == 0) {
      toast.error("Please Enter your email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (password.length == 0) {
      //city_b = false;
      toast.error("Please Enter your password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else
      try {
        const { data } = await axios.post(
          "http://kzico.runflare.run/user/login",
          {
            email: email,
            password: password,
          }
        );
        setstatus(data);
        dispatch(writting_token(data.user.token));
        dispatch(writting_email(data.user.email));
      } catch (error) {
        setstatus(error.response.data);
      }
  };
  useEffect(() => {
    if (status && status.status == 200) {
      dispatch(logging_in());
    }
    if (status.status === 200) {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("login", "true");
    }
  }, [status]);
  const [clicked, setclicked] = useState(false);
  useEffect(() => {
    if (clicked) {
      if (status.status == 200) {
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title:
            status.message.charAt(0).toUpperCase() + status.message.slice(1),
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  }, [status]);
  console.log(localStorage.getItem("token"));
  console.log(token);
  console.log(email1);
  return (
    <div>
      {Logged_or_not ? (
        <div>
          <div className={style.error_res}>
            <div>you are logged in</div>
            <div>and don't have access to this page</div>
          </div>
          <div className={style.error}></div>
        </div>
      ) : (
        <div className="login_page">
          <div style={{ width: "50%", margin: "0 auto" }}>
            <Form className="pt-5">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <p style={{ fontSize: "30px" }}>Welcome To our Site</p>
                <p style={{ fontSize: "20px" }}>Please Login</p>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Enter email"
                  style={{ opacity: "70%" }}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Password"
                  style={{ opacity: "70%" }}
                />
              </Form.Group>
            </Form>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                req();
                setclicked(true);
              }}
            >
              Submit
            </Button>

            <p
              style={{ marginTop: "10px", color: "white", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Don't have an account?
            </p>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Login;

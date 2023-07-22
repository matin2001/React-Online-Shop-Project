import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import style from "./Signup.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [mobile, setmobile] = useState("");
  const [status, setstatus] = useState({});
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
    } else if (username.length == 0) {
      toast.error("Please Enter your username", {
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
    } else if (confirmPassword.length == 0) {
      toast.error("Please Enter your password confirm", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (mobile.length == 0) {
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
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error("Please Enter your email Correcty", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      toast.error(
        "Your password should have at least 8 characters and should contain numbers, letters and special characters",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } else if (confirmPassword !== password) {
      toast.error("Your password and confirm are not the same", {
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
          "http://kzico.runflare.run/user/signup",
          {
            username: username,
            email: email,
            password: password,
            mobile: mobile,
          }
        );
        console.log(data);
        setstatus(data);
      } catch (error) {
        console.log(error.response.data);
        setstatus(error.response.data);
      }
  };
  console.log(status);
  const [clicked, setclicked] = useState(false);
  useEffect(() => {
    if (clicked && status) {
      if (status.status == 201) {
        navigate("/login");
        Swal.fire({
          position: "center",
          icon: "success",
          title: status.message,
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title:
            //status.message.charAt(0).toUpperCase() + status.message.slice(1),
            status.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  }, [status]);
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
          <div className={style.signup}>
            <Form className="pt-5" onSubmit={(e) => e.preventdefault()}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <p style={{ fontSize: "30px" }}>Welcome To our Site</p>
                <p style={{ fontSize: "20px" }}>Sign up for free</p>
                <Form.Label className={style.label}>Email address</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Enter email"
                  style={{ opacity: "70%" }}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label className={style.label}>Username</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  onChange={(e) => setusername(e.target.value)}
                  placeholder="Username"
                  style={{ opacity: "70%" }}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label className={style.label}>Password</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Password"
                  style={{ opacity: "70%" }}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label className={style.label}>
                  Confirm Password
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  style={{ opacity: "70%" }}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label className={style.label}>Mobile</Form.Label>
                <Form.Control
                  size="sm"
                  type="mobile"
                  onChange={(e) => setmobile(e.target.value)}
                  placeholder="Mobile"
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
              Sign Up
            </Button>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Signup;

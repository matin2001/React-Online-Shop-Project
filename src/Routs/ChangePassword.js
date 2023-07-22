import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import style from "./ChangePassword.module.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [new_password1, setnew_password1] = useState("");
  const [new_password2, setnew_password2] = useState("");
  const [old_password, setold_password] = useState("");
  const [clicked, setclicked] = useState(false);
  console.log(old_password);
  console.log(new_password1);
  console.log(new_password2);
  const [status, setstatus] = useState("");
  const token = useSelector((state) => state.Token);
  const Logged_or_not = useSelector((state) => state.Is_logged_in);

  useEffect(() => {
    if (clicked) {
      if (status.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Password changed successfully",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title:
            status.message.charAt(0).toUpperCase() + status.message.slice(1),
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }
  }, [status]);
  const req = async () => {
    if (old_password.length == 0) {
      toast.error("Please enter your old password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (new_password1.length == 0) {
      toast.error("Please enter your new password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (new_password2.length == 0) {
      toast.error("Please enter your confirm password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        new_password1
      )
    ) {
      toast.error(
        "Your new password should have at least 8 characters and should contain numbers, letters and special characters",
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
    } else if (new_password1 != new_password2) {
      toast.warn("Your passwords are not the same!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else
      try {
        const { data } = await axios.put(
          "http://kzico.runflare.run/user/change-password",
          {
            old_password: old_password,
            new_password: new_password1,
          },
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
          <div className={style.main}>
            <div className={style.sidebar}>
              <h2 className={style.setting}>Setting</h2>
              <h3
                className={style.h3}
                onClick={() => navigate("/setting/changeProfile")}
              >
                Change Profile
              </h3>
              <h3 className={style.selected}>Change Password</h3>
              <h3
                className={style.h3}
                onClick={() => navigate("/setting/uploadAvatar")}
              >
                Upload Avatar
              </h3>
            </div>
            <div className={style.content}>
              <div className={style.card}>
                <h2 className={style.title}>Please Enter Your Password</h2>
                <Form.Group
                  as={Row}
                  className={style.input}
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="4">
                    Old Password
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      className={style.form}
                      type="password"
                      onChange={(e) => setold_password(e.target.value)}
                      placeholder="Password"
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="4">
                    New Password
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      className={style.form}
                      type="password"
                      onChange={(e) => setnew_password1(e.target.value)}
                      placeholder="Password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="4">
                    New Password
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      className={style.form}
                      type="password"
                      onChange={(e) => setnew_password2(e.target.value)}
                      placeholder="Password"
                    />
                  </Col>
                </Form.Group>
                <Button
                  variant="dark"
                  onClick={() => {
                    req();
                    setclicked(true);
                  }}
                  className={style.button}
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default ChangePassword;

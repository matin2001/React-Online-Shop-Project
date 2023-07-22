import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import style from "./ChangeProfile.module.css";

const ChangeProfile = () => {
  const Logged_or_not = useSelector((state) => state.Is_logged_in);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [gender, setgender] = useState("");
  const [age, setage] = useState(0);
  const [city, setcity] = useState("");
  const navigate = useNavigate();
  const [status, setstatus] = useState("");
  const [clicked, setclicked] = useState(false);
  const token = useSelector((state) => state.Token);
  const req = async () => {
    let bool_first = true;
    let bool_last = true;
    let bool_gender = true;
    let bool_age = true;
    let bool_city = true;
    if (firstname.length <= 2) {
      toast.error("Please Enter your first name correctly!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      bool_first = false;
    } else if (lastname.length <= 2) {
      toast.error("Please Enter your last name correctly!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      bool_last = false;
    } else if (gender != "male" && gender != "female") {
      toast.error("Please Select your gender!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      bool_gender = false;
    } else if (age <= 0) {
      toast.error("Please Enter your age!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      bool_age = false;
    } else if (age < 10 || age>80) {
      toast.error("Your age should be between 10 to 80!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      bool_age = false;
    } else if (city.length <= 2) {
      toast.error("Please Enter your city correctly!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      bool_city = false;
    } else if (
      bool_first &&
      bool_last &&
      bool_gender &&
      bool_age &&
      bool_city
    ) {
      try {
        const { data } = await axios.put(
          "http://kzico.runflare.run/user/change-profile",
          {
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            age: age,
            city: city,
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
    }
  };
  console.log(status);
  console.log(firstname);
  console.log(lastname);
  console.log(gender);
  console.log(age);
  console.log(city);
  useEffect(() => {
    if (clicked) {
      if (status.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Profile changed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }, [status]);
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
              <h3 className={style.selected}>Change Profile</h3>
              <h3
                className={style.h3}
                onClick={() => navigate("/setting/changePassword")}
              >
                Change Password
              </h3>
              <h3
                className={style.h3}
                onClick={() => navigate("/setting/uploadAvatar")}
              >
                Upload Avatar
              </h3>
            </div>
            <div className={style.content}>
              <div className={style.card}>
                <h2 className={style.title}>Please Complete the form below</h2>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="3">
                    First Name:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      className={style.form}
                      type="text"
                      onChange={(e) => setfirstname(e.target.value)}
                      placeholder="First Name"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="3">
                    Last Name:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      className={style.form}
                      type="text"
                      onChange={(e) => setlastname(e.target.value)}
                      placeholder="Last Name"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="3">
                    Gender:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select
                      className={style.form}
                      aria-label="Default select example"
                      onChange={(e) => setgender(e.target.value)}
                    >
                      <option value="male">
                        Choose the appropriate option
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="3">
                    Age:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      className={style.form}
                      type="number"
                      onChange={(e) => setage(e.target.value)}
                      placeholder="age"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="3">
                    City:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      className={style.form}
                      type="text"
                      onChange={(e) => setcity(e.target.value)}
                      placeholder="City"
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

export default ChangeProfile;

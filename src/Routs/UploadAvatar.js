import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import style from "./UploadAvatar.module.css";

const UploadAvatar = () => {
  const navigate = useNavigate();
  const [file, setfile] = useState("");
  const [status, setstatus] = useState("");
  const [clicked, setclicked] = useState(false);
  const token = useSelector((state) => state.Token);
  const Logged_or_not = useSelector((state) => state.Is_logged_in);
  const req = async () => {
    const formData = new FormData();
    formData.append("profile-image", file);
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/profile-image",
        formData,
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
  console.log(file);
  console.log(status);
  useEffect(() => {
    if (clicked) {
      if (status.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Profile Picture changed successfully",
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
              <h3
                className={style.h3}
                onClick={() => navigate("/setting/changePassword")}
              >
                Change Password
              </h3>
              <h3 className={style.selected}>Upload Avatar</h3>
            </div>
            <div className={style.content}>
              <div className={style.card}>
                <Form.Group controlId="formFileSm" className="mb-3">
                  <Form.Label className={style.title}>
                    Please Choose your files
                  </Form.Label>
                  <Form.Control
                    className={style.form}
                    type="file"
                    size="sm"
                    onChange={(e) => setfile(e.target.files[0])}
                  />
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
        </div>
      )}
    </div>
  );
};

export default UploadAvatar;

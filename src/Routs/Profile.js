import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import style from "./Profile.module.css";

const Profile = () => {
  const [status, setstatus] = useState("");
  const token = useSelector((state) => state.Token);
  const Logged_or_not = useSelector((state) => state.Is_logged_in);
  const [loading, setloading] = useState(false);
  const req = async () => {
    setloading(true);
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
      setloading(false);
    } catch (error) {
      setstatus(error.response.data);
      setloading(false);
    }
  };
  useEffect(() => {
    req();
  }, []);

  console.log(status);
  console.log(token);
  console.log(status.user);
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
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : status ? (
            <div>
              <div className={style.main}>
                <img src={status.user.image} className={style.img} />
                <div className={style.em_us}>
                  <h3 className={style.email}>Email: {status.user.email}</h3>
                  <h3 className={style.email}>
                    Username: {status.user.username}
                  </h3>
                  <h3 className={style.email}>Mobile: {status.user.mobile}</h3>
                </div>
              </div>
              {status.user.city ? (
                <div className={style.moreinfo}>
                  <div>
                    <h6 className={style.head}>First Name</h6>
                    <h4>{status.user.firstname}</h4>
                  </div>
                  <div>
                    <h6 className={style.head}>Last Name</h6>
                    <h4>{status.user.lastname}</h4>
                  </div>
                  <div>
                    <h6 className={style.head}>Gender</h6>
                    <h4>
                      {status.user.gender.charAt(0).toUpperCase() +
                        status.user.gender.slice(1)}
                    </h4>
                  </div>
                  <div>
                    <h6 className={style.head}>Age</h6>
                    <h4>{status.user.age}</h4>
                  </div>
                  <div>
                    <h6 className={style.head}>City</h6>
                    <h4>{status.user.city}</h4>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div>advd</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;

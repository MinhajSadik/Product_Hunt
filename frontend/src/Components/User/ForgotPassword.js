import MailOutlineIcon from "@material-ui/icons/MailOutline";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/features/userSlice";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import "./ForgotPassword.css";

const ForgotPassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message, loading } = useSelector((state) => state.user);
  console.log(message);
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const forgotData = new FormData();

    forgotData.set("email", email);
    dispatch(forgotPassword(forgotData));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (message) {
      alert.success(message);
      history.push("/login");
    }
  }, [dispatch, error, alert, message, history]);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ForgotPassword;

import LockOpenIcon from "@material-ui/icons/LockOpen";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginSignup.css";

const LoginSignup = () => {
  const loginTab = useRef(null);
  const signupTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = () => {
    console.log("loginSubmit");
  };
  const swtichTabs = (e, tab) => {
    e.preventDefault();
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      //   registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      //   registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <>
      <div className="LoginSignupContainer">
        <div className="LoginSignupBox">
          <div>
            <div className="login_signup_toggle">
              <p onClick={(e) => swtichTabs(e, "login")}>Login</p>
              <p onClick={(e) => swtichTabs(e, "register")}>Register</p>
              <button ref={switcherTab}></button>
            </div>
          </div>
          <form
            action=""
            className="loginForm"
            ref={loginTab}
            onSubmit={loginSubmit}
          >
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholdere="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginEmail">
              <LockOpenIcon />
              <input
                type="password"
                placeholdere="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forgot Password?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;

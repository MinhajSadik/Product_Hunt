import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import "./Profile.css";

const Profile = ({ history }) => {
  const { user, loading, isLoggedIn } = useSelector((state) => ({
    ...state.user,
  }));
  console.log("profile", user);
  useEffect(() => {
    if (isLoggedIn === false) {
      history.push("/login");
    }
  }, [history, isLoggedIn]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user?.user?.name}'s profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.user?.avatar?.url} alt={user?.user?.name} />
              <Link to="/profile/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.user?.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.user?.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;

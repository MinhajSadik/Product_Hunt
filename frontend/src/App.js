import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import "./App.css";
import Home from "./Components/Home/Home";
import Footer from "./Components/Layout/Footer/Footer";
import Header from "./Components/Layout/Header/Header";
import UserOptions from "./Components/Layout/Header/UserOptions";
import ProductDetails from "./Components/Product/ProductDetails";
import Products from "./Components/Product/Products";
import Search from "./Components/Product/Search";
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import ForgotPassword from "./Components/User/ForgotPassword";
import LoginSignup from "./Components/User/LoginSignup";
import Profile from "./Components/User/Profile";
import ResetPassword from "./Components/User/ResetPassword";
import UpdatePassword from "./Components/User/UpdatePassword";
import UpdateProfile from "./Components/User/UpdateProfile";
import { setUser } from "./redux/features/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => ({ ...state.user }));
  console.log(user);
  const userToken = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (userToken) {
      dispatch(setUser(userToken));
    }
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // useEffect(() => {}, []);

  return (
    <Router>
      <Header />
      {isLoggedIn && <UserOptions user={user} />}
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/product/:id" component={ProductDetails} />
      <ProtectedRoute exact path="/products" component={Products} />
      <ProtectedRoute path="/products/:keyword" component={Products} />
      <ProtectedRoute exact path="/search" component={Search} />
      <Route exact path="/login" component={LoginSignup} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/update/profile" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/update/password"
        component={UpdatePassword}
      />
      <Route exact path="/forgot/password" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Footer />
    </Router>
  );
}

export default App;

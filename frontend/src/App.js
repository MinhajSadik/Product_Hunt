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
import LoginSignup from "./Components/User/LoginSignup";
import Profile from "./Components/User/Profile";
import { setUser } from "./redux/features/userSlice";
import store from "./store";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const users = localStorage.getItem("user");
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(setUser(users));
  }, [dispatch, users]);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <Route exact path="/login" component={LoginSignup} />
      <Footer />
    </Router>
  );
}

export default App;

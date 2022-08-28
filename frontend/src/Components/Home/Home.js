import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { CgMouse } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, getProduct } from "../../actions/productAction";
import { getProducts } from "../../redux/features/productSlice";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import "./Home.css";
import ProductCard from "./ProductCard";

const Home = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => ({
    ...state.products,
  }));

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProducts({}));
  }, [alert, dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Product_Hunt (Home Page)" />
          <div className="banner">
            <p>Welcome to Product Hunt</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <div className="homeHeading">Featured Products</div>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;

import React, { useEffect } from "react";
import { CgMouse } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import "./Home.css";
import Product from "./Product";

const Home = () => {
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

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
                <Product key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;

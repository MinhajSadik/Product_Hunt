import React, { useEffect } from "react";
import { CgMouse } from "react-icons/all";
import { useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import MetaData from "../Layout/MetaData";
import "./Home.css";
import Product from "./Product";

const product = {
  name: "Shirt",
  price: "1000",
  image: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  _id: "product1",
};

const Home = () => {
  // const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
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
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;

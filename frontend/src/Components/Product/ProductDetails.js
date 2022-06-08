import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import "./ProductDetails.css";

const ProductDetails = ({ match }) => {
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id]);
  return (
    <>
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

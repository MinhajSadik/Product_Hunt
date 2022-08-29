import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isLoggedIn } = useSelector((state) => state.user);

  return (
    <>
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (!isLoggedIn) {
              return <Redirect to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;

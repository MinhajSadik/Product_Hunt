import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import "./App.css";
import Home from "./Components/Home/Home";
import Footer from "./Components/Layout/Footer/Footer";
import Header from "./Components/Layout/Header/Header";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />

      <Footer />
    </Router>
  );
}

export default App;

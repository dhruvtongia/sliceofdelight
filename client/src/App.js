import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Index from "./components/Index";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Admin from "./components/Admin";
import Footer from "./components/Footer";
import Notfound from "./components/Notfound";
import Orders from "./components/Orders";
import OrderTracker from "./components/OrderTracker";
import Adminaddmenu from "./components/Adminaddmenu";
import "./tracker.scss";
import { baseUrl } from "./Baseurl";

const App = () => {
  //const  cartCounterContext = React.createContext(0);
  const [cartCounter, setcartCounter] = useState(0);

  const [userLoggedin, setuserLoggedin] = useState();

  const [menu, setmenu] = useState();

  const getMenu = () => {
    fetch(baseUrl + "/", {
      method: "GET",
      headers: {
        //Accept:"application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include", // bahut important cookies ko bhejne ke liye taki har request pe nayi cooki na ban jaaye
    })
      .then((response) => response.json())
      .then((result) => {
        setmenu(result.menu);
        if (result.data) {
          setcartCounter(result.data.totQty);
        }
        if (result.user) {
          //console.log('home',result.user.role);

          setuserLoggedin(result.user);
        }

        //console.log(result.menu);
        //console.log(result.data.totQty);
        //console.log(typeof(result.menu));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    //console.log('in');
    getMenu();
  }, []);

  return (
    <>
      <Navbar
        cartCounter={cartCounter}
        userLoggedin={userLoggedin}
        setuserLoggedin={setuserLoggedin}
      />
      <Switch>
        <Route exact path="/">
          <Index
            getMenu={getMenu}
            userLoggedin={userLoggedin}
            setcartCounter={setcartCounter}
            menu={menu}
          />
        </Route>

        <Route exact path="/login">
          <Login setuserLoggedin={setuserLoggedin} />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/cart">
          <Cart setcartCounter={setcartCounter} userLoggedin={userLoggedin} />
        </Route>

        <Route exact path="/customer/orders">
          <Orders setcartCounter={setcartCounter} />
        </Route>

        <Route exact path="/customer/orders/:id">
          <OrderTracker />
        </Route>

        <Route exact path="/admin">
          <Admin />
        </Route>

        <Route exact path="/admin/addmenu">
          <Adminaddmenu
            setmenu={setmenu}
            menu={menu}
            userLoggedin={userLoggedin}
          />
        </Route>

        <Route>
          <Notfound />
        </Route>
      </Switch>

      <Footer />
    </>
  );
};

export default App;

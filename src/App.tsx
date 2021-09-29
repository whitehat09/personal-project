import React from "react";
import { Route, Switch } from "react-router-dom";

import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import ScrollToTop from "./layout/ScrollToTop/ScrollToTop";

import NotFound from "./page/NotFound/NotFound";

import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import ShopingCart from "./page/ShoppingCart/ShoppingCart";
import ProductDetails from "./page/ProductDetails/ProductDetails";
import "./app.css";
import LoginAdmin from "./page/LoginAdmin/LoginAdmin";

import DashboardUsers from "./page/DashboardUsers/DashboardUsers";
import DashboardProducts from "./page/DashboardProducts/DashboardProducts";
import AddProduct from "./page/AddProduct/AddProduct";
import ShoppingCart from "./page/ShoppingCart/ShoppingCart";
import UpdateAddProduct from "./page/UpdateAddProduct/UpdateAddProduct";
import DashboardOrders from "./page/DashboardOrders/DashboardOrders";

function App() {
  return (
    <>
      <Header />
      <main className="main-page main pt-5 pb-5">
        <Switch>
          {/* user */}
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={Login} />
          <Route path="/shoppingcart/:uid" component={ShoppingCart} />
          <Route path="/productdetails/:id" component={ProductDetails} />
          {/* admin */}
          <Route path="/admin/signin" component={LoginAdmin} />
          <Route path="/admin/dashboardusers" component={DashboardUsers} />
          <Route
            path="/admin/dashboardproducts"
            component={DashboardProducts}
          />
          <Route path="/admin/addproduct" component={AddProduct} />
          <Route path="/admin/updateproduct/:id" component={UpdateAddProduct} />
          <Route path="/admin/dashboardorders" component={DashboardOrders} />
          <Route component={NotFound} />
        </Switch>
      </main>

      <ScrollToTop />
      <Footer />
    </>
  );
}

export default App;

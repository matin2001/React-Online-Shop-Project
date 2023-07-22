import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import Product from "./Product";
import Cart from "./Cart";
import Login from "./Login";
import Signup from "./Signup";
import Address from "./Address";
import Checkout from "./Checkout";
import Order from "./Order";
import OrderId from "./OrderId";
import Profile from "./Profile";
import ChangeProfile from "./ChangeProfile";
import ChangePassword from "./ChangePassword";
import UploadAvatar from "./UploadAvatar";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/address" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/:orderId" element={<OrderId />} />
        <Route path="/setting/changeProfile" element={<ChangeProfile />} />
        <Route path="/setting/changePassword" element={<ChangePassword />} />
        <Route path="/setting/uploadAvatar" element={<UploadAvatar />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </div>
  );
};

export default Router;

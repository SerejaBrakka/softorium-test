import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../Auth/Auth";
import Registration from "../Registration/Registration";
import Home from "../Home/Home";
class Router extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    );
  }
}

export default Router;

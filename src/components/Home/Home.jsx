import React from "react";
import Auth from "../Auth/Auth";
class Home extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Auth />
      </div>
    );
  }
}

export default Home;

import React from "react";

//import styles
import "../styles/home.css";

export default function HomeView() {
  return (
    <div className="home_main_container">
      <h1>Welcome</h1>
      <p>
        As per requirements, node server has two endpoints:
        <br />
        <br /> /<span>generate_token</span> - takes username and password passed
        as json object in the body, <br /> and builds a payload to generate and
        sign a JWT token, which is then passed to the client to display in the
        view.
        <br />
        <br /> /<span>tracking_parcel</span> - takes a tracking number as a
        query, calls 3rd party api with the tracking number and bearer token in
        header.
        <br /> Passes returned json data to client which is then formatted and
        displayed.
        <br />
        <br />
        Both endpoints / views can be accessed via navigation on top right.
      </p>
    </div>
  );
}

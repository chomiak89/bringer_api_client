import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

//import styles
import "../styles/tracking.css";

export default function TrackingView() {
  //setup state for holding tracking number
  const [trackingNum, setTrackingNum] = useState({
    tracking_num: "",
  });

  //setup state to hold data from 3rd party API
  const [trackingData, setTrackingData] = useState("");

  // setup handler for updating the state
  const updateState = (event) => {
    setTrackingNum({
      ...trackingNum,
      [event.target.name]: event.target.value,
    });
  };

  //setup handler for submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();

    axios

      .get(
        `${process.env.REACT_APP_BACKEND_URL}/tracking_parcel?tracking=${trackingNum.tracking_num}`
      )
      .then((res) => {
        console.log(res.data);
        setTrackingData(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="tracking_main_container">
        <div className="tracking_form_container">
          <h3>Shipment Tracking</h3>
          <form onSubmit={handleSubmit} className="tracking_form">
            <label>Tracking Number:</label>
            <input
              name="tracking_num"
              value={trackingNum.tracking_num}
              type="text"
              onChange={updateState}
              required
            ></input>
            <button>Track</button>
          </form>
        </div>
        <div className="tracking_data_main_container">
          {trackingData ? (
            <div>
              {trackingData.parcel_tracking_items.map((item) => {
                return (
                  <div className="tracking_data_container">
                    <div className="tracking_data_timestamp_container">
                      <p>{moment(item.timestamp).format("MMM D YYYY")}</p>
                      <p>{moment(item.timestamp).format("LT")}</p>
                      {item.tracking_code_vendor &&
                        console.log(item.tracking_code_vendor)}
                    </div>
                    <div className="tracking_data_location_container">
                      <h3>
                        {item.tracking_code &&
                          item.tracking_code.tracking_code_locales[0]
                            .description}
                      </h3>
                      <h3>
                        {item.tracking_code_vendor &&
                          item.tracking_code_vendor
                            .tracking_code_vendor_locales[0].description}
                      </h3>
                      {item.state ? (
                        <p>
                          {item.state}, {item.city}, {item.location}
                          {item.country.isoCode}
                        </p>
                      ) : (
                        <p>{`${item.location}, ${item.country.isoCode}`}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

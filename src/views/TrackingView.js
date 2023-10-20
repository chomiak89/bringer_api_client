import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

//import styles
import "../styles/tracking.css";

export default function TrackingView() {
  const [trackingNum, setTrackingNum] = useState({
    tracking_num: "",
  });

  const [trackingData, setTrackingData] = useState("");

  const updateState = (event) => {
    setTrackingNum({
      ...trackingNum,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios

      .get(
        `http://localhost:3001/tracking_parcel?tracking=${trackingNum.tracking_num}`
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

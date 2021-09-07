import React from "react";
import classes from "./Passenger.module.css";

//return the passenger cards
function Passenger(props) {
  const passenger = props.passenger;
  const airline = props.passenger.airline[0];
  return (
    <div className={classes.Passenger}>
      <div className={classes.Data}>
        <div className={classes.Name}>
          <span>Passenger:</span> {passenger.name}
        </div>
        <div className={classes.Name}>
          <span>Trips: </span>
          {passenger.trips}
        </div>
        <div className={classes.Name}>
          <span>Airline: </span>
          {airline.name}
        </div>
        <div className={classes.Name}>
          <span>Country: </span>
          {airline.country}
        </div>
      </div>
      <div className={classes.LogoImgCont}>
        <img
          src={airline.logo}
          alt={airline.name}
          className={classes.LogoImg}
        ></img>
      </div>
    </div>
  );
}

export default React.memo(Passenger);

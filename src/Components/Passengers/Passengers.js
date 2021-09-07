import React, { useState, useRef, useCallback, useMemo } from "react";
import classes from "./Passengers.module.css";
import usePassengers from "../../hooks/usePassengers";
import Passenger from "./Passenger/Passenger";
import Spinner from "../UI/Spinner/Spinner";
import Error from "../UI/Error/Error";

function Passengers() {
  const size = 10; //can use useState to make size variable or change the value of size
  const [pageNumber, setPageNumber] = useState(0);

  const { passengers, loading, error, hasMore, firstLoad } = usePassengers(
    pageNumber,
    size
  );

  const observer = useRef();

  // whenever the last elemt appears on screen increase page number so new data can be loaded
  const lastPassengerRef = useCallback(
    (node) => {
      if (loading) return;
      //disconnect the previously connectted ement to ref "Observer"
      if (observer.current) observer.current.disconnect();
      // set  ref current to newintersectingObserver when present  on screen
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  let passengersList = useMemo(
    () =>
      passengers.map((passenger) => (
        <Passenger passenger={passenger} key={passenger._id} />
      )),
    [passengers]
  );
  passengersList = [
    ...passengersList,
    passengersList.length > 0 && (
      <div className={classes.Spinner} ref={lastPassengerRef} key={"spinner"}>
        <Spinner />
      </div>
    ),
  ];

  return (
    <div className={classes.Passengers}>
      {passengersList}
      {error && <Error>Something Went Wrong</Error>}
      {firstLoad && (
        <div className={classes.Spinner}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Passengers;

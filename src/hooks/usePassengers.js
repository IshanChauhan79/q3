import { useEffect, useState } from "react";
import axios from "axios";

function usePassengers(pageNumber, size) {
  const [passengers, setpassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  
  // get the data and return in the form of object
  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get("https://api.instantwebtools.net/v1/passenger", {
        params: { page: pageNumber, size: size },
      })
      .then((res) => {
        if (res.status === 200) {
          setpassengers((prev) => [...prev, ...res.data.data]);
          setLoading(false);
          setHasMore(res.data.totalPages > pageNumber);
          setFirstLoad(false);
        } else {
          throw new Error("Something Went Wrong");
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setError(true);
        setFirstLoad(false);
      });
  }, [pageNumber, size]);
  return { passengers, loading, hasMore, error, firstLoad };
}
export default usePassengers;

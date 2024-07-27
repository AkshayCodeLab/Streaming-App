import { useEffect, useState } from "react";
import axios from "axios";

const Experiment = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    makeCall();
  }, []);

  const makeCall = async () => {
    try {
      const url = "http://localhost:4000/info";
      const response = await axios.get(url);
      console.log("Data received:", response.data);
      setData(response.data.body);
    } catch (error) {
      if (error.response) {
        console.error(`HTTP error: ${error.response.status}`);
      } else if (error.request) {
        console.error("Request error: No response received");
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div>
      <h2>Data is getting rendered.</h2>
      {data ? <div>{data}</div> : <p>Loading...</p>}
    </div>
  );
};

export default Experiment;

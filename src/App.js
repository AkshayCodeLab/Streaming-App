import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    makeCall();
  }, []);

  const makeCall = async () => {
    const response = await fetch("http://localhost:4000/info");
    const json = await response.json();
    setData(json.body);
  };

  return (
    <div>
      <h2>Data is getting rendered.</h2>
      {data && <div>{data}</div>}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "../components/BarChart";
import Form from "../components/Form";

function App() {
  let [baseUrl, setUrl] = useState("http://localhost:3000/energies");
  const [data, setData] = useState(null);
  const [countries, setCountries] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(baseUrl);
        setData(response.data);
        if (countries === "") {
          response = await axios.get("http://localhost:3000/countries");
          setCountries(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [baseUrl]);

  const handleSubmit = (newUrl) => {
    setData(null);
    setUrl(newUrl);
  };

  return (
    <main className="flex flex-col items-center min-h-screen">
      <h1 className="text-center text-2xl py-5 bg-[#333] w-full">
        ☀️ ENERGY DASHBOARD ☀️
      </h1>
      <div className="py-5">
        {data && countries ? (
          <>
            <BarChart data={data}/>
            <Form handleSubmit={handleSubmit} data={data} countries={countries} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}

export default App;

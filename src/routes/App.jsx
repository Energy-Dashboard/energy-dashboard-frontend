import { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "../components/BarChart";

function App() {
  const [data, setData] = useState(null);
  let [baseUrl, setUrl] = useState("http://localhost:3000/energies?");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl);
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [baseUrl]);

  const handleSubmit = (e) => {
    setData(null);
    e.preventDefault();
    let newUrl = "http://localhost:3000/energies?";
    let query = e.target.elements;
    for (let i = 0; i < query.length; i++) {
      if (query[i].name) {
        if (query[i].value !== "") {
          newUrl += `${query[i].name}=${query[i].value}`;
        }
      }
    }

    setUrl(newUrl);
  };

  return (
    <main className="flex flex-col items-center min-h-screen">
      <h1 className="text-center text-2xl py-5 bg-[#333] w-full">
        ☀️ ENERGY DASHBOARD ☀️
      </h1>
      <p>{baseUrl}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="entity"
          placeholder="Entity"
          className="text-black"
        />
      </form>
      {data ? (
        <>
          <BarChart data={data} />
          {data.map((energy) => (
            <p key={energy._id}>
              <span>{energy.entity}</span>
            </p>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default App;

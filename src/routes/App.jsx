import { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "../components/BarChart";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/energies");
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen">
      <h1 className="text-center text-2xl py-5 bg-[#333]">
        ☀️ ENERGY DASHBOARD ☀️
      </h1>
      {data ? <BarChart /> : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default App;

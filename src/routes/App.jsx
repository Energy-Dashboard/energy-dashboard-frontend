import { useEffect, useState } from "react";
import axios from "axios";

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
      {data ? (
        data.map((energy) => (
          <p key={energy._id}>
            <span>{energy.entity}</span>
            <span>{energy.year}</span>
          </p>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default App;

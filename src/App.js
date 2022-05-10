import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoinList from "./pages/CoinList";
import WalletData from "./pages/WalletData";

const axios = require("axios");

function App() {
  const [coins, setCoins] = useState("");
  const [coinSelected, setCoinSelected] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((response) => {
        setCoins(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">Defi Tracker</header>
      <Router>
        <Routes>
          <Route path="/" exact element={<WalletData />} />
          <Route path="/coinlist" exact element={<CoinList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

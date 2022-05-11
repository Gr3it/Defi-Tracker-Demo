import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoinList from "./components/CoinList";
import WalletData from "./components/WalletData";

const axios = require("axios");

function App() {
  const [coins, setCoins] = useState("");
  const [idSelected, setIdSelected] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/listings/latest")
      .then((response) => {
        setCoins(response.data.data);
        console.log(response.data.data);
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
          <Route
            path="/"
            exact
            element={<WalletData coins={coins} idSelected={idSelected} />}
          />
          <Route
            path="/coinlist"
            exact
            element={
              <CoinList
                coins={coins}
                idSelected={idSelected}
                setIdSelected={(data) => setIdSelected(data)}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

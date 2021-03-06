import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoinList from "./components/CoinList";
import WalletData from "./components/WalletData";

const axios = require("axios");
const baseUrl = "https://nodejs-coinmarketcap-backend.herokuapp.com";

function App() {
  const [coins, setCoins] = useState("");
  const [idSelected, setIdSelected] = useState([]);
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/listings/latest`)
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
            element={
              <WalletData
                coins={coins}
                idSelected={idSelected}
                wallet={wallet}
                setWallet={(value) => setWallet(value)}
                baseUrl={baseUrl}
              />
            }
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

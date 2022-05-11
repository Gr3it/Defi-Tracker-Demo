import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import networks from "../supportedNetworks.json";
import { ethers } from "ethers";

const wallet = "0x6b5364f16ac49Dbb0bC4387666ed3515DF289f3a";

function WalletData({ coins, idSelected = [] }) {
  const [data, setData] = useState({});

  const fetchBalances = () => {
    networks.forEach((network) => {
      const provider = new ethers.providers.JsonRpcProvider(network.rpc);
    });
  };
  const fetchCoinInfo = (id) => {
    axios
      .get(`http://localhost:5000/info/${id}`)
      .then((response) => {
        response.data.data[id].contract_address.forEach((contract) => {
          const network = networks.find(
            (element) => element.name == contract.platform.name
          );
          if (network) {
            const provider = new ethers.providers.JsonRpcProvider(network.rpc);
            provider
              .getBalance("0x2F79c1ae4d60Bb2DfF0389782359E3676712e6E3")
              .then((balance) => {
                console.log(network.name + " " + balance);
              });
          }
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateData = () => {
    idSelected.forEach((id) => {
      let element = coins.find((x) => x.id == id);
      fetchCoinInfo(id);
    });
  };

  useEffect(() => {
    fetchBalances();
    updateData(idSelected);
  }, []);

  return (
    <div>
      WalletData
      <Link to={"/coinlist"} className="nav nav-right">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
          <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
        </svg>
      </Link>
    </div>
  );
}

export default WalletData;

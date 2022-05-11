import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import networks from "../supportedNetworks.json";
import { ethers } from "ethers";
import WalletNetwork from "./WalletNetwork";

const ERC20Abi = [
  "function decimals() external view returns (uint8)",
  "function balanceOf(address account) external view returns (uint256)",
];

function WalletData({ coins, idSelected = [] }) {
  const [data, setData] = useState([]);
  const [wallet, setWallet] = useState(
    "0xb5d85cbf7cb3ee0d56b3bb207d5fc4b82f43f511"
  );

  const updateNetworkBalance = async () => {
    let balanceData = [];

    function setBalanceData(name, balance, index, coin) {
      balanceData = [
        ...balanceData,
        {
          name: name,
          balance: balance,
          index: index,
          coin: coin,
        },
      ];
    }

    await Promise.all(
      networks.map(async (network, index) => {
        const provider = new ethers.providers.JsonRpcProvider(network.rpc);
        const balance = ethers.utils.formatEther(
          await provider.getBalance(wallet)
        );
        setBalanceData(network.name, balance, index, network.coin);
      })
    );

    balanceData.sort((a, b) => {
      return a.index - b.index;
    });
    setData(balanceData);
  };

  const fetchContractsBalances = async (idSelected) => {
    let coinsBalances = data;

    await Promise.all(
      idSelected.map(async (id) => {
        let element = coins.find((x) => x.id == id);
        let response = await axios.get(`http://localhost:5000/info/${id}`);
        await Promise.all(
          response.data.data[id].contract_address.map(async (contract) => {
            const network = networks.find(
              (element) => element.name == contract.platform.name
            );
            if (network) {
              const provider = new ethers.providers.JsonRpcProvider(
                network.rpc
              );
              const tokenContract = new ethers.Contract(
                contract.contract_address,
                ERC20Abi,
                provider
              );
              const balance =
                (await tokenContract.balanceOf(wallet)) /
                10 ** (await tokenContract.decimals());
              console.log(network.name + " " + balance);
            }
          })
        );
      })
    );
  };

  const updateData = async () => {
    await updateNetworkBalance();
    await fetchContractsBalances(idSelected);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <div>
      <div className="wallet-data-container">
        {data.map((element) => {
          return (
            <WalletNetwork
              key={element.name}
              name={element.name}
              balance={element.balance}
              coin={element.coin}
            />
          );
        })}
      </div>
      <Link to={"/coinlist"} className="nav nav-right">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
          <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
        </svg>
      </Link>
    </div>
  );
}

export default WalletData;

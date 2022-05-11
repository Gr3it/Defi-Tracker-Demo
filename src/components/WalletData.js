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

function WalletData({ coins, idSelected = [], wallet, setWallet, baseUrl }) {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
          coins: [],
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
    return balanceData;
  };

  const fetchContractsBalances = async (idSelected, data) => {
    let coinsBalances = data;

    function setCoinsBalances(name, amount, index, network) {
      coinsBalances = coinsBalances.map((element) => {
        return element.name == network
          ? {
              ...element,
              coins: [
                ...element.coins,
                { token: name, balance: amount, index: index },
              ].sort((a, b) => {
                return a.index - b.index;
              }),
            }
          : element;
      });
    }

    await Promise.all(
      idSelected.map(async (id, index) => {
        let element = coins.find((x) => x.id == id);
        let response = await axios.get(`${baseUrl}/info/${id}`);
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
              setCoinsBalances(
                response.data.data[id].symbol,
                balance,
                index,
                contract.platform.name
              );
            }
          })
        );
      })
    );
    setLoaded(true);
    setData(coinsBalances);
  };

  const updateData = async () => {
    const data = await updateNetworkBalance();
    await fetchContractsBalances(idSelected, data);
  };

  useEffect(() => {
    if (wallet == "") return;
    updateData();
  }, [wallet]);

  return (
    <div>
      <div className="wallet-data-container">
        <div className="wallet-input-text">Current Address: {wallet}</div>
        <input
          placeholder="Paste address here"
          id="wallet-input-box"
          className="wallet-input-box"
          type="text"
        ></input>
        <div
          className="wallet-input-confirm"
          onClick={() => {
            const element = document.getElementById("wallet-input-box");
            setWallet(element.value);
            element.value = "";
          }}
        >
          Confirm Address
        </div>
        {!loaded &&
          (wallet == "" ? (
            <div className="wallet-input-loading">Insert A Wallet</div>
          ) : (
            <div className="wallet-input-loading">Loading Data ...</div>
          ))}
        {data.map((element) => {
          return (
            <WalletNetwork
              key={element.name}
              name={element.name}
              balance={element.balance}
              coin={element.coin}
              coins={element.coins}
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

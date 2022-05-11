import { Link } from "react-router-dom";
import CoinRow from "./CoinRow";

function CoinList({ coins, idSelected, setIdSelected }) {
  return (
    <div>
      <div className="coinlist-container">
        <div className="coinlist-subtitle">Select The Coins to Track</div>
        {coins &&
          coins.map((element) => {
            return (
              <CoinRow
                key={element.id}
                rank={element.cmc_rank}
                name={element.name}
                symbol={element.symbol}
                id={element.id}
                idSelected={idSelected}
                setIdSelected={(data) => setIdSelected(data)}
              />
            );
          })}
      </div>
      <Link to={"/"} className="nav nav-left">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
          <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
        </svg>
      </Link>
    </div>
  );
}

export default CoinList;

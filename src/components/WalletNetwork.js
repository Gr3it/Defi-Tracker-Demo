function WalletNetwork({ name, balance, coin, coins = [] }) {
  return (
    <div className={"wallet-network-container"}>
      <div className="wallet-network-header">
        <div className="wallet-network-network">{name}</div>
        {coin && (
          <div className="wallet-network-coin-balance">
            {balance == 0 ? balance : parseFloat(balance).toFixed(4)}
            <div className="wallet-network-coin-balance-symbol">{coin}</div>
          </div>
        )}
      </div>
      cipolla
    </div>
  );
}

export default WalletNetwork;

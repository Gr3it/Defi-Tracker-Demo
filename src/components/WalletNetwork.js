function WalletNetwork({ name, balance, coins = [] }) {
  return (
    <div className={"row-container"}>
      <div className="row-rank">{name}</div>
      <div className="row-name">{balance}</div>
    </div>
  );
}

export default WalletNetwork;

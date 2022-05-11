function CoinsEntry({ name, balance }) {
  return (
    <div className="coins-entry-container">
      <div className="coins-entry-symbol">{name}</div>
      <div className="coins-entry-balance">{balance}</div>
    </div>
  );
}

export default CoinsEntry;

const toggleArrayElement = (array, id, setter) => {
  array.includes(id)
    ? setter([
        ...array.filter((currentId) => {
          return currentId != id;
        }),
      ])
    : setter([...array, id]);
};

function CoinRow({ rank, name, symbol, id, idSelected = [], setIdSelected }) {
  return (
    <div
      onClick={() => {
        toggleArrayElement(idSelected, id, (data) => setIdSelected(data));
      }}
      className={
        idSelected.includes(id) ? "row-container selected" : "row-container"
      }
    >
      <div className="row-rank">{rank}</div>
      <div className="row-name">{name}</div>
      <div className="row-symbol">{symbol}</div>
    </div>
  );
}

export default CoinRow;
